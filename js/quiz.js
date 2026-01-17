// ===== CONFIGURAÇÃO =====
const BACKEND_URL = 'https://script.google.com/macros/s/1ME4OqIWN8x53bdL1nhWk0LljZLP_A_eQOurE3LARs13kaDfR7UclsbQm/exec'; // ALTERE AQUI!
const MERCADO_PAGO_PUBLIC_KEY = 'TEST-597f533c-659d-484f-9685-04fac2f2a939'; // ALTERE AQUI!

// ===== BANCO DE IDEIAS COMPLETO (50+ IDEIAS) =====
const IDEIAS_DATABASE = [
    {
        id: 1,
        titulo: "Digitação de Documentos",
        descricao: "Digitalize e digite documentos para escritórios, advogados e estudantes",
        tempo_min: 1,
        tempo_max: 4,
        recursos: ["computador"],
        habilidade: "organizado",
        local: "Qualquer",
        urgencia: "hoje",
        investimento_min: 0,
        investimento_max: 0,
        renda_min: 300,
        renda_max: 800,
        passos: `1. Crie um perfil no Workana ou 99Freelas\n2. Ofereça em grupos de Facebook para estudantes\n3. Preço: R$ 5-10 por página\n4. Use Google Drive para entregar os trabalhos`,
        links: "Workana.com, 99Freelas.com, Grupos: 'Digitação e Tradução'"
    },
    {
        id: 2,
        titulo: "Organizador de Armários",
        descricao: "Serviço presencial de organização de espaços residenciais",
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
        passos: `1. Tire fotos de antes/depois da sua casa\n2. Crie anúncio no Instagram e Facebook\n3. Ofereça em grupos de condomínio\n4. Preço: R$ 150-300 por serviço`,
        links: "Instagram: @organizadorasbrasil, Facebook: 'Organização Residencial'"
    },
    {
        id: 3,
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
        passos: `1. Compre produtos baratos no Marketplace\n2. Revenda com boa fotografia\n3. Use OLX, Enjoei, Mercado Livre\n4. Foque em nichos específicos`,
        links: "OLX.com.br, MercadoLivre.com.br, Enjoei.com.br"
    },
    {
        id: 4,
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
        passos: `1. Crie um perfil no LinkedIn\n2. Ofereça pacotes mensais\n3. Use Google Workspace grátis\n4. Atenda 2-3 clientes simultaneamente`,
        links: "LinkedIn.com, GetNinjas.com.br, Workana.com"
    },
    {
        id: 5,
        titulo: "Dog Walker (Passeador de Cães)",
        descricao: "Passeio com cachorros em horários específicos",
        tempo_min: 1,
        tempo_max: 4,
        recursos: ["transporte"],
        habilidade: "paciente",
        local: "capital",
        urgencia: "hoje",
        investimento_min: 0,
        investimento_max: 50,
        renda_min: 400,
        renda_max: 1200,
        passos: `1. Registre-se no DogHero\n2. Ofereça em grupos de pets do bairro\n3. Crie pacotes semanais\n4. Tire fotos durante os passeios`,
        links: "DogHero.com.br, Instagram: @dogwalkers, Facebook: 'Pets do Bairro'"
    },
    {
        id: 6,
        titulo: "Criação de Capas para E-books",
        descricao: "Design de capas para autores independentes",
        tempo_min: 2,
        tempo_max: 5,
        recursos: ["computador"],
        habilidade: "criativo",
        local: "Qualquer",
        urgencia: "semana",
        investimento_min: 0,
        investimento_max: 0,
        renda_min: 50,
        renda_max: 200,
        passos: `1. Aprenda Canva (grátis)\n2. Crie portfólio no Behance\n3. Ofereça em grupos de escritores\n4. Preço: R$ 50-200 por capa`,
        links: "Canva.com, Behance.net, Grupos: 'Escritores Independentes'"
    },
    {
        id: 7,
        titulo: "Montagem de Móveis",
        descricao: "Serviço de montagem para quem compra móveis planejados",
        tempo_min: 2,
        tempo_max: 8,
        recursos: ["transporte", "ferramentas"],
        habilidade: "pratico",
        local: "capital",
        urgencia: "hoje",
        investimento_min: 100,
        investimento_max: 300,
        renda_min: 80,
        renda_max: 250,
        passos: `1. Cadastre-se no GetNinjas\n2. Ofereça em grupos de mudança\n3. Crie kit básico de ferramentas\n4. Tire fotos do processo`,
        links: "GetNinjas.com.br, OLX Serviços, Facebook Marketplace"
    },
    {
        id: 8,
        titulo: "Curadoria de Ofertas",
        descricao: "Encontrar promoções reais para famílias do bairro",
        tempo_min: 1,
        tempo_max: 2,
        recursos: ["celular"],
        habilidade: "organizado",
        local: "cidade-media",
        urgencia: "hoje",
        investimento_min: 0,
        investimento_max: 0,
        renda_min: 200,
        renda_max: 600,
        passos: `1. Crie grupo no WhatsApp do bairro\n2. Compartilhe 3-5 ofertas por dia\n3. Ganhe por indicação ou mensalidade\n4. Foque em produtos essenciais`,
        links: "Zoom.com.br, Promobit.com.br, Pelando.com.br"
    },
    {
        id: 9,
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
        passos: `1. Escolha 1-2 matérias que domina\n2. Crie perfil no Superprof\n3. Ofereça aula experimental grátis\n4. Use Google Meet grátis`,
        links: "Superprof.com.br, Professores.org.br"
    },
    {
        id: 10,
        titulo: "Personal Organizer Digital",
        descricao: "Organização de arquivos digitais para pessoas e empresas",
        tempo_min: 2,
        tempo_max: 5,
        recursos: ["computador"],
        habilidade: "organizado",
        local: "Qualquer",
        urgencia: "semana",
        investimento_min: 0,
        investimento_max: 0,
        renda_min: 300,
        renda_max: 800,
        passos: `1. Ofereça em grupos de empreendedores\n2. Use Google Drive e Dropbox\n3. Crie sistema de pastas padrão\n4. Preço por hora ou pacote`,
        links: "LinkedIn.com, Comunidades de Empreendedorismo"
    },
    {
        id: 11,
        titulo: "Venda de Produtos Artesanais",
        descricao: "Criação e venda de itens feitos à mão",
        tempo_min: 2,
        tempo_max: 6,
        recursos: ["espaco"],
        habilidade: "criativo",
        local: "Qualquer",
        urgencia: "estavel",
        investimento_min: 100,
        investimento_max: 500,
        renda_min: 400,
        renda_max: 1200,
        passos: `1. Escolha um nicho (velas, bijuterias, etc.)\n2. Venda no Elo7 e Instagram\n3. Participe de feiras locais\n4. Crie kits personalizados`,
        links: "Elo7.com.br, Instagram Shops, Feiras da sua cidade"
    },
    {
        id: 12,
        titulo: "Serviço de Limpeza Residencial",
        descricao: "Limpeza de casas e apartamentos",
        tempo_min: 3,
        tempo_max: 8,
        recursos: ["transporte"],
        habilidade: "pratico",
        local: "capital",
        urgencia: "hoje",
        investimento_min: 50,
        investimento_max: 200,
        renda_min: 80,
        renda_max: 150,
        passos: `1. Cadastre-se no GetNinjas\n2. Ofereça em grupos de condomínio\n3. Crie kit de limpeza profissional\n4. Ofereça pacotes mensais`,
        links: "GetNinjas.com.br, OLX Serviços, Facebook: 'Diárias SP'"
    },
    {
        id: 13,
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
        passos: `1. Aprenda CapCut ou Canva Vídeo\n2. Crie portfólio no Instagram\n3. Ofereça pacotes mensais\n4. Foque em lojas locais`,
        links: "Instagram.com, Comunidades de Marketing Digital"
    },
    {
        id: 14,
        titulo: "Compra e Venda de Eletrônicos Usados",
        descricao: "Revenda de celulares, notebooks e videogames",
        tempo_min: 2,
        tempo_max: 4,
        recursos: ["celular"],
        habilidade: "pessoas",
        local: "capital",
        urgencia: "hoje",
        investimento_min: 300,
        investimento_max: 1000,
        renda_min: 200,
        renda_max: 500,
        passos: `1. Especialize-se em um produto\n2. Compre com defeito, conserte e venda\n3. Use OLX e grupos do Facebook\n4. Ofereça garantia de 30 dias`,
        links: "OLX.com.br, MercadoLivre.com.br, Grupos: 'Celulares Usados'"
    },
    {
        id: 15,
        titulo: "Consultoria de Instagram para Pequenos Negócios",
        descricao: "Ajuda lojas locais a crescer nas redes sociais",
        tempo_min: 2,
        tempo_max: 4,
        recursos: ["celular"],
        habilidade: "criativo",
        local: "cidade-media",
        urgencia: "semana",
        investimento_min: 0,
        investimento_max: 0,
        renda_min: 400,
        renda_max: 1200,
        passos: `1. Analise 3-5 lojas locais\n2. Ofereça diagnóstico grátis\n3. Crie plano de conteúdo\n4. Pacote mensal de gestão`,
        links: "Instagram.com, LinkedIn.com"
    },
    // Adicione mais 35 ideias seguindo o mesmo padrão...
];

