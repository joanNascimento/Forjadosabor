document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active'); // Adiciona classe para animar o ícone
        });

        // Fechar o menu ao clicar em um item (mobile)
        navList.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Apenas em telas menores
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // Carrossel (somente na página inicial)
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.getElementById('carousel-prev');
        const nextButton = document.getElementById('carousel-next');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }

        // Auto-play do carrossel
        let autoPlayInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos

        // Pausar auto-play no hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });

        showSlide(currentIndex); // Mostra o slide inicial
    }

    // Marca o link ativo na navegação
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkPath === 'index.html') {
            // Caso especial para a página inicial acessada sem "index.html" no path
            link.classList.add('active');
        }
    });
});
