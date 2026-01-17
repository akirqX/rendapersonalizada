// ===== CONFIGURAÇÃO =====
// SUBSTITUA ESTA URL PELA URL DO SEU GOOGLE APPS SCRIPT PUBLICADO
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbzkAgqdJYKcdi4ACu8Q3cxPSAsjbCXiX8AuRYoWBuFNxSi79WBto-RqQwe3sgnDYKQv7w/exec';

// ===== BANCO DE IDEIAS COMPLETO (15 IDEIAS) =====
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
    }
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
let totalIdeasCount = 0; // AGORA É DINÂMICO, NÃO MAIS FIXO

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

async function showResults() {
    // Esconde último passo
    const lastStep = document.getElementById(`step${totalSteps}`);
    if (lastStep) lastStep.classList.remove('active');
    
    // Mostra resultados
    const resultsStep = document.getElementById('resultsStep');
    if (resultsStep) resultsStep.classList.add('active');
    
    // 1. BUSCA IDEIAS COMPATÍVEIS LOCALMENTE (para mostrar rápido)
    compatibleIdeas = findCompatibleIdeas();
    totalIdeasCount = compatibleIdeas.length;
    
    console.log(`Encontradas ${totalIdeasCount} ideias compatíveis localmente`);
    
    // 2. ENVIA PARA O BACKEND E OBTÉM DADOS REAIS (se conectado)
    try {
        const backendData = await sendQuizToBackend();
        
        if (backendData && backendData.sucesso) {
            // Atualiza com dados do backend (mais preciso)
            totalIdeasCount = backendData.total_ideias || totalIdeasCount;
            
            // Marca se tem upsell disponível
            if (backendData.upsell) {
                const upsellSection = document.querySelector('.upsell-section');
                if (upsellSection) upsellSection.style.display = 'block';
            }
            
            console.log(`Backend confirmou: ${totalIdeasCount} ideias totais`);
        }
    } catch (error) {
        console.log("Usando dados locais (backend offline): ", error);
    }
    
    // 3. ATUALIZA TODOS OS NÚMEROS NA PÁGINA DE FORMA DINÂMICA
    updateAllNumbers(totalIdeasCount);
    
    // 4. GERA COMPATIBILIDADE REALISTA (85-98%)
    generateRealisticCompatibility();
    
    // 5. EXIBE 3 IDEIAS GRATUITAS
    const freeIdeasToShow = compatibleIdeas.slice(0, 3);
    displayFreeIdeas(freeIdeasToShow);
    
    // 6. SALVA LOCALMENTE PARA RECUPERAR NO PAGAMENTO
    saveToLocalStorage();
    
    // 7. INICIA TIMER DE URGÊNCIA
    startUrgencyTimer();
    
    // Scroll suave para resultados
    setTimeout(() => {
        resultsStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

async function sendQuizToBackend() {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'processar_quiz',
                email: responses.email,
                respostas: responses
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Erro ao conectar com backend: ", error);
        return null;
    }
}

function updateAllNumbers(total) {
    // Atualiza TODOS os lugares onde aparece o número de ideias
    const elementsToUpdate = [
        'totalIdeias',
        'totalIdeiasAlert', 
        'totalIdeiasComp'
    ];
    
    elementsToUpdate.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = total;
        }
    });
    
    // Atualiza também textos dinâmicos
    const titleElement = document.querySelector('.results-title');
    if (titleElement) {
        const newTitle = titleElement.innerHTML.replace(/\d+ oportunidades/, `${total} oportunidades`);
        titleElement.innerHTML = newTitle;
    }
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

