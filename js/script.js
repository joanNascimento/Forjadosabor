// JavaScript para o menu hambúrguer
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um item (para mobile)
    navList.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
});

// JavaScript para o carrinho de pedidos
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartIconHeader = document.querySelector('.cart-icon-header');
const cartCountHeader = document.querySelector('.cart-count-header');
const cartModal = document.getElementById('cartModal');
const closeButton = document.querySelector('.close-button');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountHeader.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItems() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart-message">Seu carrinho está vazio.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name} (${item.size})</h4>
                    <p>R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
                    <button class="remove-item-btn" data-id="${item.id}">Remover</button>
                </div>
            `;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = total.toFixed(2);
    updateCartCount();
}

function addItemToCart(name, price, size) {
    const id = `${name}-${size}`;
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, size, quantity: 1 });
    }
    saveCart();
    renderCartItems();
}

function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems();
}

function updateItemQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeItemFromCart(id);
        }
        saveCart();
        renderCartItems();
    }
}

// Event Listeners
cartIconHeader.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    renderCartItems();
});

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

cartItemsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item-btn')) {
        const id = event.target.dataset.id;
        removeItemFromCart(id);
    }
});

cartItemsList.addEventListener('change', (event) => {
    if (event.target.classList.contains('item-quantity')) {
        const id = event.target.dataset.id;
        const quantity = event.target.value;
        updateItemQuantity(id, quantity);
    }
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
        return;
    }

    let orderMessage = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    let total = 0;

    cart.forEach(item => {
        orderMessage += `- ${item.name} (${item.size}) x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });

    orderMessage += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
    orderMessage += 'Por favor, confirme meu pedido e me informe sobre as opções de pagamento e entrega.';

    const whatsappUrl = `https://wa.me/5591985148050?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Limpar carrinho após o pedido (opcional)
    cart = [];
    saveCart();
    renderCartItems();
    cartModal.style.display = 'none';
});

// Adicionar evento de clique aos botões 'Adicionar ao Carrinho'
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        const price300 = parseFloat(e.target.dataset.price300);
        const price500 = parseFloat(e.target.dataset.price500);

        // Exibir modal de seleção de tamanho
        const sizeModal = document.createElement('div');
        sizeModal.classList.add('size-selection-modal');
        sizeModal.innerHTML = `
            <div class="size-selection-content">
                <h3>Selecione o Tamanho para ${name}</h3>
                <button class="size-option-btn" data-size="300ml" data-price="${price300}">300ml (R$ ${price300.toFixed(2)})</button>
                <button class="size-option-btn" data-size="500ml" data-price="${price500}">500ml (R$ ${price500.toFixed(2)})</button>
                <button class="cancel-size-selection-btn">Cancelar</button>
            </div>
        `;
        document.body.appendChild(sizeModal);

        sizeModal.querySelector('.size-selection-content').addEventListener('click', (event) => {
            if (event.target.classList.contains('size-option-btn')) {
                const size = event.target.dataset.size;
                const price = parseFloat(event.target.dataset.price);
                addItemToCart(name, price, size);
                sizeModal.remove();
                alert(`${name} (${size}) adicionado ao carrinho!`);
            } else if (event.target.classList.contains('cancel-size-selection-btn')) {
                sizeModal.remove();
            }
        });

        sizeModal.addEventListener('click', (event) => {
            if (event.target === sizeModal) {
                sizeModal.remove();
            }
        });
    });
});

// Inicializar contagem do carrinho ao carregar a página
updateCartCount();

// JavaScript para o carrossel (apenas na página de drinks)
if (window.location.pathname.includes('drinks.html')) {
    const carouselSlides = document.querySelectorAll('.carousel-slide-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // Auto-play do carrossel
    setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos

    showSlide(currentSlide);
}

// Estilos para o modal de seleção de tamanho (adicionar ao CSS principal ou aqui)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
.size-selection-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 2001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.6);
}

.size-selection-content {
    background-color: #fefefe;
    margin: auto;
    padding: 30px;
    border: 1px solid #888;
    width: 90%;
    max-width: 400px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}

.size-selection-content h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.size-option-btn {
    background-color: var(--primary-color);
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin: 5px;
    transition: background-color 0.3s ease;
}

.size-option-btn:hover {
    background-color: #4CAF50;
}

.cancel-size-selection-btn {
    background-color: #ccc;
    color: #333;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    margin-top: 15px;
    transition: background-color 0.3s ease;
}

.cancel-size-selection-btn:hover {
    background-color: #bbb;
}
`;
document.head.appendChild(styleSheet);


