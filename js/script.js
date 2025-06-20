// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Lógica para o menu responsivo
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
        });
    }

    // Lógica para o carrossel de banners (apenas na página inicial)
    const bannerCarousel = document.querySelector(".banner-carousel");
    const carouselNavButtons = document.querySelectorAll(".carousel-nav button");
    const prevButton = document.querySelector(".carousel-nav .prev");
    const nextButton = document.querySelector(".carousel-nav .next");

    if (bannerCarousel) {
        let currentIndex = 0;
        const totalBanners = bannerCarousel.children.length;

        function updateCarousel() {
            bannerCarousel.style.transform = `translateX(${-currentIndex * 100 / totalBanners}%)`;
            carouselNavButtons.forEach((button, index) => {
                if (index === currentIndex) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
        }

        carouselNavButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalBanners - 1;
                updateCarousel();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex < totalBanners - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }

        // Auto-play do carrossel
        setInterval(() => {
            currentIndex = (currentIndex < totalBanners - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000); // Muda a cada 5 segundos

        updateCarousel(); // Inicializa o carrossel
    }
});


