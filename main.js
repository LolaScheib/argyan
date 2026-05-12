// ==================== PREVENCIÓN NUEVA PESTAÑA ====================
// Fuerza que todos los enlaces internos abran en la misma pestaña
(function() {
    document.addEventListener('click', function(e) {
        var el = e.target.closest('a');
        if (!el) return;

        var href = el.getAttribute('href');
        if (!href) return;

        var isExternal = href.match(/^https?:\/\//) && !href.includes(window.location.hostname);
        var isMailto = href.startsWith('mailto:');
        var isTel = href.startsWith('tel:');
        var isHash = href.startsWith('#');

        if (!isExternal && !isMailto && !isTel && !isHash) {
            el.removeAttribute('target');
            el.setAttribute('target', '_self');
        }
    }, true);
})();

/**
 * ARGYAN - Sistema JavaScript Optimizado
 * Módulos: Navegación, Acordeón, Formulario, Animaciones, Catálogo, Carrito, Mapa
 * @version 2.0
 */

'use strict';

// ==================== UTILIDADES ====================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
};

// ==================== NAVEGACIÓN ====================
const Navigation = {
    init() {
        this.navbar = $('#navbar');
        this.mobileMenu = $('#mobile-menu');
        this.mobileOverlay = $('#mobile-overlay');
        this.menuBtn = $('#mobile-menu-btn');

        if (!this.navbar) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = $(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    },

    handleScroll() {
        const scrolled = window.scrollY > 30;
        this.navbar.classList.toggle('shadow-sm', scrolled);
        this.navbar.style.padding = scrolled ? '0.75rem 0' : '1.25rem 0';
    }
};

// ==================== MENÚ MÓVIL ====================
function toggleMobileMenu() {
    const menu = $('#mobile-menu');
    const overlay = $('#mobile-overlay');
    const btn = $('#mobile-menu-btn');

    if (!menu || !overlay) return;

    const isOpen = menu.classList.toggle('active');
    overlay.classList.toggle('hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (btn) {
        btn.setAttribute('aria-expanded', isOpen.toString());
    }
}

// ==================== ACORDEÓN ====================
function toggleAccordion(header) {
    const body = header.nextElementSibling;
    const isOpen = body.classList.contains('open');
    const allBodies = $$('.accordion-body');
    const allHeaders = $$('.accordion-header');

    allBodies.forEach(b => {
        b.style.maxHeight = null;
        b.classList.remove('open');
    });
    allHeaders.forEach(h => {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen && body) {
        body.classList.add('open');
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
    }
}

// ==================== FORMULARIO ====================
const FormHandler = {
    WHATSAPP_NUMBER: '5493515333794',

    init() {
        const form = $('#contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = {
            nombre: $('#nombre')?.value.trim() || '',
            empresa: $('#empresa')?.value.trim() || '',
            email: $('#email')?.value.trim() || '',
            telefono: $('#telefono')?.value.trim() || '',
            linea: $('#linea')?.selectedOptions[0]?.text || '',
            mensaje: $('#mensaje')?.value.trim() || ''
        };

        const successMsg = $('#formSuccess');
        if (successMsg) {
            successMsg.classList.remove('hidden');
        }

        const texto = this.buildWhatsAppMessage(data);
        const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
            if (successMsg) successMsg.classList.add('hidden');
            form.reset();
        }, 400);
    },

    buildWhatsAppMessage(data) {
        return `Hola, quiero hacer una consulta desde la web de ARGYAN.\n\n` +
               `Nombre y Apellido: ${data.nombre}\n` +
               `Empresa / Institución: ${data.empresa || '-'}\n` +
               `Correo Electrónico: ${data.email}\n` +
               `Teléfono: ${data.telefono || '-'}\n` +
               `Línea de Interés: ${data.linea}\n` +
               `Mensaje: ${data.mensaje || '-'}`;
    }
};