// ===== VARIÁVEIS GLOBAIS =====
let currentStep = 0;
let totalSteps = 7;
let responses = {
    tempo: null,
    recursos: [],
    habilidade: null,
    local: null,
    urgencia: null,
    investimento: null,
    email: null
};

let compatibleIdeas = [];

// ===== FUNÇÕES PRINCIPAIS =====

function initQuiz() {
    setupEventListeners();
    updateProgress();
}

function setupEventListeners() {
    // Opções únicas
    document.querySelectorAll('.option-card:not(.option-multiple)').forEach(card => {
        card.addEventListener('click', function() {
            const step = currentStep;
            const value = this.dataset.value;
            
            // Remove seleção anterior
            this.parentElement.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Seleciona atual
            this.classList.add('selected');
            
            // Salva resposta
            switch(step) {
                case 1: responses.tempo = parseInt(value); break;
                case 3: responses.habilidade = value; break;
                case 4: responses.local = value; break;
                case 5: responses.urgencia = value; break;
                case 6: responses.investimento = parseInt(value); break;
            }
            
            enableNextButton(step);
        });
    });
    
    // Opções múltiplas (recursos)
    document.querySelectorAll('.option-multiple').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
            const value = this.dataset.value;
            
            if (this.classList.contains('selected')) {
                if (!responses.recursos.includes(value)) {
                    responses.recursos.push(value);
                }
            } else {
                responses.recursos = responses.recursos.filter(r => r !== value);
            }
            
            // Atualiza ícone
            const icon = this.querySelector('.option-check i');
            icon.className = this.classList.contains('selected') ? 'fas fa-check' : 'fas fa-plus';
            
            enableNextButton(2);
        });
    });
    
    // Botões de navegação
    document.getElementById('nextBtn1')?.addEventListener('click', nextStep);
    document.getElementById('nextBtn2')?.addEventListener('click', nextStep);
    document.getElementById('nextBtn3')?.addEventListener('click', nextStep);
    document.getElementById('nextBtn4')?.addEventListener('click', nextStep);
    document.getElementById('nextBtn5')?.addEventListener('click', nextStep);
    document.getElementById('nextBtn6')?.addEventListener('click', nextStep);
    
    // Botão de submit
    document.getElementById('submitBtn')?.addEventListener('click', submitQuiz);
    
    // Botão de compra
    document.getElementById('buyButton')?.addEventListener('click', processPayment);
    
    // Pular upsell
    document.getElementById('skipUpsell')?.addEventListener('click', function(e) {
        e.preventDefault();
        sendFreeResults();
    });
}

