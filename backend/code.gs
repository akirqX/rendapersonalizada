// ============================================
// CONFIGURAÇÃO PRINCIPAL
// ============================================
const CONFIG = {
  SHEET_ID: '1K-QUvvF0DbB7xQ3E3HcRJPMLDzQ9lRFhDFvb-vtgSQg', // ID da sua planilha
  MP_ACCESS_TOKEN: 'TEST-6418010857988445-061720-943b99b872dc8bcbdb1d3e4d393cc156-1565566193', // Token TEST do Mercado Pago
  EMAIL_REMETENTE: 'akirqxm@gmail.com', // Substitua pelo seu email
  NOME_REMETENTE: 'IdeaRenda - Equipe',
  PRODUTO_NOME: 'Relatório Completo de Ideias de Renda',
  PRODUTO_VALOR: 14.90,
  URL_SUCESSO: 'https://akirqx.github.io/rendapersonalizada/sucesso.html',
  URL_ERRO: 'https://akirqx.github.io/rendapersonalizada/erro.html',
  URL_PENDENTE: 'https://akirqx.github.io/rendapersonalizada/erro.html'
};

// ============================================
// FUNÇÃO PRINCIPAL - Recebe requisições do frontend
// ============================================
function doPost(e) {
  try {
    console.log('Recebida requisição:', e.postData.contents);
    
    // Permite CORS para requisições do seu site
    const origin = e.parameter && e.parameter.origin ? e.parameter.origin : '*';
    
    // Processa dados
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    let response;
    
    // Roteia para função apropriada
    switch(action) {
      case 'processar_quiz':
        response = processarQuiz(data);
        break;
      case 'registrar_pagamento':
        response = registrarPagamento(data);
        break;
      case 'enviar_gratuito':
        response = enviarGratuito(data);
        break;
      case 'webhook_mp':
        response = processarWebhookMP(data);
        break;
      case 'testar_conexao':
        response = { sucesso: true, mensagem: 'Backend funcionando!' };
        break;
      default:
        response = { error: 'Ação não reconhecida: ' + action };
    }
    
    // Configura headers CORS
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Headers para permitir CORS
    output.setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
    return output;
      
  } catch (error) {
    console.error('Erro no doPost:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.toString(),
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  }
}

// Função doGet para testes e CORS
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'testar_conexao') {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        sucesso: true, 
        mensagem: 'Google Apps Script funcionando!',
        data: new Date().toISOString(),
        config: {
          sheet_id: CONFIG.SHEET_ID ? 'Configurada' : 'Faltando',
          mp_token: CONFIG.MP_ACCESS_TOKEN ? 'Configurado' : 'Faltando'
        }
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ 
      error: 'Use POST para ações principais',
      actions_disponiveis: [
        'processar_quiz',
        'registrar_pagamento', 
        'enviar_gratuito',
        'webhook_mp',
        'testar_conexao'
      ]
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*'
    });
}

// ============================================
// FUNÇÃO: Processa quiz e retorna ideias
// ============================================
function processarQuiz(data) {
  try {
    const { respostas, email } = data;
    
    console.log('Processando quiz para:', email);
    
    // Valida dados mínimos
    if (!email || !respostas) {
      return { error: 'Dados incompletos', sucesso: false };
    }
    
    // Salva no log
    logEvent('quiz_iniciado', { email, respostas: Object.keys(respostas) });
    
    // Busca ideias compatíveis (versão local primeiro)
    const ideias = buscarIdeiasCompativeisLocal(respostas);
    
    // Se não encontrou na planilha, usa fallback
    let ideiasFinal = ideias;
    if (ideias.length === 0) {
      console.log('Nenhuma ideia na planilha, usando fallback');
      ideiasFinal = buscarIdeiasFallback(respostas);
    }
    
    // Calcula compatibilidade
    const totalIdeias = ideiasFinal.length;
    const mostrarUpsell = totalIdeas > 3;
    
    // Prepara resultado
    const resultado = {
      sucesso: true,
      ideias: ideiasFinal.slice(0, 3).map(ideia => ({
        id: ideia.id || 0,
        titulo: ideia.titulo,
        descricao: ideia.descricao,
        renda_min: ideia.renda_min,
        renda_max: ideia.renda_max,
        tempo_min: ideia.tempo_min,
        tempo_max: ideia.tempo_max,
        urgencia: ideia.urgencia
      })),
      total_ideias: totalIdeias,
      upsell: mostrarUpsell,
      compatibilidade: Math.min(85 + Math.floor(Math.random() * 13), 98) // 85-98%
    };
    
    // Salva no histórico
    salvarQuiz(email, respostas, resultado);
    
    console.log('Quiz processado:', totalIdeias, 'ideias encontradas');
    
    return resultado;
    
  } catch (error) {
    console.error('Erro em processarQuiz:', error);
    return { 
      error: 'Erro ao processar quiz', 
      sucesso: false,
      details: error.toString()
    };
  }
}

