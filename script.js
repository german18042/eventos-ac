document.addEventListener('DOMContentLoaded', function() {
    // Configuración del slider
    initSlider();
    
    // Validación del formulario de contacto
    initContactForm();
    
    // Control de la barra de navegación al hacer scroll
    initScrollNavigation();
});

// Función para inicializar el slider
function initSlider() {
    const slides = [
        {
            title: 'Event',
            subtitle: 'Los mejores Espectáculos artísticos',
            description: 'Fusionamos arte, creatividad y comunicación para dar vida a eventos espectaculares y campañas publicitarias que transmiten el mensaje de tu marca de forma auténtica y poderosa.',
            image: 'img/evento1.jpg'
        },
        {
            title: 'Creatividad',
            subtitle: 'Experiencias únicas y memorables',
            description: 'Diseñamos experiencias que conectan con tu audiencia y dejan una impresión duradera, combinando tecnología, arte y narrativa de forma innovadora.',
            image: 'img/evento2.jpg'
        },
        {
            title: 'Producción',
            subtitle: 'Eventos de alta calidad',
            description: 'Nuestro equipo de profesionales garantiza que cada detalle de tu evento sea perfecto, desde la planificación hasta la ejecución.',
            image: 'img/evento3.jpg'
        },
        {
            title: 'Comunicación',
            subtitle: 'Mensajes que impactan',
            description: 'Creamos campañas publicitarias que transmiten tu mensaje de forma efectiva y memorable, conectando con tu público objetivo.',
            image: 'img/evento4.jpg'
        },
        {
            title: 'Innovación',
            subtitle: 'Siempre a la vanguardia',
            description: 'Incorporamos las últimas tendencias y tecnologías para crear eventos y campañas que destacan por su originalidad y efectividad.',
            image: 'img/evento5.jpg'
        },
        {
            title: 'Resultados',
            subtitle: 'Objetivos cumplidos',
            description: 'Nos enfocamos en generar resultados tangibles para tu marca, midiendo el impacto y optimizando cada acción para maximizar el retorno de inversión.',
            image: 'img/evento6.jpg'
        }
    ];

    const sliderContainer = document.querySelector('.slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    // Limpiar el contenido inicial del slider
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Crear slides dinámicamente
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        if (index === 0) slideElement.classList.add('active');
        
        slideElement.innerHTML = `
            <div class="slide-content">
                <h1>${slide.title}</h1>
                <h2>${slide.subtitle}</h2>
                <p>${slide.description}</p>
                <button class="btn-primary">CONTÁCTANOS</button>
            </div>
            <div class="slide-image">
                <img src="${slide.image}" alt="${slide.title}">
            </div>
        `;
        
        sliderContainer.appendChild(slideElement);
        
        // Crear dots para navegación
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    // Variables para controlar el slider
    let currentSlide = 0;
    const slideElements = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Función para cambiar de slide
    function goToSlide(index) {
        // Remover clase active de todos los slides y dots
        slideElements.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Añadir clase active al slide y dot actual
        slideElements[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Event listeners para botones de navegación
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideElements.length) % slideElements.length;
        goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideElements.length;
        goToSlide(currentSlide);
    });
    
    // Event listeners para dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        });
    });
    
    // Autoplay del slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideElements.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Hacer que el botón de contacto lleve a la sección de contacto
    const contactButtons = document.querySelectorAll('.slide .btn-primary');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Función para inicializar y validar el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            let isValid = true;
            let errorMessage = '';
            
            if (nombre === '') {
                isValid = false;
                errorMessage += 'El nombre es requerido.\n';
            }
            
            if (correo === '') {
                isValid = false;
                errorMessage += 'El correo es requerido.\n';
            } else if (!isValidEmail(correo)) {
                isValid = false;
                errorMessage += 'El correo electrónico no es válido.\n';
            }
            
            if (asunto === '') {
                isValid = false;
                errorMessage += 'El asunto es requerido.\n';
            }
            
            if (mensaje === '') {
                isValid = false;
                errorMessage += 'El mensaje es requerido.\n';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // Si todo está correcto, mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
}

// Función para validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para controlar la visibilidad de la barra de navegación al hacer scroll
function initScrollNavigation() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Añadir clase scrolled cuando se hace scroll hacia abajo
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar la barra al hacer scroll hacia abajo
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia abajo - ocultar la barra
            header.classList.add('hide-nav');
        } else if (scrollTop < lastScrollTop) {
            // Scroll hacia arriba - mostrar la barra
            header.classList.remove('hide-nav');
        }
        
        // Mostrar la barra SOLO cuando estamos en la parte superior de la página
        if (scrollTop === 0) {
            header.classList.remove('hide-nav');
        }
        
        lastScrollTop = scrollTop;
    });

}
    
    // Inicializar el menú hamburguesa para dispositivos móviles
    initMobileMenu();


// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            // Toggle de la clase 'active' en el botón hamburguesa
            this.classList.toggle('active');
            
            // Toggle de la clase 'mobile-active' en el nav
            nav.classList.toggle('mobile-active');
            
            // Prevenir scroll cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });
        
        // Cerrar el menú al hacer clic en un enlace
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('mobile-active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}