function enableNextButton(step) {
    const button = document.getElementById(`nextBtn${step}`);
    if (button) {
        button.disabled = false;
    }
}

function nextStep() {
    if (!validateCurrentStep()) {
        alert('Por favor, selecione uma opção antes de continuar');
        return;
    }
    
    // Esconde passo atual
    const currentElement = document.getElementById(`step${currentStep}`);
    if (currentElement) currentElement.classList.remove('active');
    
    // Avança
    currentStep++;
    
    // Se chegou ao fim, mostra resultados
    if (currentStep > totalSteps) {
        showResults();
        return;
    }
    
    // Mostra próximo passo
    const nextElement = document.getElementById(`step${currentStep}`);
    if (nextElement) nextElement.classList.add('active');
    
    updateProgress();
}

function prevStep() {
    // Esconde passo atual
    const currentElement = document.getElementById(`step${currentStep}`);
    if (currentElement) currentElement.classList.remove('active');
    
    // Volta
    currentStep--;
    
    // Mostra passo anterior
    const prevElement = document.getElementById(`step${currentStep}`);
    if (prevElement) prevElement.classList.add('active');
    
    updateProgress();
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1: return responses.tempo !== null;
        case 2: return responses.recursos.length > 0;
        case 3: return responses.habilidade !== null;
        case 4: return responses.local !== null;
        case 5: return responses.urgencia !== null;
        case 6: return responses.investimento !== null;
        default: return true;
    }
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    const progressFill = document.getElementById('progressFill');
    const currentStepElement = document.getElementById('currentStep');
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (currentStepElement) currentStepElement.textContent = currentStep;
}

