// ========== TYPOGRAPHIC EFFECTS ==========
document.addEventListener('DOMContentLoaded', function() {
    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800
        });
    }

    // ========== CONTACT FORMS (AJAX) ==========
    function setupContactForm(formId, alertId) {
        const form = document.getElementById(formId);
        const alertBox = document.getElementById(alertId);
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            btn.disabled = true;
            if (alertBox) alertBox.className = 'alert d-none';

            try {
                const formData = new FormData(form);
                const res = await fetch(form.getAttribute('action') || 'send_email.php', {
                    method: 'POST',
                    body: formData,
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const data = await res.json();

                if (alertBox) {
                    alertBox.className = 'alert ' + (data.success ? 'alert-success' : 'alert-danger');
                    alertBox.textContent = data.message;
                }

                if (data.success) {
                    btn.innerHTML = '<i class="fas fa-check me-2"></i>¡Enviado!';
                    btn.classList.add('btn-success');
                    btn.classList.remove('btn-primary');
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('btn-success');
                        btn.classList.add('btn-primary');
                        btn.disabled = false;
                        if (alertBox) alertBox.className = 'alert d-none';
                    }, 4000);
                } else {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            } catch (err) {
                console.error(err);
                if (alertBox) {
                    alertBox.className = 'alert alert-danger';
                    alertBox.textContent = 'Error de red. Intenta nuevamente.';
                }
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    setupContactForm('contactForm', 'contactFormAlert');       // formulario sección final
    setupContactForm('contactFormModal', 'modalFormAlert');    // formulario modal agendar cita

    // ========== NAVBAR SCROLL ==========
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
            navbar.style.background = 'rgba(255,255,255,0.98)';
        } else {
            navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.06)';
            navbar.style.background = 'rgba(255,255,255,0.95)';
        }
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== SEARCH FUNCTION ==========
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

            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });

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
                const firstResult = document.querySelector('.search-highlight');
                if (firstResult) {
                    firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                searchResultMessage.textContent = `❌ No se encontraron resultados para "${searchTerm}"`;
                searchResultMessage.style.color = '#EF4444';
            }
        });

        inputSearch.addEventListener('input', function() {
            if (this.value === '') {
                searchResultMessage.textContent = '';
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.classList.remove('search-highlight');
                });
            }
        });
    }

    // ========== IMAGE HOVER EFFECTS ==========
    window.cambiarImg = function(img) {
        const el = document.getElementById('faceboock');
        if (el) el.src = img;
    };
    window.cambiarImg1 = function(img) {
        const el = document.getElementById('whatsapp');
        if (el) el.src = img;
    };
    window.cambiarImg2 = function(img) {
        const el = document.getElementById('instagram');
        if (el) el.src = img;
    };
});

// ========== CONSOLE BRANDING ==========
console.log('%c🧠 Lic. Elizabeth Camejo - Psicología', 'font-size: 20px; font-weight: bold; color: #7C3AED;');
console.log('%c📱 +598 99 518 453', 'font-size: 14px; color: #6B7280;');
console.log('%c💜 Cuidando tu salud mental', 'font-size: 14px; color: #6B7280;');