// ============================================
// FUNÇÃO: Cria pagamento no Mercado Pago
// ============================================
function registrarPagamento(data) {
  try {
    const { email, respostas, produto = CONFIG.PRODUTO_NOME, valor = CONFIG.PRODUTO_VALOR } = data;
    
    console.log('Criando pagamento para:', email);
    
    // Validação básica
    if (!email || !respostas) {
      return { error: 'Email e respostas são obrigatórios', sucesso: false };
    }
    
    // Busca ideias compatíveis para incluir no metadata
    const ideias = buscarIdeiasCompativeisLocal(respostas);
    const totalIdeias = ideias.length;
    
    // 1. Prepara dados para o Mercado Pago
    const preferenceData = {
      items: [
        {
          title: produto,
          description: `${totalIdeias} ideias de renda personalizadas + bônus exclusivos`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: parseFloat(valor)
        }
      ],
      payer: {
        email: email
      },
      metadata: {
        cliente_email: email,
        quiz_respostas: JSON.stringify(respostas),
        total_ideias: totalIdeas,
        produto: produto,
        timestamp: new Date().toISOString()
      },
      back_urls: {
        success: CONFIG.URL_SUCESSO,
        failure: CONFIG.URL_ERRO,
        pending: CONFIG.URL_PENDENTE
      },
      auto_return: "approved",
      notification_url: getScriptUrl() + "?action=webhook_mp",
      statement_descriptor: "IDEIA RENDA*RELATORIO",
      external_reference: "IR_" + new Date().getTime() + "_" + Math.random().toString(36).substr(2, 9)
    };
    
    console.log('Enviando para Mercado Pago:', JSON.stringify(preferenceData));
    
    // 2. Faz a requisição para a API do Mercado Pago
    const url = "https://api.mercadopago.com/checkout/preferences";
    const options = {
      method: "post",
      headers: {
        "Authorization": "Bearer " + CONFIG.MP_ACCESS_TOKEN,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(preferenceData),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    console.log('Mercado Pago respondeu:', responseCode, responseText);
    
    if (responseCode !== 200 && responseCode !== 201) {
      console.error('Erro Mercado Pago:', responseText);
      throw new Error(`Mercado Pago retornou código ${responseCode}: ${responseText}`);
    }
    
    const result = JSON.parse(responseText);
    
    // 3. Salva no histórico de vendas
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName('vendas') || ss.insertSheet('vendas');
    
    // Configura cabeçalho se necessário
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Email', 
        'Respostas', 
        'Data', 
        'Preference ID', 
        'Status', 
        'Data Envio', 
        'Valor', 
        'Payment ID',
        'External Reference',
        'Total Ideias'
      ]);
    }
    
    sheet.appendRow([
      email,
      JSON.stringify(respostas),
      new Date(),
      result.id,
      'pending',
      '',
      valor,
      '',
      preferenceData.external_reference,
      totalIdeias
    ]);
    
    logEvent('pagamento_criado', { 
      email, 
      preference_id: result.id,
      external_ref: preferenceData.external_reference,
      total_ideias: totalIdeias
    });
    
    // 4. Retorna URL de pagamento para o frontend
    return {
      sucesso: true,
      preference_id: result.id,
      payment_url: result.init_point || result.sandbox_init_point,
      external_reference: preferenceData.external_reference,
      total_ideias: totalIdeias,
      valor: valor,
      sandbox: CONFIG.MP_ACCESS_TOKEN.startsWith('TEST-') ? true : false
    };
    
  } catch (error) {
    console.error('Erro em registrarPagamento:', error);
    return {
      error: 'Erro ao criar pagamento',
      sucesso: false,
      details: error.toString(),
      stack: error.stack
    };
  }
}

// ============================================
// FUNÇÃO: Envia versão gratuita por email
// ============================================
function enviarGratuito(data) {
  try {
    const { email, respostas, free_ideas } = data;
    
    console.log('Enviando gratuito para:', email);
    
    if (!email) {
      return { error: 'Email é obrigatório', sucesso: false };
    }
    
    // Busca ideias (3 primeiras ou as especificadas)
    let ideias;
    if (free_ideas && Array.isArray(free_ideas)) {
      // Se vier IDs específicos, busca essas ideias
      ideias = buscarIdeiasPorIds(free_ideas);
    } else {
      // Busca 3 ideias compatíveis
      ideias = buscarIdeiasCompativeisLocal(respostas).slice(0, 3);
    }
    
    // Se não encontrou, usa fallback
    if (ideias.length === 0) {
      ideias = buscarIdeiasFallback(respostas).slice(0, 3);
    }
    
    // Envia email
    const emailEnviado = enviarEmailGratuito(email, ideias);
    
    // Salva no log
    logEvent('gratuito_enviado', { 
      email, 
      total_ideias: ideias.length,
      email_enviado: emailEnviado
    });
    
    // Salva no histórico
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName('gratuitos') || ss.insertSheet('gratuitos');
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'Respostas', 'Data', 'Total Ideias', 'Email Enviado']);
    }
    
    sheet.appendRow([
      email,
      JSON.stringify(respostas),
      new Date(),
      ideias.length,
      emailEnviado ? 'Sim' : 'Não'
    ]);
    
    return {
      sucesso: true,
      email_enviado: emailEnviado,
      total_ideias: ideias.length,
      mensagem: emailEnviado ? 
        'Ideias gratuitas enviadas com sucesso!' : 
        'Ideias processadas (email não enviado)'
    };
    
  } catch (error) {
    console.error('Erro em enviarGratuito:', error);
    return {
      sucesso: false,
      error: 'Erro ao enviar versão gratuita',
      details: error.toString()
    };
  }
}

// ============================================
// FUNÇÃO: Processa webhook do Mercado Pago
// ============================================
function processarWebhookMP(data) {
  try {
    console.log('Webhook MP recebido:', JSON.stringify(data));
    
    const { type, data: mpData } = data;
    
    if (type === 'payment') {
      const paymentId = mpData.id;
      
      console.log('Processando pagamento:', paymentId);
      
      // Verifica status no MP
      const payment = verificarPagamentoMP(paymentId);
      
      console.log('Status do pagamento:', payment.status);
      
      if (payment.status === 'approved') {
        // Busca dados da venda
        const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
        const sheet = ss.getSheetByName('vendas');
        
        if (!sheet) {
          console.error('Planilha "vendas" não encontrada');
          return { sucesso: false, error: 'Planilha não encontrada' };
        }
        
        const dataRange = sheet.getDataRange().getValues();
        let encontrado = false;
        
        // Procura pelo external_reference ou payment ID
        for (let i = 1; i < dataRange.length; i++) {
          const row = dataRange[i];
          const externalRef = row[8]; // Coluna I
          const preferenceId = row[3]; // Coluna D
          
          if (payment.external_reference === externalRef || 
              payment.id.toString() === preferenceId) {
            
            console.log('Venda encontrada na linha:', i + 1);
            
            // Atualiza status
            sheet.getRange(i + 1, 5).setValue('approved'); // Coluna E = Status
            sheet.getRange(i + 1, 8).setValue(paymentId); // Coluna H = Payment ID
            
            // Busca respostas e email
            const respostas = JSON.parse(row[1]);
            const email = row[0];
            
            // Envia produto
            const emailEnviado = enviarProdutoCompleto(email, respostas);
            
            // Marca como enviado
            sheet.getRange(i + 1, 6).setValue(new Date()); // Coluna F = Data Envio
            sheet.getRange(i + 1, 11).setValue(emailEnviado ? 'Sim' : 'Não'); // Coluna K = Email Enviado
            
            logEvent('produto_enviado', { 
              email, 
              payment_id: paymentId,
              external_reference: payment.external_reference,
              email_enviado: emailEnviado
            });
            
            encontrado = true;
            break;
          }
        }
        
        if (!encontrado) {
          console.warn('Pagamento não encontrado na planilha:', paymentId);
          logEvent('pagamento_nao_encontrado', { payment_id: paymentId });
        }
      } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
        logEvent('pagamento_negado', { 
          payment_id: paymentId, 
          status: payment.status 
        });
      }
    }
    
    return { sucesso: true, processado: true };
    
  } catch (error) {
    console.error('Erro em processarWebhookMP:', error);
    logEvent('erro_webhook', { error: error.toString() });
    return { sucesso: false, error: error.toString() };
  }
}