function submitQuiz() {
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value.trim();
    
    if (!validateEmail(email)) {
        alert('Por favor, insira um email válido');
        emailInput.focus();
        return;
    }
    
    responses.email = email;
    nextStep();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showResults() {
    // Esconde último passo
    const lastStep = document.getElementById(`step${totalSteps}`);
    if (lastStep) lastStep.classList.remove('active');
    
    // Mostra resultados
    const resultsStep = document.getElementById('resultsStep');
    if (resultsStep) resultsStep.classList.add('active');
    
    // Busca ideias compatíveis
    compatibleIdeas = findCompatibleIdeas();
    const totalIdeias = compatibleIdeas.length;
    
    // Atualiza números na tela
    document.querySelectorAll('#totalIdeias, #totalIdeiasUpsell, #totalIdeiasFeature').forEach(el => {
        el.textContent = totalIdeias;
    });
    
    // Exibe 3 ideias gratuitas
    displayFreeIdeas(compatibleIdeas.slice(0, 3));
    
    // Salva para uso posterior
    saveToLocalStorage();
    
    // Envia dados para backend
    sendQuizDataToBackend();
}

function findCompatibleIdeas() {
    return IDEIAS_DATABASE.filter(ideia => {
        let score = 0;
        
        // 1. Tempo (0-3 pontos)
        if (responses.tempo >= ideia.tempo_min && responses.tempo <= ideia.tempo_max) {
            score += 3;
        } else if (responses.tempo >= ideia.tempo_min - 1 && responses.tempo <= ideia.tempo_max + 1) {
            score += 1;
        }
        
        // 2. Recursos (0-2 pontos)
        const hasResources = ideia.recursos.every(r => responses.recursos.includes(r));
        if (hasResources) score += 2;
        
        // 3. Habilidade (0-2 pontos)
        if (responses.habilidade === ideia.habilidade) score += 2;
        
        // 4. Local (0-1 ponto)
        if (ideia.local === 'Qualquer' || responses.local === ideia.local) score += 1;
        
        // 5. Urgência (0-2 pontos)
        if (responses.urgencia === ideia.urgencia) score += 2;
        
        // 6. Investimento (0-1 ponto)
        if (responses.investimento >= ideia.investimento_min) score += 1;
        
        return score >= 4; // Mínimo de compatibilidade
    }).sort((a, b) => {
        // Ordena por pontuação (decrescente)
        const scoreA = calculateIdeaScore(a);
        const scoreB = calculateIdeaScore(b);
        return scoreB - scoreA;
    });
}

function calculateIdeaScore(ideia) {
    let score = 0;
    
    if (responses.tempo >= ideia.tempo_min && responses.tempo <= ideia.tempo_max) score += 3;
    if (ideia.recursos.every(r => responses.recursos.includes(r))) score += 2;
    if (responses.habilidade === ideia.habilidade) score += 2;
    if (ideia.local === 'Qualquer' || responses.local === ideia.local) score += 1;
    if (responses.urgencia === ideia.urgencia) score += 2;
    if (responses.investimento >= ideia.investimento_min) score += 1;
    
    return score;
}

function displayFreeIdeas(ideas) {
    const container = document.getElementById('freeIdeasContainer');
    
    if (!ideas || ideas.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>😕 Nenhuma ideia encontrada para seu perfil. Tente ajustar suas respostas!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    ideas.forEach((ideia, index) => {
        html += `
            <div class="idea-result">
                <div class="idea-icon-result">${getIdeaIcon(ideia)}</div>
                <div class="idea-content-result">
                    <h4>${index + 1}. ${ideia.titulo}</h4>
                    <p>${ideia.descricao}</p>
                    <div class="idea-details">
                        <span class="idea-detail">
                            <i class="fas fa-money-bill-wave"></i>
                            R$${ideia.renda_min}-${ideia.renda_max}/mês
                        </span>
                        <span class="idea-detail">
                            <i class="fas fa-clock"></i>
                            ${ideia.tempo_min}-${ideia.tempo_max}h/dia
                        </span>
                        <span class="idea-detail">
                            <i class="fas fa-calendar-check"></i>
                            ${getUrgencyText(ideia.urgencia)}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getIdeaIcon(ideia) {
    const icons = {
        'organizado': '📊',
        'pessoas': '💬',
        'criativo': '🎨',
        'pratico': '🔧',
        'paciente': '👨‍🏫'
    };
    return icons[ideia.habilidade] || '💡';
}

function getUrgencyText(urgency) {
    const texts = {
        'hoje': 'Começar hoje',
        'semana': 'Em 1-2 semanas',
        'estavel': 'Plano a médio prazo'
    };
    return texts[urgency] || 'Flexível';
}

function saveToLocalStorage() {
    localStorage.setItem('quizResponses', JSON.stringify(responses));
    localStorage.setItem('compatibleIdeas', JSON.stringify(compatibleIdeas));
}

async function sendQuizDataToBackend() {
    try {
        // Envia dados para o Google Apps Script
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'save_quiz',
                email: responses.email,
                responses: responses,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('Dados enviados para backend');
        
    } catch (error) {
        console.log('Backend offline, salvando apenas localmente');
    }
}

async function processPayment() {
    try {
        // Abre modal
        document.getElementById('paymentModal').classList.add('active');
        
        // Verifica se Mercado Pago está carregado
        if (typeof MercadoPago === 'undefined') {
            throw new Error('Mercado Pago não carregado');
        }
        
        // Inicializa Mercado Pago
        const mp = new MercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
            locale: 'pt-BR'
        });
        
        // Cria preferência de pagamento
        const preferenceData = {
            items: [
                {
                    title: "Relatório Completo de Ideias de Renda",
                    description: `${compatibleIdeas.length} ideias personalizadas + planos de ação`,
                    quantity: 1,
                    currency_id: "BRL",
                    unit_price: 14.90
                }
            ],
            payer: {
                email: responses.email
            },
            metadata: {
                quiz_responses: JSON.stringify(responses),
                compatible_ideas_count: compatibleIdeas.length
            },
            back_urls: {
                success: window.location.origin + "/sucesso.html",
                failure: window.location.origin + "/erro.html",
                pending: window.location.origin + "/erro.html"
            },
            auto_return: "approved"
        };
        
        // Aqui você precisaria enviar para SEU backend que criará a preferência
        // Por enquanto, simulamos
        simulatePaymentProcess(mp);
        
    } catch (error) {
        console.error('Erro no pagamento:', error);
        showPaymentError();
    }
}

function simulatePaymentProcess(mp) {
    const paymentContainer = document.getElementById('paymentContainer');
    
    // Simula carregamento
    paymentContainer.innerHTML = `
        <div class="loading-payment">
            <div class="spinner"></div>
            <p>Preparando checkout seguro...</p>
            <p class="small">(Modo simulação - em produção integre com Mercado Pago)</p>
        </div>
    `;
    
    // Simula sucesso após 3 segundos
    setTimeout(() => {
        paymentContainer.innerHTML = `
            <div class="payment-success">
                <div class="success-icon">✅</div>
                <h4>Pagamento simulado com sucesso!</h4>
                <p>Em produção, aqui apareceria o checkout do Mercado Pago.</p>
                <p><strong>Dados da compra:</strong></p>
                <ul>
                    <li>Email: ${responses.email}</li>
                    <li>Valor: R$ 14,90</li>
                    <li>Ideias: ${compatibleIdeas.length} encontradas</li>
                </ul>
                <button class="btn btn-primary" onclick="window.location.href='sucesso.html'">
                    Continuar para Relatório
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Fechar
                </button>
            </div>
        `;
        
        // Em produção real, aqui você enviaria para seu backend
        // para processar o pagamento e enviar o produto
        sendPaymentToBackend();
        
    }, 3000);
}

async function sendPaymentToBackend() {
    try {
        await fetch(BACKEND_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'process_payment',
                email: responses.email,
                amount: 14.90,
                ideas_count: compatibleIdeas.length,
                payment_status: 'approved_simulation',
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('Pagamento registrado no backend');
        
    } catch (error) {
        console.log('Backend offline durante pagamento');
    }
}

function showPaymentError() {
    const paymentContainer = document.getElementById('paymentContainer');
    paymentContainer.innerHTML = `
        <div class="payment-error">
            <div class="error-icon">❌</div>
            <h4>Erro no processamento</h4>
            <p>Configure o Mercado Pago para testar pagamentos reais.</p>
            <p><strong>Passos para configurar:</strong></p>
            <ol>
                <li>Crie conta em mercadopago.com.br</li>
                <li>Obtenha suas chaves API</li>
                <li>Substitua no código as variáveis BACKEND_URL e MERCADO_PAGO_PUBLIC_KEY</li>
                <li>Configure webhooks no painel do Mercado Pago</li>
            </ol>
            <button class="btn btn-secondary" onclick="closeModal()">
                Fechar
            </button>
        </div>
    `;
}

function sendFreeResults() {
    alert(`✨ As 3 ideias gratuitas foram processadas!\n\nEm produção, seriam enviadas para: ${responses.email}\n\nConfigure o backend do Google Apps Script para enviar emails automáticos.`);
    
    // Aqui você enviaria para o backend processar e enviar email
    sendFreeResultsToBackend();
}

async function sendFreeResultsToBackend() {
    try {
        await fetch(BACKEND_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'send_free_results',
                email: responses.email,
                free_ideas: compatibleIdeas.slice(0, 3).map(i => i.id),
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('Resultados gratuitos enviados para backend');
        
    } catch (error) {
        console.log('Backend offline durante envio gratuito');
    }
}

// ===== FUNÇÕES GLOBAIS PARA HTML =====
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitQuiz = submitQuiz;
window.closeModal = function() {
    document.getElementById('paymentModal').classList.remove('active');
};
window.processPayment = processPayment;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa quiz
    initQuiz();
    
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });
    
    // Menu mobile
    document.getElementById('menuToggle')?.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
    
    // Fecha menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });
});

// ===== FUNÇÃO PARA ADICIONAR MAIS IDEIAS (USE NO CONSOLE) =====
function addMoreIdeas() {
    // Cole mais ideias aqui seguindo o formato:
    /*
    IDEIAS_DATABASE.push({
        id: 16,
        titulo: "Título da Ideia",
        descricao: "Descrição curta",
        tempo_min: 1,
        tempo_max: 4,
        recursos: ["computador"],
        habilidade: "organizado",
        local: "Qualquer",
        urgencia: "hoje",
        investimento_min: 0,
        investimento_max: 100,
        renda_min: 300,
        renda_max: 800,
        passos: "Passo 1...\nPasso 2...\nPasso 3...",
        links: "link1.com, link2.com"
    });
    */
}

