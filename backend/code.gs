// CONFIGURAÇÃO INICIAL
const CONFIG = {
  SHEET_ID: '1K-QUvvF0DbB7xQ3E3HcRJPMLDzQ9lRFhDFvb-vtgSQg', // ID da sua planilha
  MP_ACCESS_TOKEN: 'TEST-6418010857988445-061720-943b99b872dc8bcbdb1d3e4d393cc156-1565566193', // Token do Mercado Pago
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzkr62a2s4RjmEHGJx4y8m8m3X70C0Xq_8GKG5w3w_-2MzcvmCb53UpzFHNpHwozg0_zw/exec' // Depois de publicar
};

// FUNÇÃO PRINCIPAL - Recebe dados do frontend
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    let response;
    
    switch(action) {
      case 'processar_quiz':
        response = processarQuiz(data);
        break;
      case 'registrar_pagamento':
        response = registrarPagamento(data);
        break;
      case 'webhook_mp':
        response = processarWebhookMP(data);
        break;
      default:
        response = { error: 'Ação não reconhecida' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erro:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: 'Erro interno', 
        details: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Processa quiz e retorna ideias (versão gratuita)
function processarQuiz(data) {
  const { respostas, email } = data;
  
  // Salva no log
  logEvent('quiz_iniciado', { email, respostas });
  
  // Busca ideias compatíveis
  const ideias = buscarIdeiasCompativeis(respostas);
  
  // Retorna 3 ideias gratuitas
  const resultado = {
    sucesso: true,
    ideias: ideias.slice(0, 3),
    total_ideias: ideias.length,
    upsell: ideias.length > 3 // Oferecer versão paga se tiver mais ideias
  };
  
  // Salva no histórico
  salvarQuiz(email, respostas, resultado);
  
  return resultado;
}

// Busca ideias compatíveis no banco de dados
function buscarIdeiasCompativeis(respostas) {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName('ideias');
  const data = sheet.getDataRange().getValues();
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
    
    // Verifica compatibilidade
    if (verificarCompatibilidade(ideia, respostas)) {
      ideias.push(ideia);
    }
  }
  
  // Ordena por melhor match
  return ideias.sort((a, b) => calcularPontuacao(b, respostas) - calcularPontuacao(a, respostas));
}

// Lógica de matching
function verificarCompatibilidade(ideia, respostas) {
  let pontos = 0;
  
  // Tempo disponível
  if (respostas.tempo >= ideia.tempo_min && respostas.tempo <= ideia.tempo_max) {
    pontos += 3;
  }
  
  // Recursos disponíveis
  const recursosUsuario = respostas.recursos.split(',');
  const recursosIdeia = ideia.recursos.split(',');
  const recursosCompatíveis = recursosIdeia.every(r => recursosUsuario.includes(r));
  
  if (recursosCompatíveis) pontos += 2;
  
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

// Registra pagamento confirmado
function registrarPagamento(data) {
  const { email, respostas, payment_id } = data;
  
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName('vendas');
  
  // Busca ideias completas
  const ideias = buscarIdeiasCompativeis(respostas);
  
  // Salva venda
  sheet.appendRow([
    email,
    JSON.stringify(respostas),
    new Date(),
    payment_id,
    'pending',
    '',
    '14.90'
  ]);
  
  logEvent('pagamento_registrado', { email, payment_id });
  
  return {
    sucesso: true,
    ideias_completas: ideias,
    total: ideias.length
  };
}

// Processa webhook do Mercado Pago
function processarWebhookMP(data) {
  const { type, data: mpData } = data;
  
  if (type === 'payment') {
    const paymentId = mpData.id;
    
    // Verifica status no MP
    const payment = verificarPagamentoMP(paymentId);
    
    if (payment.status === 'approved') {
      // Busca dados da venda
      const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
      const sheet = ss.getSheetByName('vendas');
      const dataRange = sheet.getDataRange().getValues();
      
      for (let i = 1; i < dataRange.length; i++) {
        if (dataRange[i][3] === paymentId) {
          // Atualiza status
          sheet.getRange(i + 1, 5).setValue('approved');
          
          // Busca respostas
          const respostas = JSON.parse(dataRange[i][1]);
          const email = dataRange[i][0];
          
          // Envia produto
          enviarProduto(email, respostas);
          
          // Marca como enviado
          sheet.getRange(i + 1, 6).setValue(new Date());
          
          logEvent('produto_enviado', { email, payment_id: paymentId });
          break;
        }
      }
    }
  }
  
  return { sucesso: true };
}

// Envia email com o produto
function enviarProduto(email, respostas) {
  const ideias = buscarIdeiasCompativeis(respostas);
  
  const html = criarEmailHTML(ideias);
  
  MailApp.sendEmail({
    to: email,
    subject: '📈 Seu Relatório Personalizado de Ideias de Renda',
    htmlBody: html,
    from: CONFIG.email_remetente,
    name: CONFIG.nome_remetente
  });
  
  logEvent('email_enviado', { email });
}

// Template do email
function criarEmailHTML(ideias) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .ideia { border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 5px; }
        .titulo { color: #2c3e50; font-size: 18px; font-weight: bold; }
        .destaque { background-color: #f8f9fa; padding: 10px; border-left: 4px solid #3498db; }
      </style>
    </head>
    <body>
      <h2>🎯 Suas Ideias de Renda Personalizadas</h2>
      <p>Baseado no seu perfil, selecionamos as melhores oportunidades:</p>
  `;
  
  ideias.forEach((ideia, index) => {
    html += `
      <div class="ideia">
        <div class="titulo">${index + 1}. ${ideia.titulo}</div>
        <p>${ideia.descricao}</p>
        <div class="destaque">
          <strong>💰 Potencial de ganho:</strong> R$${ideia.renda_min} - R$${ideia.renda_max}/mês<br>
          <strong>⏰ Tempo necessário:</strong> ${ideia.tempo_min}-${ideia.tempo_max} horas/dia<br>
          <strong>💵 Investimento inicial:</strong> R$${ideia.investimento_min} - R$${ideia.investimento_max}
        </div>
        <h4>📝 Como começar:</h4>
        <p>${ideia.passos.replace(/\n/g, '<br>')}</p>
        ${ideia.links ? `<p><strong>🔗 Links úteis:</strong> ${ideia.links}</p>` : ''}
      </div>
    `;
  });
  
  html += `
      <hr>
      <p><strong>💡 Dica:</strong> Comece pela ideia #1 que tem melhor compatibilidade com seu perfil!</p>
      <p>Precisa de ajuda? Responda este email!</p>
    </body>
    </html>
  `;
  
  return html;
}

// Funções auxiliares
function logEvent(acao, detalhes) {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName('logs');
  sheet.appendRow([new Date(), acao, JSON.stringify(detalhes)]);
}

function salvarQuiz(email, respostas, resultado) {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName('vendas');
  sheet.appendRow([email, JSON.stringify(respostas), new Date(), 'quiz', 'completed', '', 0]);
}
