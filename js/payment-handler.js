// payment-handler.js - Lógica específica para Mercado Pago

class PaymentHandler {
    constructor(backendUrl) {
        this.backendUrl = backendUrl;
        this.paymentStatus = {
            PENDING: 'pending',
            APPROVED: 'approved',
            REJECTED: 'rejected'
        };
    }
    
    // Cria preferência de pagamento no Mercado Pago via seu backend
    async createPaymentPreference(paymentData) {
        try {
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'create_payment',
                    ...paymentData
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
            throw error;
        }
    }
    
    // Verifica status do pagamento
    async checkPaymentStatus(paymentId) {
        try {
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'check_payment',
                    payment_id: paymentId
                })
            });
            
            return await response.json();
            
        } catch (error) {
            console.error('Erro ao verificar pagamento:', error);
            return { status: 'error', message: error.message };
        }
    }
    
    // Gera QR Code PIX (se necessário)
    async generatePixCode(paymentData) {
        try {
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'generate_pix',
                    ...paymentData
                })
            });
            
            return await response.json();
            
        } catch (error) {
            console.error('Erro ao gerar PIX:', error);
            throw error;
        }
    }
}

// Instância global para uso
const paymentHandler = new PaymentHandler(BACKEND_URL);
