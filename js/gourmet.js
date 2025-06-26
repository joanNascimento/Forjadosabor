document.addEventListener('DOMContentLoaded', () => {
    // Para a página de Gourmet, os botões de "Pedir Agora" já contêm os links diretos para o WhatsApp no HTML.
    // Este arquivo JS pode ser usado para futuras funcionalidades, como:
    // - Um pop-up de confirmação antes de ir para o WhatsApp
    // - Adicionar itens a um "carrinho" local antes de gerar um pedido único para o WhatsApp
    // - Alguma animação ou efeito visual ao clicar nos botões

    // Exemplo de como você poderia adicionar um listener para um pop-up de confirmação (opcional):
    /*
    const orderButtons = document.querySelectorAll('.btn-gourmet');

    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o redirecionamento imediato

            const productName = button.closest('.gourmet-item').querySelector('h3').textContent;
            const productPrice = button.closest('.gourmet-item').querySelector('.gourmet-price').textContent;
            const whatsappLink = button.getAttribute('href');

            const confirmMessage = `Você deseja pedir "${productName}" por ${productPrice}?`;
            if (confirm(confirmMessage)) {
                window.open(whatsappLink, '_blank');
            }
        });
    });
    */

    // Se não houver lógica JS complexa para esta página no momento, este arquivo pode permanecer vazio
    // ou com comentários para organização.
});