// ============================================
// FUNÇÕES AUXILIARES - IDEIAS
// ============================================

// Busca ideias na planilha
function buscarIdeiasCompativeisLocal(respostas) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName('ideias');
    
    if (!sheet) {
      console.log('Planilha "ideias" não encontrada, usando fallback');
      return buscarIdeiasFallback(respostas);
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return buscarIdeiasFallback(respostas);
    }
    
    const header = data[0];
    const ideias = [];
    
    // Pula cabeçalho
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const ideia = {};
      
      // Converte linha para objeto
      for (let j = 0; j < header.length; j++) {
        ideia[header[j]] = row[j];
      }
      
      // Verifica compatibilidade básica
      if (verificarCompatibilidadeLocal(ideia, respostas)) {
        ideias.push(ideia);
      }
    }
    
    return ideias.sort((a, b) => calcularPontuacaoLocal(b, respostas) - calcularPontuacaoLocal(a, respostas));
    
  } catch (error) {
    console.error('Erro ao buscar ideias locais:', error);
    return buscarIdeiasFallback(respostas);
  }
}

// Fallback de ideias se a planilha estiver vazia
function buscarIdeiasFallback(respostas) {
  console.log('Usando fallback de ideias');
  
  // Ideias básicas como fallback
  const ideiasFallback = [
    {
      id: 1,
      titulo: "Assistente Virtual para Pequenas Empresas",
      descricao: "Atendimento ao cliente e organização para microempresários",
      tempo_min: 2,
      tempo_max: 6,
      recursos: ["computador"],
      habilidade: "organizado",
      local: "Qualquer",
      urgencia: "semana",
      investimento_min: 0,
      investimento_max: 100,
      renda_min: 800,
      renda_max: 2000,
      passos: "1. Crie perfil no LinkedIn\n2. Ofereça pacotes mensais\n3. Use Google Workspace grátis",
      links: "LinkedIn.com, GetNinjas.com.br"
    },
    {
      id: 2,
      titulo: "Revenda de Produtos Usados",
      descricao: "Compra e venda de produtos seminovos com lucro",
      tempo_min: 1,
      tempo_max: 3,
      recursos: ["celular"],
      habilidade: "pessoas",
      local: "Qualquer",
      urgencia: "hoje",
      investimento_min: 100,
      investimento_max: 500,
      renda_min: 500,
      renda_max: 2000,
      passos: "1. Compre no Marketplace\n2. Revenda com boa fotografia\n3. Use OLX e Mercado Livre",
      links: "OLX.com.br, MercadoLivre.com.br"
    },
    {
      id: 3,
      titulo: "Serviços de Organização Residencial",
      descricao: "Organização de armários, despensas e espaços residenciais",
      tempo_min: 3,
      tempo_max: 6,
      recursos: ["transporte"],
      habilidade: "organizado",
      local: "capital",
      urgencia: "semana",
      investimento_min: 50,
      investimento_max: 150,
      renda_min: 150,
      renda_max: 300,
      passos: "1. Tire fotos antes/depois\n2. Crie anúncio no Instagram\n3. Ofereça em grupos locais",
      links: "Instagram, Facebook Marketplace"
    },
    {
      id: 4,
      titulo: "Edição de Vídeos para Redes Sociais",
      descricao: "Criação de conteúdo visual para pequenos negócios",
      tempo_min: 2,
      tempo_max: 5,
      recursos: ["computador"],
      habilidade: "criativo",
      local: "Qualquer",
      urgencia: "semana",
      investimento_min: 0,
      investimento_max: 0,
      renda_min: 300,
      renda_max: 900,
      passos: "1. Aprenda Canva ou CapCut\n2. Crie portfólio\n3. Ofereça pacotes mensais",
      links: "Canva.com, Instagram.com"
    },
    {
      id: 5,
      titulo: "Aulas Particulares Online",
      descricao: "Ensino de matérias escolares via Zoom/Skype",
      tempo_min: 2,
      tempo_max: 4,
      recursos: ["computador"],
      habilidade: "paciente",
      local: "Qualquer",
      urgencia: "semana",
      investimento_min: 0,
      investimento_max: 0,
      renda_min: 500,
      renda_max: 1500,
      passos: "1. Escolha matérias que domina\n2. Crie perfil no Superprof\n3. Ofereça aula experimental",
      links: "Superprof.com.br, Professores.org.br"
    }
  ];
  
  // Filtra por compatibilidade básica
  return ideiasFallback.filter(ideia => {
    return verificarCompatibilidadeLocal(ideia, respostas);
  });
}

