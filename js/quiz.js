let respostasAtuais = {};
let passoAtual = 1;
const totalPassos = 6; // Ajuste conforme número de perguntas

function avancarPergunta() {
    const perguntaAtual = document.querySelector(`.pergunta[data-step="${passoAtual}"]`);
    const selecionado = perguntaAtual.querySelector('input:checked');
    
    if (!selecionado) {
        alert('Por favor, selecione uma opção');
        return;
    }
    
    // Salva resposta
    const nome = selecionado.name;
    respostasAtuais[nome] = selecionado.value;
    
    // Esconde pergunta atual
    perguntaAtual.classList.remove('active');
    
    // Mostra próxima pergunta ou finaliza
    if (passoAtual < totalPassos) {
        passoAtual++;
        const proximaPergunta = document.querySelector(`.pergunta[data-step="${passoAtual}"]`);
        proximaPergunta.classList.add('active');
        atualizarProgresso();
    } else {
        processarQuiz();
    }
}

function atualizarProgresso() {
    const progresso = (passoAtual / totalPassos) * 100;
    document.getElementById('progressBar').style.width = `${progresso}%`;
}

async function processarQuiz() {
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert('Por favor, informe seu email');
        return;
    }
    
    // Mostra loading
    document.getElementById('quizForm').classList.add('hidden');
    document.getElementById('resultado').innerHTML = '<p>Analisando suas respostas...</p>';
    document.getElementById('resultado').classList.remove('hidden');
    
    try {
        // Envia para backend
        const resultado = await enviarParaBackend('processar_quiz', {
            email: email,
            respostas: respostasAtuais
        });
        
        // Exibe resultados
        exibirResultados(resultado);
        
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('resultado').innerHTML = `
            <p>Erro ao processar. Por favor, tente novamente.</p>
            <button onclick="window.location.reload()">Recomeçar</button>
        `;
    }
}

function exibirResultados(resultado) {
    const container = document.getElementById('ideiasContainer');
    const upsell = document.getElementById('upsell');
    const totalIdeias = document.getElementById('totalIdeias');
    
    if (!resultado.ideias || resultado.ideias.length === 0) {
        container.innerHTML = '<p>Nenhuma ideia encontrada para seu perfil.</p>';
        return;
    }
    
    // Exibe 3 ideias gratuitas
    let html = '<h3>🎯 Suas 3 melhores opções:</h3>';
    resultado.ideias.forEach((ideia, index) => {
        html += `
            <div class="ideia-card">
                <h4>${index + 1}. ${ideia.titulo}</h4>
                <p>${ideia.descricao}</p>
                <div class="detalhes">
                    <span>💰 R$${ideia.renda_min}-${ideia.renda_max}/mês</span>
                    <span>⏰ ${ideia.tempo_min}-${ideia.tempo_max}h/dia</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Mostra upsell se houver mais ideias
    if (resultado.upsell && resultado.total_ideias > 3) {
        totalIdeias.textContent = resultado.total_ideias;
        upsell.classList.remove('hidden');
    }
}