function generateRealisticCompatibility() {
    // Gera score de compatibilidade realista (85-98%)
    let baseScore = 85;
    
    // Baseado no número de ideias encontradas
    if (totalIdeasCount > 10) baseScore += 8;
    else if (totalIdeasCount > 5) baseScore += 5;
    else if (totalIdeasCount > 0) baseScore += 2;
    
    // Adiciona variação aleatória
    const randomBonus = Math.floor(Math.random() * 5);
    const finalScore = Math.min(98, baseScore + randomBonus);
    
    // Atualiza na tela com animação
    const scoreElement = document.getElementById('compatibilityScore');
    if (scoreElement) {
        // Animação de contagem
        let current = 85;
        const interval = setInterval(() => {
            current++;
            scoreElement.textContent = current;
            
            if (current >= finalScore) {
                clearInterval(interval);
                scoreElement.textContent = finalScore;
            }
        }, 50);
    }
    
    return finalScore;
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
        // Calcula compatibilidade individual (para visualização)
        const compatibility = 85 + (index * 4);
        
        html += `
            <div class="idea-result" style="animation-delay: ${index * 0.2}s">
                <div class="idea-icon-result">${getIdeaIcon(ideia)}</div>
                <div class="idea-content-result">
                    <div class="idea-header">
                        <h4>${index + 1}. ${ideia.titulo}</h4>
                        <span class="compatibility-badge">${compatibility}% match</span>
                    </div>
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
                    <div class="idea-limitation">
                        <i class="fas fa-lock"></i>
                        <span>Plano detalhado e templates disponíveis na versão completa</span>
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
    localStorage.setItem('totalIdeasCount', totalIdeasCount.toString());
}

// ===== TIMER DE URGÊNCIA =====

function startUrgencyTimer() {
    let minutes = 14;
    let seconds = 59;
    
    const timerElement = document.getElementById('countdown');
    if (!timerElement) return;
    
    const timer = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                timerElement.textContent = 'EXPIRADO!';
                timerElement.style.color = '#f44336';
                timerElement.style.animation = 'pulse 1s infinite';
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
        
        if (minutes < 5) {
            timerElement.style.color = '#ff6b6b';
            
            if (minutes < 2) {
                timerElement.style.animation = 'pulse 0.8s infinite';
            }
        }
    }, 1000);
}

// ===== PAGAMENTO COM MERCADO PAGO (INTEGRAÇÃO REAL) =====

async function processPayment() {
    try {
        // 1. Abre modal de carregamento
        document.getElementById('paymentModal').classList.add('active');
        const paymentContainer = document.getElementById('paymentContainer');
        
        paymentContainer.innerHTML = `
            <div class="loading-payment">
                <div class="spinner"></div>
                <p>Criando link de pagamento seguro...</p>
            </div>
        `;
        
        // 2. Envia dados para o backend criar pagamento no Mercado Pago
        const paymentData = {
            action: 'registrar_pagamento',
            email: responses.email,
            respostas: responses,
            produto: "Relatório Completo de Ideias de Renda",
            valor: 14.90,
            ideias_count: totalIdeasCount
        };
        
        console.log("Enviando dados para pagamento:", paymentData);
        
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // 3. O backend deve retornar a URL do Mercado Pago
        if (data.payment_url) {
            // Redireciona para o checkout do Mercado Pago
            console.log("Redirecionando para:", data.payment_url);
            window.location.href = data.payment_url;
        } else if (data.preference_id) {
            // Fallback: mostra botão manual com link
            paymentContainer.innerHTML = `
                <div class="payment-manual">
                    <div class="success-icon">✅</div>
                    <h4>Pronto para pagar!</h4>
                    <p>Clique no botão abaixo para finalizar sua compra de <strong>R$ 14,90</strong>.</p>
                    <p><strong>Detalhes:</strong></p>
                    <ul>
                        <li>📧 Email: ${responses.email}</li>
                        <li>💡 Ideias: ${totalIdeasCount} personalizadas</li>
                        <li>🎁 Bônus: Todos incluídos</li>
                        <li>🛡️ Garantia: 30 dias</li>
                    </ul>
                    <a href="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.preference_id}" 
                       class="btn btn-primary btn-lg" style="margin: 15px 0;">
                        <i class="fas fa-lock"></i> Pagar com Mercado Pago
                    </a>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        Cancelar
                    </button>
                </div>
            `;
        } else {
            throw new Error('Nenhum link de pagamento retornado');
        }
        
    } catch (error) {
        console.error('Erro no pagamento:', error);
        showPaymentError(error.message || 'Não foi possível criar o pagamento.');
    }
}

function showPaymentError(message) {
    const paymentContainer = document.getElementById('paymentContainer');
    paymentContainer.innerHTML = `
        <div class="payment-error">
            <div class="error-icon">❌</div>
            <h4>Erro no processamento</h4>
            <p>${message || 'Não foi possível criar o pagamento.'}</p>
            <p><strong>Solução:</strong></p>
            <ol>
                <li>Verifique se o Google Apps Script está publicado</li>
                <li>Confirme as credenciais do Mercado Pago no script</li>
                <li>Teste novamente em alguns minutos</li>
            </ol>
            <button class="btn btn-secondary" onclick="closeModal()">
                Fechar
            </button>
        </div>
    `;
}

async function sendFreeResults() {
    if (!responses.email) {
        alert('Por favor, forneça seu email primeiro.');
        return;
    }
    
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'enviar_gratuito',
                email: responses.email,
                respostas: responses,
                free_ideas: compatibleIdeas.slice(0, 3).map(i => i.id)
            })
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            alert(`✅ As 3 ideias grátis foram processadas!\n\nEmail: ${responses.email}\n\nVerifique sua caixa de entrada e spam.`);
            
            // Opcional: redireciona para página de confirmação
            // window.location.href = 'obrigado.html';
        } else {
            alert(`📧 Processando suas ideias grátis...\n\nEm breve você receberá no email:\n${responses.email}`);
        }
        
    } catch (error) {
        alert(`📧 As ideias grátis serão enviadas para:\n\n${responses.email}\n\n(Erro de conexão com servidor)`);
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
window.sendFreeResults = sendFreeResults;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa quiz
    initQuiz();
    
    // Recupera dados salvos se existirem
    const savedResponses = localStorage.getItem('quizResponses');
    const savedIdeas = localStorage.getItem('compatibleIdeas');
    
    if (savedResponses) {
        try {
            responses = JSON.parse(savedResponses);
        } catch (e) {
            console.log("Erro ao recuperar respostas salvas");
        }
    }
    
    if (savedIdeas) {
        try {
            compatibleIdeas = JSON.parse(savedIdeas);
            totalIdeasCount = parseInt(localStorage.getItem('totalIdeasCount')) || compatibleIdeas.length;
        } catch (e) {
            console.log("Erro ao recuperar ideias salvas");
        }
    }
    
    console.log('Quiz inicializado com sucesso!');
});