// ==================== ANIMACIONES GSAP ====================
const Animations = {
    init() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP no disponible, animaciones desactivadas');
            this.fallbackReveal();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        this.initRevealAnimations();
        this.initHeroAnimations();
        this.initCounterAnimation();
    },

    initRevealAnimations() {
        $$('.reveal-up').forEach((element, i) => {
            gsap.fromTo(element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: (i % 3) * 0.1
                }
            );
        });
    },

    initHeroAnimations() {
        const hero = $('.hero-bg');
        if (!hero) return;

        const h1 = hero.querySelector('h1');
        const p = hero.querySelector('p');
        const cta = hero.querySelector('.flex');

        if (h1) gsap.fromTo(h1, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
        if (p) gsap.fromTo(p, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
        if (cta) gsap.fromTo(cta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
    },

    initCounterAnimation() {
        const counterEl = $('#counter-years');
        if (!counterEl) return;

        gsap.to(counterEl, {
            innerHTML: 15,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counterEl,
                start: 'top 85%'
            },
            onUpdate() {
                counterEl.innerHTML = Math.round(this.targets()[0].innerHTML) + '+';
            }
        });
    },

    fallbackReveal() {
        $$('.reveal-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
};

// ==================== CATÁLOGO - DATOS ====================
const ProductCatalog = {
    pilarNames: {
        intensiva: 'Línea Intensiva',
        almacenados: 'Granos Almacenados',
        embalaje: 'Soluciones de Embalaje',
        urbanas: 'Control de Plagas Urbanas',
        seguridad: 'Seguridad e Higiene'
    },

    products: {
        intensiva: [
            { id: 'int-1', name: '2-4 Amina', desc: 'Herbicida sistémico selectivo para el control de malezas de hoja ancha en cultivos extensivos. Eficaz en trigo, maíz y soja.', img: '../assets/LINEAINTENSIVA1.png' },
            { id: 'int-2', name: 'Cletodim 24', desc: 'Graminicida selectivo post-emergente para el control de gramíneas anuales y perennes en cultivos de hoja ancha.', img: '../assets/LINEAINTENSIVA2.png' },
            { id: 'int-3', name: 'Glifosato', desc: 'Herbicida sistémico no selectivo de amplio espectro. Elimina malezas de hoja ancha y gramíneas. Ideal para barbecho químico.', img: '../assets/LINEAINTENSIVA3.png' },
            { id: 'int-4', name: 'Dimetoato', desc: 'Insecticida organofosforado sistémico para control de insectos chupadores y masticadores en cultivos intensivos.', img: '../assets/LINEAINTENSIVA4.png' },
            { id: 'int-5', name: 'Paraquat', desc: 'Herbicida de contacto no selectivo de acción rápida. Desecante pre-cosecha y control de malezas emergidas.', img: '../assets/LINEAINTENSIVA5.png' },
            { id: 'int-6', name: 'Dicamba', desc: 'Herbicida sistémico selectivo para control de malezas de hoja ancha en cultivos de gramíneas. Compatible con glifosato.', img: '../assets/LINEAINTENSIVA6.png' },
            { id: 'int-7', name: 'Haloxy 54', desc: 'Herbicida selectivo post-emergente para control de malezas de hoja ancha en soja y otros cultivos leguminosos.', img: '../assets/LINEAINTENSIVA7.png' },
            { id: 'int-8', name: 'S-Metolaclor', desc: 'Herbicida selectivo pre-emergente para control de gramíneas y algunas malezas de hoja ancha en maíz y soja.', img: '../assets/LINEAINTENSIVA8.png' },
            { id: 'int-9', name: 'Abamectina 3,6', desc: 'Acaricida-insecticida biológico de amplio espectro. Control de ácaros, trips y minadores en cultivos frutales y hortícolas.', img: '../assets/LINEAINTENSIVA9.png' },
            { id: 'int-10', name: 'Bifentrin 25', desc: 'Insecticida piretroide de amplio espectro y alta persistencia. Control de insectos masticadores y chupadores en múltiples cultivos.', img: '../assets/LINEAINTENSIVA10.png' },
            { id: 'int-11', name: 'Cipermetrina', desc: 'Insecticida piretroide sintético de acción rápida. Eficaz contra lepidópteros, coleópteros y hemípteros en cultivos extensivos.', img: '../assets/LINEAINTENSIVA11.png' },
            { id: 'int-12', name: 'Imidacloprid 35', desc: 'Insecticida sistémico neonicotinoide. Control de pulgones, mosca blanca y trips con persistencia prolongada.', img: '../assets/LINEAINTENSIVA12.png' },
            { id: 'int-13', name: 'Lambda ME 25', desc: 'Insecticida piretroide microencapsulado de alta eficacia. Control de orugas, grillos y otros insectos masticadores.', img: '../assets/LINEAINTENSIVA13.png' },
            { id: 'int-14', name: 'Fipronil', desc: 'Insecticida fenilpirazol de amplio espectro. Control de hormigas, grillos y otros insectos del suelo. Presentaciones 50cc y 1000cc.', img: '../assets/LINEAINTENSIVA14.png' },
            { id: 'int-15', name: 'Coadyuvantes Siliconados', desc: 'Agentes de mejora para aplicación de fitosanitarios. Reducen tensión superficial y mejoran penetración. Presentaciones 250cc y 1000cc.', img: '../assets/LINEAINTENSIVA15.png' }
        ],
        almacenados: [
            { id: 'ga-1', name: 'Deltametrina 2,5% + Butóxido', desc: 'Piretroide líquido insecticida gorgojicida. Control total de insectos en granos, silos, depósitos e instalaciones. Dosis 12 a 20 cc/ton.', img: '../assets/ALM1.png' },
            { id: 'ga-2', name: 'Pirimifos Metil', desc: 'Organofosforado de baja toxicidad. Amplio espectro y persistencia. Acción fumigante y contacto. Para tratamiento de granos y semillas. Dosis 10cc/ton.', img: '../assets/ALM2.png' },
            { id: 'ga-3', name: 'Deltametrina 0,15% Polvo', desc: 'Piretroide en polvo insecticida gorgojicida alifático. Control en granos, silos, transportes, semillas e instalaciones. Dosis: 200 a 330gr/ton.', img: '../assets/ALM3.png' },
            { id: 'ga-4', name: 'Mercaptothion 10%', desc: 'Organofosforado que actúa por contacto e ingestión. Se absorbe a través de los lípidos del caparazón de los insectos. Dosis 10-20cc/ton.', img: '../assets/ALM4.png' },
            { id: 'ga-6', name: 'Desodorante-Bactericida', desc: 'Múltiple acción: desodoriza, desinfecta y desengrasa. Elimina cucarachas, gérmenes, hongos y bacterias. Dosis 1 litro/100 litros de agua/100 ton.', img: '../assets/ALM6.png' },
         ],
        embalaje: [
            { id: 'bb-1', name: 'Boca Abierta - Fondo Ciego', desc: 'Big bag de boca abierta y fondo ciego para almacenamiento y transporte de productos a granel. Ideal para granos, fertilizantes y semillas.', img: '../assets/bigbag1.png' },
            { id: 'bb-2', name: 'Válvula Carga - Fondo Ciego', desc: 'Big bag con válvula de carga superior y fondo ciego. Permite llenado controlado y seguro. Perfecto para operaciones automatizadas.', img: '../assets/bigbag2.png' },
            { id: 'bb-3', name: 'Pollera Carga - Fondo Ciego', desc: 'Big bag con pollera de carga superior amplia para llenado rápido y seguro. Fondo ciego para máxima contención.', img: '../assets/bigbag3.png' },
            { id: 'bb-4', name: 'Boca Abierta - Válvula Descarga', desc: 'Big bag de boca abierta con válvula inferior de descarga. Facilita el vaciado controlado del contenido.', img: '../assets/bigbag4.png' },
            { id: 'bb-5', name: 'Válvula Carga y Descarga', desc: 'Big bag con válvula superior de carga y válvula inferior de descarga. Sistema completo para carga y descarga controlada.', img: '../assets/bigbag5.png' },
            { id: 'bb-6', name: 'Pollera Carga - Válvula Descarga', desc: 'Big bag con pollera de carga superior amplia y válvula de descarga inferior. Máxima versatilidad para carga rápida y descarga controlada.', img: '../assets/bigbag6.png' },
        ],
urbanas: [
            { id: 'urb-1', name: 'Raticida en Bloques', desc: 'Cebo sólido en bloques para control de roedores. Formulación anticoagulante de alta eficacia. Uso exterior e interior.', img: '../assets/urbanas1.png' },
            { id: 'urb-2', name: 'Raticida en Pellets', desc: 'Gránulos atrayentes para control de roedores. Presentación dispersable en áreas de difícil acceso. Efecto prolongado.', img: '../assets/urbanas2.png' },
            { id: 'urb-3', name: 'Trampa Adhesiva', desc: 'Lámina con adhesivo de alta resistencia y atrayente feromónico para captura de insectos voladores y rastreros. Uso interior y exterior.', img: '../assets/urbanas3.png' },
            { id: 'urb-4', name: 'Atrayente para Moscas', desc: 'Cebo líquido concentrado para captura de moscas en trampas. Acción prolongada con atrayente alimenticio.', img: '../assets/urbanas4.png' },
            { id: 'urb-5', name: 'Repelente para Mamíferos', desc: 'Formulación granulada o líquida para alejar mamíferos no deseados. Aplicación en jardines, campos y perímetros.', img: '../assets/urbanas5.png' },
        ],
                seguridad: [
    { id: 'seg-1', name: 'Guante Gamisol 1100-TAC', desc: 'G13 algodón moteado con micromotas. Código: 1.175', img: '' },
    { id: 'seg-2', name: 'Guante URK 1018 MILCOLOR', desc: 'Gris moteado. Bolsa por 300 pares. Código: 1.3', img: '' },
    { id: 'seg-3', name: 'Guante Gamisol 1100A G-7', desc: 'Moteado pesado. Código: 1.5', img: '' },
    { id: 'seg-4', name: 'Guante Americano Puño Corto', desc: 'Combinado con jeans en dorso. Talle 10. Código: 1.17', img: '' },
    { id: 'seg-5', name: 'Guante Descarne SG GD05', desc: 'Puño corto T10 sello S. Código: 1.15', img: '' },
    { id: 'seg-6', name: 'Guante Medio Paseo DP 221023', desc: 'RIB amarillo sello S. Talle 8. Código: 1.18', img: '' },
    { id: 'seg-7', name: 'Guante Soldador STEELPRO', desc: 'C/hilo kevlar, c/refuerzo en palma. Código: 1.27', img: '' },
    { id: 'seg-8', name: 'Guante Soldado Gamisol 9119', desc: 'Terry aramida vaqueta ambidiestro. Código: 1.28', img: '' },
    { id: 'seg-9', name: 'Guante PVC/Nitrilo Azul GUPLASTEX 601-T', desc: 'Puño tejido dorso ventilado. Código: 1.190', img: '' },
    { id: 'seg-10', name: 'Guante PVC Rojo GUPLASTEX 102-L', desc: 'Liviano puño tejido baño completo. Largo: 25 cm. Código: 1.40', img: '' },
    { id: 'seg-11', name: 'Guante PVC Azul DPS 31755', desc: 'Baño completo. Talle 10, largo: 70 cm. Código: 1.199', img: '' },
    { id: 'seg-12', name: 'Guante Látex MAPA VITAL 124', desc: 'Talles 6-9. Color amarillo. Código: 1.43 al 1.46', img: '' },
    { id: 'seg-13', name: 'Guante Nitrilo Verde MAPA AF-492', desc: 'Largo: 32 cm, espesor: 0,38 cm. Talles 7-11. Código: 1.51 al 1.55', img: '' },
    { id: 'seg-14', name: 'Guante Poliuretano MAPA ULTRANE 548', desc: 'Talles 8-10. Color negro. Código: 1.69 al 1.71', img: '' },
    { id: 'seg-15', name: 'Guante Anticorte MAPA KRYNIT 582', desc: 'Grado 5, baño nitrilo dorso completo. Talles 9 y 10. Código: 1.194/195', img: '' },
    { id: 'seg-16', name: 'Guante PU1011 PROINMAX G13', desc: 'Negro recubierto en PU. Talles 7-10. Caja x 240 pares. Código: 1.156/157/158', img: '' },
    { id: 'seg-17', name: 'Guante L2011 PROINMAX G13', desc: 'Rojo recubierto en látex negro. Talles 8-10. Caja x 240 pares. Código: 1.223/224', img: '' },
    { id: 'seg-18', name: 'Guante CN5641 PROINMAX G18', desc: 'Doble baño de nitrilo arenoso. Anticorte Nivel 5, Clase D. Caja x 120 pares. Código: 1.202/03/04', img: '' },
    { id: 'seg-19', name: 'Guante Látex Exam. Descartable x 100', desc: 'Talles XS, S, M, L y XL. Código: 1.113 al 1.117', img: '' },
    { id: 'seg-20', name: 'Guante Nitrilo PRINTEX Descartable x 100', desc: 'Talles S, M, L y XL. Color negro. Código: 1.122 al 1.125', img: '' },
    { id: 'seg-21', name: 'Guante Kevlar Gamisol 119N3', desc: 'Terry aramida forro lana, puño descarne. Código: 1.128', img: '' },
    { id: 'seg-22', name: 'Guante Kevlar Gamisol 119FUNDEX', desc: 'Terry aramida doble aislación p/descarne. Código: 1.207', img: '' },
    { id: 'seg-23', name: 'Guante Dieléctrico GLOVEX Clase 00', desc: 'Para 2.500 volt IRAM. Código: 1.165', img: '' },
    { id: 'seg-24', name: 'Guante Dieléctrico KRAFTEX Clase 0', desc: 'Para 5.000 volt IRAM. Código: 1.242', img: '' },
    { id: 'seg-25', name: 'Guante Anticorte Gamisol 290 CUT-KEEPER', desc: 'Talles 7-10, largo: 24 cm. Código: 1.140 al 1.143', img: '' },
    { id: 'seg-26', name: 'Guante Malla de Acero VICSA', desc: 'Talles S, M, L y XL. Por mano ambidiestro. Código: 1.145', img: '' },
    { id: 'seg-27', name: 'Anteojo PROINMAX FT2601', desc: 'Patilla regulable transparente. Código: 5.69', img: '' },
    { id: 'seg-28', name: 'Anteojo LIBUS ARGON 900499 HC', desc: 'Patilla regulable (claro/oscuro). Código: 5.3', img: '' },
    { id: 'seg-29', name: 'Anteojo STEELPRO NITRO', desc: 'Patilla regulable (oscuro/claro). Código: 5.11', img: '' },
    { id: 'seg-30', name: 'Casco FRAVIDA MAPUCHE 3610', desc: 'Arnés a punto. Colores: Amarillo, blanco, gris, azul, verde, rojo, naranja. Código: 6.1 al 6.7', img: '' },
],
    },

    init() {
        this.renderAll();
    },

    renderAll() {
        Object.keys(this.products).forEach(pilar => {
            const grid = $(`#grid-${pilar}`);
            if (!grid) return;

            const products = this.products[pilar];
            if (products.length === 0) return;

            grid.innerHTML = products.map(product => this.createProductCard(product, pilar)).join('');
        });
    },

    createProductCard(product, pilar) {
        const hasImage = product.img ? 
            `<img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy" width="300" height="240">` :
            `<div class="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center text-stone-400 gap-2">
                <svg class="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="text-xs font-medium uppercase tracking-wider">Imagen próximamente</span>
            </div>`;

        return `
            <article class="product-card group">
                <div class="img-container aspect-[4/3] cursor-pointer bg-stone-100 relative overflow-hidden" onclick="openModal('${pilar}', '${product.id}')" role="button" tabindex="0" aria-label="Ver detalle de ${product.name}">
                    ${hasImage}
                    <div class="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span class="bg-white/90 text-forest text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            Ver Detalle
                        </span>
                    </div>
                </div>
                <div class="p-4 lg:p-5">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span class="text-gold text-[10px] font-bold tracking-[0.15em] uppercase">${this.pilarNames[pilar]}</span>
                    </div>
                    <h3 class="text-base lg:text-lg font-bold text-forest font-serif mb-2 leading-tight line-clamp-2">${product.name}</h3>
                    <p class="text-stone-500 text-xs lg:text-sm leading-relaxed mb-4 line-clamp-3">${product.desc}</p>
                    <div class="flex items-center gap-2">
                        <button onclick="addToCart('${pilar}', '${product.id}')" class="flex-1 py-2.5 btn-gold font-semibold tracking-wider uppercase text-xs rounded-sm" aria-label="Añadir ${product.name} al carrito">
                            Añadir
                        </button>
                        <button onclick="openModal('${pilar}', '${product.id}')" class="w-10 h-10 flex items-center justify-center border border-stone-300 rounded-sm text-stone-500 hover:text-forest hover:border-forest transition-all" aria-label="Ver detalle de ${product.name}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
};

// ==================== CATÁLOGO - FILTROS ====================
function filterPilar(pilar) {
    $$('.pilar-tab').forEach(tab => {
        const isActive = tab.dataset.pilar === pilar;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive.toString());
    });

    $$('.pilar-section').forEach(section => {
        section.classList.add('hidden');
        section.hidden = true;
    });

    const activeSection = $(`#section-${pilar}`);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.hidden = false;
    }
}

// ==================== MODAL ====================
let currentModalProduct = null;
let modalQty = 1;

function openModal(pilar, productId) {
    const product = ProductCatalog.products[pilar]?.find(p => p.id === productId);
    if (!product) return;

    currentModalProduct = { ...product, pilar };
    modalQty = 1;

    const modalImg = $('#modalImg');
    const modalTitle = $('#modalTitle');
    const modalDesc = $('#modalDesc');
    const modalPilar = $('#modalPilar');
    const modalQtyEl = $('#modalQty');

    if (modalImg) {
        modalImg.src = product.img || '';
        modalImg.alt = product.name;
    }
    if (modalTitle) modalTitle.textContent = product.name;
    if (modalDesc) modalDesc.textContent = product.desc;
    if (modalPilar) modalPilar.textContent = ProductCatalog.pilarNames[pilar];
    if (modalQtyEl) modalQtyEl.textContent = modalQty;

    const modal = $('#productModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = $('#productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentModalProduct = null;
}

function adjustModalQty(delta) {
    modalQty = Math.max(1, modalQty + delta);
    const qtyEl = $('#modalQty');
    if (qtyEl) qtyEl.textContent = modalQty;
}

function addFromModal() {
    if (!currentModalProduct) return;
    addToCart(currentModalProduct.pilar, currentModalProduct.id, modalQty);
    closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        const sidebar = $('#cartSidebar');
        if (sidebar?.classList.contains('active')) toggleCart();
    }
});

$('#productModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

// ==================== CARRITO ====================
const Cart = {
    items: [],

    add(pilar, productId, qty = 1) {
        const product = ProductCatalog.products[pilar]?.find(p => p.id === productId);
        if (!product) return;

        const existing = this.items.find(item => item.id === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            this.items.push({ ...product, pilar, qty });
        }

        this.updateUI();
        this.showNotification(`${product.name} añadido al carrito`);
    },

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateUI();
    },

    updateQty(productId, delta) {
        const item = this.items.find(i => i.id === productId);
        if (!item) return;

        item.qty = Math.max(1, item.qty + delta);
        this.updateUI();
    },

    updateUI() {
        const badge = $('#cartBadge');
        const itemsContainer = $('#cartItems');
        const checkoutBtn = $('#checkoutBtn');

        const totalQty = this.items.reduce((sum, item) => sum + item.qty, 0);

        if (badge) {
            badge.textContent = totalQty;
            badge.classList.toggle('hidden', totalQty === 0);
        }

        if (itemsContainer) {
            if (this.items.length === 0) {
                itemsContainer.innerHTML = '<p class="text-stone-500 text-center py-8">El carrito está vacío</p>';
            } else {
                itemsContainer.innerHTML = this.items.map(item => `
                    <div class="flex gap-4 mb-4 pb-4 border-b border-stone-100">
                        <div class="flex-1">
                            <h4 class="font-semibold text-forest text-sm">${item.name}</h4>
                            <p class="text-stone-500 text-xs">${ProductCatalog.pilarNames[item.pilar]}</p>
                            <div class="flex items-center gap-2 mt-2">
                                <button onclick="Cart.updateQty('${item.id}', -1)" class="quantity-btn text-xs" aria-label="Disminuir">-</button>
                                <span class="w-6 text-center text-sm">${item.qty}</span>
                                <button onclick="Cart.updateQty('${item.id}', 1)" class="quantity-btn text-xs" aria-label="Aumentar">+</button>
                                <button onclick="Cart.remove('${item.id}')" class="ml-auto text-stone-400 hover:text-red-500 transition-colors" aria-label="Eliminar">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (checkoutBtn) {
            checkoutBtn.disabled = this.items.length === 0;
        }
    },

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-forest text-white px-6 py-3 rounded-sm shadow-lg z-[10001] transform translate-y-20 opacity-0 transition-all duration-300';
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    finalize() {
        if (this.items.length === 0) return;

        const numeroWhatsApp = '5493515333794';
        const productosTexto = this.items.map((item, i) => 
            `${i + 1}. ${item.name} (${ProductCatalog.pilarNames[item.pilar]}) — Cantidad: ${item.qty}`
        ).join('\n');

        const texto = `Hola, quiero finalizar una compra desde el catálogo de ARGYAN.\n\n*Productos solicitados:*\n${productosTexto}`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

        window.open(url, '_blank', 'noopener,noreferrer');
    }
};

// Exponer funciones globales necesarias
window.toggleMobileMenu = toggleMobileMenu;
window.toggleAccordion = toggleAccordion;
window.filterPilar = filterPilar;
window.openModal = openModal;
window.closeModal = closeModal;
window.adjustModalQty = adjustModalQty;
window.addFromModal = addFromModal;
window.addToCart = (pilar, productId, qty = 1) => Cart.add(pilar, productId, qty);
window.toggleCart = () => {
    const sidebar = $('#cartSidebar');
    const overlay = $('#cartOverlay');
    if (!sidebar || !overlay) return;

    const isOpen = sidebar.classList.toggle('active');
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
};
window.finalizePurchase = () => Cart.finalize();
window.Cart = Cart;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    FormHandler.init();
    Animations.init();
    ProductCatalog.init();
    Cart.updateUI();
}); 