function buscarIdeiasPorIds(ids) {
  // Busca ideias específicas por ID
  const todasIdeias = buscarIdeiasFallback({});
  return todasIdeias.filter(ideia => ids.includes(ideia.id));
}

function verificarCompatibilidadeLocal(ideia, respostas) {
  let pontos = 0;
  
  // Tempo disponível
  if (respostas.tempo >= ideia.tempo_min && respostas.tempo <= ideia.tempo_max) {
    pontos += 3;
  }
  
  // Recursos disponíveis (se a ideia requer recursos específicos)
  if (ideia.recursos && Array.isArray(ideia.recursos)) {
    const temRecursos = ideia.recursos.every(r => 
      respostas.recursos && respostas.recursos.includes(r)
    );
    if (temRecursos) pontos += 2;
  }
  
  // Habilidade
  if (respostas.habilidade === ideia.habilidade) pontos += 2;
  
  // Localização
  if (ideia.local === 'Qualquer' || respostas.local === ideia.local) pontos += 1;
  
  // Urgência
  if (respostas.urgencia === ideia.urgencia) pontos += 2;
  
  // Investimento
  const investimentoUsuario = parseFloat(respostas.investimento || 0);
  if (investimentoUsuario >= ideia.investimento_min) pontos += 1;
  
  return pontos >= 4; // Mínimo de compatibilidade
}

function calcularPontuacaoLocal(ideia, respostas) {
  return verificarCompatibilidadeLocal(ideia, respostas) ? 1 : 0;
}

// ============================================
// FUNÇÕES AUXILIARES - EMAIL
// ============================================

function enviarProdutoCompleto(email, respostas) {
  try {
    const ideias = buscarIdeiasCompativeisLocal(respostas);
    
    if (ideias.length === 0) {
      ideias = buscarIdeiasFallback(respostas);
    }
    
    const html = criarEmailCompletoHTML(ideias);
    const subject = `📈 ${CONFIG.PRODUTO_NOME} - ${ideias.length} Ideias Personalizadas`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: html,
      from: CONFIG.EMAIL_REMETENTE,
      name: CONFIG.NOME_REMETENTE,
      replyTo: CONFIG.EMAIL_REMETENTE
    });
    
    console.log('Email completo enviado para:', email);
    return true;
    
  } catch (error) {
    console.error('Erro ao enviar email completo:', error);
    logEvent('erro_email_completo', { email, error: error.toString() });
    return false;
  }
}

function enviarEmailGratuito(email, ideias) {
  try {
    const html = criarEmailGratuitoHTML(ideias);
    const subject = `🎯 Suas 3 Ideias de Renda Personalizadas (Grátis)`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: html,
      from: CONFIG.EMAIL_REMETENTE,
      name: CONFIG.NOME_REMETENTE
    });
    
    console.log('Email gratuito enviado para:', email);
    return true;
    
  } catch (error) {
    console.error('Erro ao enviar email gratuito:', error);
    return false;
  }
}

