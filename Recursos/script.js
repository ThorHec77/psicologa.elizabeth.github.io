/// ========== TYPOGRAPHIC EFFECTS ==========
document.addEventListener('DOMContentLoaded', function() {
    // AOS Initialization (ya está en el HTML, pero lo ponemos aquí también)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>¡Mensaje enviado!';
                btn.classList.add('btn-success');
                btn.classList.remove('btn-primary');
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('mainNav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
            navbar.style.background = 'rgba(255,255,255,0.98)';
        } else {
            navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.06)';
            navbar.style.background = 'rgba(255,255,255,0.95)';
        }
        lastScroll = currentScroll;
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== SEARCH FUNCTION (mejorada) ==========
    const formSearch = document.getElementById('formSearch');
    const inputSearch = document.getElementById('inputSearch');
    const searchResultMessage = document.getElementById('searchResultMessage');

    if (formSearch && inputSearch) {
        formSearch.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchTerm = inputSearch.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                searchResultMessage.textContent = 'Por favor, ingresa un término de búsqueda.';
                return;
            }

            // Remover resaltados anteriores
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });

            // Buscar en el contenido
            const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, .card-text, .hero-text');
            let found = false;

            allElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    element.classList.add('search-highlight');
                    found = true;
                }
            });

            if (found) {
                searchResultMessage.textContent = `✅ Se encontraron resultados para "${searchTerm}"`;
                searchResultMessage.style.color = '#10B981';
                // Scroll al primer resultado
                const firstResult = document.querySelector('.search-highlight');
                if (firstResult) {
                    firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                searchResultMessage.textContent = `❌ No se encontraron resultados para "${searchTerm}"`;
                searchResultMessage.style.color = '#EF4444';
            }
        });

        // Limpiar mensaje al escribir
        inputSearch.addEventListener('input', function() {
            if (this.value === '') {
                searchResultMessage.textContent = '';
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.classList.remove('search-highlight');
                });
            }
        });
    }

    // ========== IMAGE HOVER EFFECTS (mantener compatibilidad) ==========
    // Las funciones existentes de cambio de imágenes se mantienen
    window.cambiarImg = function(img) {
        document.getElementById('faceboock').src = img;
    };
    window.cambiarImg1 = function(img) {
        document.getElementById('whatsapp').src = img;
    };
    window.cambiarImg2 = function(img) {
        document.getElementById('instagram').src = img;
    };
});

// ========== CONSOLE BRANDING ==========
console.log('%c🧠 Lic. Elizabeth Camejo - Psicología', 'font-size: 20px; font-weight: bold; color: #7C3AED;');
console.log('%c📱 +598 99 518 453', 'font-size: 14px; color: #6B7280;');
console.log('%c💜 Cuidando tu salud mental', 'font-size: 14px; color: #6B7280;');