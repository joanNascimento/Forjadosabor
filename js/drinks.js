// JavaScript para a página de drinks

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initCarousel();
    initCart();
    initSmoothScroll();
});

// ===== CARROSSEL DE DESTAQUES =====
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-prev-btn');
    const nextBtn = document.querySelector('.carousel-next-btn');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const slideWidth = 320; // largura do slide + gap
    
    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -slideWidth,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: slideWidth,
            behavior: 'smooth'
        });
    });
    
    // Auto-scroll no carrossel (opcional)
    let autoScrollInterval = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    }, 5000);
    
    // Pausar auto-scroll quando o usuário interage
    container.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }, 5000);
    });
}

// ===== SISTEMA DE CARRINHO =====
let cart = [];

function initCart() {
    // Carregar carrinho do localStorage
    loadCartFromStorage();
    updateCartDisplay();
    
    // Event listeners para botões de adicionar ao carrinho
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Event listeners para o modal do carrinho
    const cartFloatBtn = document.querySelector('.cart-float-button');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close-button');
    const checkoutBtn = document.getElementById('checkoutButton');
    
    if (cartFloatBtn) {
        cartFloatBtn.addEventListener('click', openCartModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartModal);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Fechar modal clicando fora
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
}

function handleAddToCart(e) {
    const btn = e.target;
    const drinkName = btn.dataset.name;
    const price300 = parseFloat(btn.getAttribute('data-price-300'));
    const price500 = parseFloat(btn.getAttribute('data-price-500'));
    
    // Mostrar modal de seleção de tamanho
    showSizeSelectionModal(drinkName, price300, price500);
}

function showSizeSelectionModal(drinkName, price300, price500) {
    // Criar modal de seleção de tamanho
    const modal = document.createElement('div');
    modal.className = 'size-selection-modal';
    modal.innerHTML = `
        <div class="size-modal-content">
            <h3>Escolha o tamanho para ${drinkName}</h3>
            <div class="size-options">
                <button class="size-option" data-size="300ml" data-price="${price300}">
                    300ml - R$ ${price300.toFixed(2)}
                </button>
                <button class="size-option" data-size="500ml" data-price="${price500}">
                    500ml - R$ ${price500.toFixed(2)}
                </button>
            </div>
            <button class="cancel-size">Cancelar</button>
        </div>
    `;
    
    // Adicionar estilos inline para o modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    const modalContent = modal.querySelector('.size-modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    const sizeOptions = modal.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.style.cssText = `
            display: block;
            width: 100%;
            padding: 1rem;
            margin: 0.5rem 0;
            background: linear-gradient(45deg, #ff5722, #ff9800);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        option.addEventListener('click', () => {
            const size = option.dataset.size;
            const price = parseFloat(option.dataset.price);
            addToCart(drinkName, size, price);
            document.body.removeChild(modal);
        });
    });
    
    const cancelBtn = modal.querySelector('.cancel-size');
    cancelBtn.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #ccc;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.body.appendChild(modal);
}

function addToCart(drinkName, size, price) {
    // Verificar se o item já existe no carrinho
    const existingItem = cart.find(item => 
        item.name === drinkName && item.size === size
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: drinkName,
            size: size,
            price: price,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    showAddToCartFeedback(drinkName, size);
}

function showAddToCartFeedback(drinkName, size) {
    // Criar notificação de sucesso
    const notification = document.createElement('div');
    notification.innerHTML = `${drinkName} (${size}) adicionado ao carrinho!`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartDisplay();
    updateCartModal();
}

function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCartToStorage();
        updateCartDisplay();
        updateCartModal();
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        updateCartModal();
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateCartModal() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsList || !cartTotal) return;
    
    // Limpar lista
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li style="text-align: center; color: #999;">Seu carrinho está vazio</li>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.size} - R$ ${item.price.toFixed(2)}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="background: #f44336; color: white; border: none; border-radius: 3px; width: 25px; height: 25px; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="background: #4caf50; color: white; border: none; border-radius: 3px; width: 25px; height: 25px; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${index})" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 0.2rem 0.5rem; cursor: pointer; margin-left: 0.5rem;">🗑️</button>
            </div>
        `;
        cartItemsList.appendChild(li);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Gerar mensagem para WhatsApp
    let message = '🍹 *Pedido - Forja do Sabor*\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `• ${item.name} (${item.size})\n`;
        message += `  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)} = R$ ${itemTotal.toFixed(2)}\n\n`;
        total += itemTotal;
    });
    
    message += `*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += 'Gostaria de finalizar este pedido! 🔥';
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5591985148050?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpar carrinho após envio
    cart = [];
    saveCartToStorage();
    updateCartDisplay();
    closeCartModal();
}

function saveCartToStorage() {
    localStorage.setItem('forjaDoSaborCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('forjaDoSaborCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== FUNÇÕES GLOBAIS (para uso inline) =====
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ===== ANIMAÇÕES CSS ADICIONAIS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