function criarEmailCompletoHTML(ideias) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header { 
          background: linear-gradient(135deg, #4361ee, #7209b7);
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 10px 10px 0 0;
        }
        .content { 
          background: white; 
          padding: 30px; 
          border-radius: 0 0 10px 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .ideia { 
          border-left: 4px solid #4361ee; 
          padding: 20px; 
          margin: 20px 0; 
          background: #f8f9ff;
          border-radius: 0 5px 5px 0;
        }
        .titulo { 
          color: #2c3e50; 
          font-size: 20px; 
          font-weight: bold; 
          margin-bottom: 10px;
        }
        .destaque { 
          background: #e3f2fd; 
          padding: 15px; 
          border-radius: 5px; 
          margin: 15px 0;
          border-left: 3px solid #2196f3;
        }
        .bonus-section {
          background: #fff3e0;
          padding: 20px;
          border-radius: 5px;
          margin: 25px 0;
          border: 2px dashed #ff9800;
        }
        .btn {
          display: inline-block;
          background: #4CAF50;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Seu Relatório Personalizado de Ideias de Renda</h1>
        <p>${ideias.length} oportunidades específicas para seu perfil</p>
      </div>
      
      <div class="content">
        <p>Olá!</p>
        <p>Parabéns pela aquisição! Aqui estão suas <strong>${ideias.length} ideias de renda personalizadas</strong>, selecionadas especialmente para você.</p>
        
        <div class="bonus-section">
          <h3>🎁 Bônus Inclusos:</h3>
          <ul>
            <li><strong>Kit Emergencial:</strong> 5 formas de ganhar R$ 200 em 48 horas</li>
            <li><strong>Scripts de Venda Prontos:</strong> Modelos para WhatsApp e email</li>
            <li><strong>Garantia de 30 Dias:</strong> Satisfação garantida ou seu dinheiro de volta</li>
          </ul>
        </div>
        
        <h2>📋 Suas Ideias de Renda:</h2>
  `;
  
  ideias.forEach((ideia, index) => {
    html += `
      <div class="ideia">
        <div class="titulo">${index + 1}. ${ideia.titulo}</div>
        <p>${ideia.descricao}</p>
        <div class="destaque">
          <strong>💰 Potencial de ganho:</strong> R$${ideia.renda_min} - R$${ideia.renda_max}/mês<br>
          <strong>⏰ Tempo necessário:</strong> ${ideia.tempo_min}-${ideia.tempo_max} horas/dia<br>
          <strong>💵 Investimento inicial:</strong> R$${ideia.investimento_min} - R$${ideia.investimento_max}<br>
          <strong>🚀 Urgência:</strong> ${getUrgenciaTexto(ideia.urgencia)}
        </div>
        <h4>📝 Como começar:</h4>
        <p>${ideia.passos.replace(/\n/g, '<br>')}</p>
        ${ideia.links ? `<p><strong>🔗 Links úteis:</strong> ${ideia.links}</p>` : ''}
      </div>
    `;
  });
  
  html += `
        <div class="destaque">
          <h3>💡 Próximos Passos Recomendados:</h3>
          <ol>
            <li><strong>Escolha 1 ideia para começar</strong> - Foque na que mais combina com você</li>
            <li><strong>Execute o primeiro passo hoje</strong> - Ação é mais importante que perfeição</li>
            <li><strong>Use os bônus</strong> - Os scripts prontos aceleram seus resultados</li>
            <li><strong>Dúvidas?</strong> Responda este email que te ajudamos!</li>
          </ol>
        </div>
        
        <p><strong>Lembre-se:</strong> Você tem 30 dias de garantia. Se não estiver satisfeito, devolvemos 100%.</p>
        
        <div class="footer">
          <p>Atenciosamente,<br>
          <strong>Equipe ${CONFIG.NOME_REMETENTE}</strong></p>
          <p>📧 ${CONFIG.EMAIL_REMETENTE}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

function criarEmailGratuitoHTML(ideias) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .ideia { border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 5px; background: #f9f9f9; }
        .titulo { color: #2c3e50; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .destaque { background-color: #e8f4fd; padding: 10px; border-left: 4px solid #3498db; margin: 10px 0; }
        .upsell { background-color: #fff3cd; padding: 15px; border: 2px dashed #ffc107; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h2>🎯 Suas 3 Ideias de Renda Personalizadas</h2>
      <p>Olá! Aqui estão as ideias que encontramos para você:</p>
  `;
  
  ideias.forEach((ideia, index) => {
    html += `
      <div class="ideia">
        <div class="titulo">${index + 1}. ${ideia.titulo}</div>
        <p>${ideia.descricao}</p>
        <div class="destaque">
          <strong>💰 Potencial:</strong> R$${ideia.renda_min} - R$${ideia.renda_max}/mês<br>
          <strong>⏰ Tempo:</strong> ${ideia.tempo_min}-${ideia.tempo_max}h/dia<br>
          <strong>🚀 Começar:</strong> ${getUrgenciaTexto(ideia.urgencia)}
        </div>
      </div>
    `;
  });
  
  html += `
      <div class="upsell">
        <h3>💎 Versão Completa Disponivel!</h3>
        <p>Esta é apenas uma amostra. Na versão completa você recebe:</p>
        <ul>
          <li><strong>Todas as ${ideias.length * 2}+ ideias</strong> compatíveis</li>
          <li>Planos de ação detalhados passo a passo</li>
          <li>Templates e scripts prontos para usar</li>
          <li>Acesso à comunidade VIP</li>
          <li>Garantia de 30 dias</li>
        </ul>
        <p><strong>Preço especial:</strong> Apenas R$ 14,90 (era R$ 97)</p>
      </div>
      
      <p>Precisa de ajuda para começar? Responda este email!</p>
      
      <p>Atenciosamente,<br>
      Equipe ${CONFIG.NOME_REMETENTE}</p>
    </body>
    </html>
  `;
  
  return html;
}

function getUrgenciaTexto(urgencia) {
  const textos = {
    'hoje': 'Começar hoje mesmo',
    'semana': 'Começar esta semana', 
    'estavel': 'Plano a médio prazo'
  };
  return textos[urgencia] || 'Flexível';
}

// ============================================
// FUNÇÕES AUXILIARES - MERCADO PAGO
// ============================================

function verificarPagamentoMP(paymentId) {
  try {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
    const options = {
      method: "get",
      headers: {
        "Authorization": "Bearer " + CONFIG.MP_ACCESS_TOKEN,
        "Content-Type": "application/json"
      },
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    
    return {
      id: data.id,
      status: data.status,
      external_reference: data.external_reference,
      transaction_amount: data.transaction_amount,
      date_approved: data.date_approved,
      payer: data.payer ? data.payer.email : null
    };
    
  } catch (error) {
    console.error('Erro ao verificar pagamento MP:', error);
    return { status: 'error', error: error.toString() };
  }
}

// ============================================
// FUNÇÕES AUXILIARES - LOGS E UTILITÁRIOS
// ============================================

function logEvent(acao, detalhes) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName('logs') || ss.insertSheet('logs');
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data', 'Ação', 'Detalhes', 'IP', 'User Agent']);
    }
    
    sheet.appendRow([
      new Date(),
      acao,
      JSON.stringify(detalhes),
      'N/A', // Em produção, você pode capturar do e.parameter
      'N/A'
    ]);
    
    // Mantém no máximo 1000 linhas de logs
    if (sheet.getLastRow() > 1000) {
      sheet.deleteRows(2, sheet.getLastRow() - 1000);
    }
    
  } catch (error) {
    console.error('Erro ao salvar log:', error);
  }
}

function salvarQuiz(email, respostas, resultado) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName('quizzes') || ss.insertSheet('quizzes');
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Email', 'Data', 'Tempo', 'Recursos', 'Habilidade', 
        'Local', 'Urgencia', 'Investimento', 'Total Ideias', 'Upsell'
      ]);
    }
    
    sheet.appendRow([
      email,
      new Date(),
      respostas.tempo,
      Array.isArray(respostas.recursos) ? respostas.recursos.join(',') : respostas.recursos,
      respostas.habilidade,
      respostas.local,
      respostas.urgencia,
      respostas.investimento,
      resultado.total_ideias,
      resultado.upsell ? 'Sim' : 'Não'
    ]);
    
  } catch (error) {
    console.error('Erro ao salvar quiz:', error);
  }
}

function getScriptUrl() {
  // Retorna a URL atual do script
  return ScriptApp.getService().getUrl();
}

// ============================================
// FUNÇÃO DE TESTE - Para verificar se tudo está funcionando
// ============================================
function testarTudo() {
  console.log('=== TESTANDO CONFIGURAÇÃO ===');
  console.log('SHEET_ID:', CONFIG.SHEET_ID ? 'OK' : 'FALTANDO');
  console.log('MP_ACCESS_TOKEN:', CONFIG.MP_ACCESS_TOKEN ? 'OK' : 'FALTANDO');
  console.log('EMAIL_REMETENTE:', CONFIG.EMAIL_REMETENTE ? 'OK' : 'FALTANDO');
  
  // Testa acesso à planilha
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    console.log('Acesso à planilha: OK');
    
    // Verifica abas necessárias
    const sheets = ss.getSheets().map(s => s.getName());
    console.log('Abas disponíveis:', sheets);
    
    const abasNecessarias = ['vendas', 'quizzes', 'logs', 'ideias'];
    abasNecessarias.forEach(aba => {
      if (!sheets.includes(aba)) {
        console.log(`Criando aba: ${aba}`);
        ss.insertSheet(aba);
      }
    });
    
  } catch (error) {
    console.error('Erro ao acessar planilha:', error);
  }
  
  console.log('=== TESTE COMPLETO ===');
  return 'Teste concluído! Verifique os logs acima.';
}
