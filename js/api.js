const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwTE2NrLvZS7GxajuYRr1UTPBO-LgiOPYekA6V7lInHgwA2gGqIBol3RCmVuWOzq4pIZw/exec';

async function enviarParaBackend(action, data) {
    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: action,
            ...data
        })
    });
    
    if (!response.ok) {
        throw new Error('Erro na comunicação com o servidor');
    }
    
    return await response.json();
}

// Para desenvolvimento local
function getBackendUrl() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // URL do Google Script (alterar após publicar)
        return 'https://script.google.com/macros/s/AKfycbwTE2NrLvZS7GxajuYRr1UTPBO-LgiOPYekA6V7lInHgwA2gGqIBol3RCmVuWOzq4pIZw/exec';
    }
    return BACKEND_URL;
}
