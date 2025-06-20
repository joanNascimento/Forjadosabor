
// saladas.js

document.addEventListener("DOMContentLoaded", function() {
    const baseOptions = document.querySelectorAll('input[name="base"]');
    const proteinaOptions = document.querySelectorAll('input[name="proteina"]');
    const extraCheckboxes = document.querySelectorAll('input[name="extra"]');
    const planoOptions = document.querySelectorAll('input[name="plano"]');
    const totalPriceSpan = document.getElementById('total-price');
    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    const errorMessageDiv = document.getElementById('error-message');

    function calculateTotalPrice() {
        let selectedBase = document.querySelector('input[name="base"]:checked');
        let selectedProteina = document.querySelector('input[name="proteina"]:checked');
        let selectedPlano = document.querySelector('input[name="plano"]:checked');
        let selectedExtras = Array.from(extraCheckboxes).filter(checkbox => checkbox.checked);

        let totalPrice = 0;
        let isValid = true;
        let message = '';

        // Validação de Base e Proteína
        if (!selectedBase) {
            message = 'Por favor, escolha uma base.';
            isValid = false;
        } else if (!selectedProteina) {
            message = 'Por favor, escolha uma proteína.';
            isValid = false;
        } else if (!selectedPlano) {
            message = 'Por favor, escolha um plano.';
            isValid = false;
        } else {
            totalPrice = parseFloat(selectedPlano.dataset.price);

            // Validação de Extras baseada no plano
            const numExtras = selectedExtras.length;
            const planoValue = selectedPlano.value;

            if (planoValue === 'Essencial' && numExtras > 3) {
                message = 'O plano Essencial permite no máximo 3 extras.';
                isValid = false;
            } else if (planoValue === 'Completo' && numExtras > 5) {
                message = 'O plano Completo permite no máximo 5 extras.';
                isValid = false;
            } else if (planoValue === 'Premium' && numExtras > 5) {
                message = 'O plano Premium permite no máximo 5 extras.';
                isValid = false;
            }

            // Desabilitar extras se o limite for atingido
            if (planoValue === 'Essencial' && numExtras >= 3) {
                extraCheckboxes.forEach(checkbox => {
                    if (!checkbox.checked) {
                        checkbox.disabled = true;
                    }
                });
            } else if ((planoValue === 'Completo' || planoValue === 'Premium') && numExtras >= 5) {
                extraCheckboxes.forEach(checkbox => {
                    if (!checkbox.checked) {
                        checkbox.disabled = true;
                    }
                });
            } else {
                extraCheckboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                });
            }
        }

        totalPriceSpan.textContent = totalPrice.toFixed(2).replace('.', ',');
        errorMessageDiv.textContent = message;
        whatsappOrderBtn.disabled = !isValid;
    }

    function generateWhatsappMessage() {
        let selectedBase = document.querySelector('input[name="base"]:checked');
        let selectedProteina = document.querySelector('input[name="proteina"]:checked');
        let selectedPlano = document.querySelector('input[name="plano"]:checked');
        let selectedExtras = Array.from(extraCheckboxes).filter(checkbox => checkbox.checked);

        if (!selectedBase || !selectedProteina || !selectedPlano) {
            alert('Por favor, complete todas as seleções obrigatórias antes de finalizar o pedido.');
            return;
        }

        let message = `Olá, Forja do Sabor! Gostaria de pedir uma salada personalizada:\n\n`;
        message += `*Base:* ${selectedBase.value}\n`;
        message += `*Proteína:* ${selectedProteina.value}\n`;

        if (selectedExtras.length > 0) {
            message += `*Extras:* ${selectedExtras.map(e => e.value).join(', ')}\n`;
        } else {
            message += `*Extras:* Nenhum\n`;
        }

        message += `*Plano:* ${selectedPlano.value}\n`;
        message += `*Total:* R$ ${totalPriceSpan.textContent}\n\n`;
        message += `Aguardando a confirmação!`;

        const whatsappUrl = `https://wa.me/5591985148050?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Adiciona listeners para recalcular o preço e validar
    baseOptions.forEach(option => option.addEventListener('change', calculateTotalPrice));
    proteinaOptions.forEach(option => option.addEventListener('change', calculateTotalPrice));
    extraCheckboxes.forEach(checkbox => checkbox.addEventListener('change', calculateTotalPrice));
    planoOptions.forEach(option => option.addEventListener('change', calculateTotalPrice));

    whatsappOrderBtn.addEventListener('click', generateWhatsappMessage);

    // Chamada inicial para definir o estado do botão e preço
    calculateTotalPrice();
});


