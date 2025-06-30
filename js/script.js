document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp-btn');
    const cartEmptyMessage = document.querySelector('.cart-empty-message');
    const mobileCartToggleBtn = document.getElementById('mobile-cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartItemCountSpan = document.getElementById('cart-item-count');

    let cart = JSON.parse(localStorage.getItem('forjaCart')) || [];

    // Função para atualizar o carrinho na interface
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Limpa os itens atuais
        let total = 0;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            checkoutWhatsappBtn.disabled = true;
        } else {
            cartEmptyMessage.style.display = 'none';
            checkoutWhatsappBtn.disabled = false;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="item-details">
                        <span class="item-name">🥗 ${item.name} (${item.size})</span>
                        <span class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="remove-item-btn" data-index="${index}"><i class="fas fa-times-circle"></i></button>
                `;
                cartItemsList.appendChild(li);
                total += item.price;
            });
        }

        cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartItemCountSpan.textContent = cart.length;
        localStorage.setItem('forjaCart', JSON.stringify(cart)); // Salva no localStorage
    }

    // Adicionar item ao carrinho
    productCards.forEach(card => {
        const addButton = card.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => {
            const productId = card.dataset.id;
            const productName = card.dataset.name;
            
            const selectedRadio = card.querySelector(`input[name="${productId}-size"]:checked`);
            if (!selectedRadio) {
                alert('Por favor, selecione um tamanho para a salada.');
                return;
            }

            const size = selectedRadio.value;
            const price = parseFloat(selectedRadio.dataset.price);

            const newItem = {
                id: productId,
                name: productName,
                size: size,
                price: price
            };

            cart.push(newItem);
            updateCartUI();
            
            // Abre o carrinho na mobile após adicionar um item
            if (window.innerWidth <= 768) {
                cartSidebar.classList.add('open');
            }
        });
    });

    // Remover item do carrinho
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.closest('.remove-item-btn')) {
            const button = event.target.closest('.remove-item-btn');
            const index = parseInt(button.dataset.index);
            
            // Remove o item do array 'cart'
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // Gerar mensagem para WhatsApp
    checkoutWhatsappBtn.addEventListener('click', () => {
        let whatsappMessage = "Olá, Forja do Sabor! Gostaria de fazer o seguinte pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            whatsappMessage += `🥗 ${item.name} (${item.size}) – R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
            total += item.price;
        });

        whatsappMessage += `\n💰 Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        whatsappMessage += `\n\n📍 Meu nome é: [Seu Nome]`;
        whatsappMessage += `\n🏠 Endereço para entrega: [Seu Endereço, Número, Bairro, Ponto de Referência]`;
        whatsappMessage += `\n📱 Telefone para contato: [Seu Telefone]`;
        whatsappMessage += `\n\n(Por favor, preencha seus dados acima para prosseguir com o pedido.)`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/5591985148050?text=${encodedMessage}`; // Seu número do WhatsApp

        window.open(whatsappUrl, '_blank');
    });

    // Toggle do carrinho para mobile
    mobileCartToggleBtn.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    // Fechar carrinho ao clicar fora dele no mobile (opcional, mas bom para UX)
    // document.addEventListener('click', (event) => {
    //     if (window.innerWidth <= 768 && cartSidebar.classList.contains('open') && 
    //         !cartSidebar.contains(event.target) && !mobileCartToggleBtn.contains(event.target) &&
    //         !event.target.closest('.add-to-cart-btn')) {
    //         cartSidebar.classList.remove('open');
    //     }
    // });

    // Inicializa a UI do carrinho ao carregar a página
    updateCartUI();
});
