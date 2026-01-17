let mp;
const PUBLIC_KEY_MP = 'TEST-597f533c-659d-484f-9685-04fac2f2a939';

// Inicializa Mercado Pago
function inicializarMP() {
    mp = new MercadoPago(PUBLIC_KEY_MP, {
        locale: 'pt-BR'
    });
}

// Cria preferência de pagamento
async function criarPagamento(email, respostas) {
    try {
        // Primeiro registra no nosso backend
        const registro = await enviarParaBackend('registrar_pagamento', {
            email: email,
            respostas: respostas
        });
        
        // Cria preferência no Mercado Pago
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        title: "Relatório Completo de Ideias de Renda",
                        description: `${registro.total} ideias personalizadas para seu perfil`,
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: 14.90
                    }
                ],
                payer: {
                    email: email
                },
                metadata: {
                    email: email,
                    respostas: JSON.stringify(respostas),
                    registro_id: registro.id
                },
                back_urls: {
                    success: `${window.location.origin}/sucesso.html`,
                    failure: `${window.location.origin}/erro.html`,
                    pending: `${window.location.origin}/erro.html`
                },
                auto_return: "approved",
                notification_url: `${BACKEND_URL}?action=webhook_mp`
            })
        });
        
        const preferencia = await response.json();
        return preferencia;
        
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        throw error;
    }
}

// Processa compra
document.getElementById('btnComprar')?.addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    
    if (!email) {
        alert('Por favor, informe seu email primeiro');
        return;
    }
    
    this.disabled = true;
    this.textContent = 'Processando...';
    
    try {
        const preferencia = await criarPagamento(email, respostasAtuais);
        
        // Redireciona para checkout
        window.location.href = preferencia.init_point;
        
    } catch (error) {
        alert('Erro ao processar pagamento. Tente novamente.');
        this.disabled = false;
        this.textContent = 'Quero a versão completa por R$ 14,90';
    }
});

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarMP);