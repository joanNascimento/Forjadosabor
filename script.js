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
                // Adiciona a quantidade e botões de controle de quantidade
                li.innerHTML = `
                    <div class="item-details">
                        <span class="item-name">🥗 ${item.name} (${item.size})</span>
                        <span class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="item-quantity-controls">
                        <button class="qty-btn-cart" data-index="${index}" data-action="decrease">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="qty-btn-cart" data-index="${index}" data-action="increase">+</button>
                    </div>
                    <button class="remove-item-btn" data-index="${index}"><i class="fas fa-times-circle"></i></button>
                `;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity; // Multiplica pelo total de itens
            });
        }

        cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartItemCountSpan.textContent = cart.length; // Conta itens únicos, não a quantidade total
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

            // Verifica se o item já existe no carrinho com o mesmo ID e tamanho
            const existingItem = cart.find(item => item.id === productId && item.size === size);

            if (existingItem) {
                existingItem.quantity += 1; // Aumenta a quantidade
            } else {
                const newItem = {
                    id: productId,
                    name: productName,
                    size: size,
                    price: price,
                    quantity: 1 // Inicia com 1
                };
                cart.push(newItem);
            }

            updateCartUI();
            
            // Abre o carrinho na mobile após adicionar um item
            if (window.innerWidth <= 768) {
                cartSidebar.classList.add('open');
            }
        });
    });

    // Remover ou ajustar quantidade do item do carrinho
    cartItemsList.addEventListener('click', (event) => {
        const target = event.target.closest('button');

        if (!target) return; // Se não clicou em um botão

        const index = parseInt(target.dataset.index);

        if (target.classList.contains('remove-item-btn')) {
            // Remove o item do array 'cart'
            cart.splice(index, 1);
        } else if (target.classList.contains('qty-btn-cart')) {
            const action = target.dataset.action;
            if (action === 'increase') {
                cart[index].quantity += 1;
            } else if (action === 'decrease') {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1); // Remove se a quantidade for 0 ou menos
                }
            }
        }
        updateCartUI();
    });

    // Gerar mensagem para WhatsApp
    checkoutWhatsappBtn.addEventListener('click', () => {
        let whatsappMessage = "Olá, Forja do Sabor! Gostaria de fazer o seguinte pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            whatsappMessage += `🥗 ${item.name} (${item.size}) - ${item.quantity}x – R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
            total += item.price * item.quantity;
        });

        whatsappMessage += `\n💰 *Total Geral:* R$ ${total.toFixed(2).replace('.', ',')}`;
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

    // Inicializa a UI do carrinho ao carregar a página
    updateCartUI();
});
