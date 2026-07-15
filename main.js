/* =========================================================
   ARGYAN · main.js · Optimizado · Junio 2026
   ========================================================= */

'use strict';

/* ==================== CONFIG ==================== */
const ARGYAN_CONFIG = {
    whatsappNumber: '5493515333794',
    storageKey: 'argyan_cart_v1',
    version: '2026.06'
};

/* ==================== UTILS ==================== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const isCatalog = () => Boolean($('#grid-intensiva'));

/* ==================== NAV SCROLL ==================== */
const nav = $('#nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
}

/* ==================== MOBILE MENU ==================== */
const menuBtn = $('#menuBtn');
const navLinks = $('.nav-links');
if (menuBtn && navLinks) {
    let open = false;
    menuBtn.addEventListener('click', () => {
        open = !open;
        if (open) {
            navLinks.style.cssText = 'display:flex !important;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#faf8f3;padding:24px;border-bottom:1px solid rgba(26,77,46,.12);gap:20px;align-items:flex-start;z-index:100';
            menuBtn.textContent = '✕';
            menuBtn.setAttribute('aria-label', 'Cerrar menú');
        } else {
            navLinks.removeAttribute('style');
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-label', 'Abrir menú');
        }
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (open) {
                navLinks.removeAttribute('style');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-label', 'Abrir menú');
                open = false;
            }
        });
    });
}

/* ==================== REVEAL ON SCROLL ==================== */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: .15 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* ==================== FORM → WHATSAPP (index.html) ==================== */
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        const data = {
            nombre: $('#nombre')?.value.trim() || '',
            empresa: $('#empresa')?.value.trim() || 'sin empresa',
            email: $('#email')?.value.trim() || '',
            telefono: $('#telefono')?.value.trim() || 'no especificado',
            linea: $('#linea')?.value || 'no especificada',
            mensaje: $('#mensaje')?.value.trim() || ''
        };
        const msg = `Hola! Soy ${data.nombre}, de ${data.empresa}.%0A%0A` +
                    `Email: ${data.email}%0A` +
                    `Tel: ${data.telefono}%0A` +
                    `Línea: ${data.linea}%0A%0A` +
                    (data.mensaje ? `Mensaje: ${encodeURIComponent(data.mensaje)}` : 'Quiero hacer una consulta desde la web de ARGYAN.');
        window.location.href = `https://wa.me/${ARGYAN_CONFIG.whatsappNumber}?text=${msg}`;
    });
}

/* ==================== CATÁLOGO ==================== */
const pilarNames = {
    intensiva: 'Línea Intensiva',
    almacenados: 'Granos Almacenados',
    embalaje: 'Soluciones de Embalaje',
    urbanas: 'Control de Plagas',
    seguridad: 'Seguridad e Higiene',
    faq: 'Preguntas Frecuentes'
};

const products = {
    intensiva: [
        { id: 'int-1', name: '2-4 Amina', desc: 'Herbicida sistémico selectivo para el control de malezas de hoja ancha en cultivos extensivos.', img: './assets/LINEAINTENSIVA1.webp' },
        { id: 'int-2', name: 'Cletodim 24', desc: 'Graminicida selectivo post-emergente para el control de gramíneas anuales y perennes.', img: './assets/LINEAINTENSIVA2.png' },
        { id: 'int-3', name: 'Glifosato', desc: 'Herbicida sistémico no selectivo de amplio espectro. Ideal para barbecho químico.', img: './assets/LINEAINTENSIVA3.webp' },
        { id: 'int-4', name: 'Dimetoato', desc: 'Insecticida organofosforado sistémico para control de insectos chupadores y masticadores.', img: './assets/LINEAINTENSIVA4.webp' },
        { id: 'int-5', name: 'Paraquat', desc: 'Herbicida de contacto no selectivo de acción rápida. Desecante pre-cosecha.', img: './assets/LINEAINTENSIVA5.webp' },
        { id: 'int-6', name: 'Dicamba', desc: 'Herbicida sistémico selectivo para control de malezas de hoja ancha en gramíneas.', img: './assets/LINEAINTENSIVA6.webp' },
        { id: 'int-7', name: 'Haloxy 54', desc: 'Herbicida selectivo post-emergente para control de malezas de hoja ancha en soja.', img: './assets/LINEAINTENSIVA7.webp' },
        { id: 'int-8', name: 'S-Metolaclor', desc: 'Herbicida selectivo pre-emergente para control de gramíneas y malezas de hoja ancha.', img: './assets/LINEAINTENSIVA8.webp' },
        { id: 'int-9', name: 'Abamectina 3,6', desc: 'Acaricida-insecticida biológico de amplio espectro para ácaros, trips y minadores.', img: './assets/LINEAINTENSIVA9.webp' },
        { id: 'int-10', name: 'Bifentrin 25', desc: 'Insecticida piretroide de amplio espectro y alta persistencia.', img: './assets/LINEAINTENSIVA10.webp' },
        { id: 'int-11', name: 'Cipermetrina', desc: 'Insecticida piretroide sintético de acción rápida contra lepidópteros y coleópteros.', img: './assets/LINEAINTENSIVA11.webp' },
        { id: 'int-12', name: 'Imidacloprid 35', desc: 'Insecticida sistémico neonicotinoide. Control de pulgones, mosca blanca y trips.', img: './assets/LINEAINTENSIVA12.webp' },
        { id: 'int-13', name: 'Lambda ME 25', desc: 'Insecticida piretroide microencapsulado de alta eficacia contra orugas y grillos.', img: './assets/LINEAINTENSIVA13.webp' },
        { id: 'int-14', name: 'Fipronil', desc: 'Insecticida fenilpirazol de amplio espectro. Control de hormigas y grillos del suelo.', img: './assets/LINEAINTENSIVA14.webp' },
        { id: 'int-15', name: 'Coadyuvantes Siliconados', desc: 'Agentes de mejora para aplicación de fitosanitarios. Reducen tensión superficial.', img: './assets/LINEAINTENSIVA15.webp' }
    ],
    almacenados: [
        { id: 'ga-1', name: 'Deltametrina 2,5% + Butóxido de Piperonilo', desc: 'Piretroide líquido insecticida gorgojicida. Garantiza el control total de insectos en granos y silos, depósitos, instalaciones, transportes, semillas, subproductos de la industria molinera y alimentos balanceados. De muy baja toxicidad para personas, animales y el medio ambiente. No es corrosivo. Capacidad de control y poder de desalojo. Dosis 12 a 22 cc/ton. Lea la etiqueta.', img: './assets/ALM1.webp' },
        { id: 'ga-2', name: 'Pirimifos Metil 50', desc: 'Fosforado de baja toxicidad para el hombre. Amplio espectro y persistencia. Acción fumigante y de contacto. Se emplea para el tratamiento de granos y semillas, almacenados en bolsas o granel, instalaciones y transporte. Protección hasta 1 año. Dosis 10 cc/ton de grano. Lea la etiqueta.', img: './assets/ALM2.webp' },
        { id: 'ga-3', name: 'Deltametrina 0,15% Polvo', desc: 'Piretroide en polvo insecticida gorgojicida alifático. Control en granos, silos y transportes. De idénticas cualidades que la presentación en forma líquida. Dosis 200 a 330 grs por ton de grano, estibas y galpones. Lea la etiqueta.', img: './assets/ALM3.webp' },
        { id: 'ga-4', name: 'Mercaptothion 100', desc: 'Organofosforado que actúa por contacto e ingestión. Se absorbe a través de los lípidos del caparazón de los insectos, con escasa persistencia en el medio ambiente. Amplio espectro de control y acción residual. Su estabilidad a la luz y persistencia permite controlar reinfestaciones. Dosis 10-20 cc/ton. Lea la etiqueta.', img: './assets/ALM4.webp' },
        { id: 'ga-5', name: 'Fosfuro de Aluminio 57%', desc: 'Fumigante para control de insectos en granos almacenados. Alta eficacia en silos y depósitos cerrados. Presentaciones: Tubitos de 30 pastillas (envases x 16 tubitos). Garrafa granel 500 pastillas. Blisters hidrófugos para contenedores marítimos. Genera gas fosfina. Protege granos, cereales, semillas, legumbres, y demás alimentos almacenados en silos, silo bolsa, estibas, de polillas, ácaros, gorgojos y roedores. Lea la etiqueta.', img: './assets/ALM5.png' },
        { id: 'ga-6', name: 'Desodorante-Bactericida', desc: 'Múltiple acción simultánea: desodoriza, desinfecta y desengrasa. Elimina cucarachas, gérmenes, hongos y bacterias que le transmiten mal olor al grano. No puede ser usado en grano que se destina al consumo humano. Dosis 1 litro/100 litros de agua/ 100 ton de grano. Lea la etiqueta.', img: './assets/ALM6.webp' }
    ],
    embalaje: [
        { id: 'bb-1', name: 'Boca Abierta - Fondo Ciego', desc: 'Big bag de boca abierta y fondo ciego para almacenamiento y transporte de productos a granel. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag1.webp' },
        { id: 'bb-2', name: 'Válvula Carga - Fondo Ciego', desc: 'Big bag con válvula de carga superior y fondo ciego. Permite llenado controlado y seguro. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag2.png' },
        { id: 'bb-3', name: 'Pollera Carga - Fondo Ciego', desc: 'Big bag con pollera de carga superior amplia para llenado rápido y seguro. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag3.png' },
        { id: 'bb-4', name: 'Boca Abierta - Válvula Descarga', desc: 'Big bag de boca abierta con válvula inferior de descarga. Facilita el vaciado controlado. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag4.webp' },
        { id: 'bb-5', name: 'Válvula Carga y Descarga', desc: 'Big bag con válvula superior de carga y válvula inferior de descarga. Sistema completo. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag5.webp' },
        { id: 'bb-6', name: 'Pollera Carga - Válvula Descarga', desc: 'Big bag con pollera de carga superior amplia y válvula de descarga inferior. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag6.png' },
        { id: 'bb-7', name: 'Bolsas Laminadas', desc: 'Big Bag fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel. Su recubrimiento interno mediante película de polipropileno evita la pérdida de partículas micronizadas, brindando mayor protección al contenido.', img: './assets/bigbag7.png' },
        { id: 'bb-8', name: 'Segunda Selección', desc: 'Big bags y embalajes de segunda selección en excelente estado. Opción económica. Fabricado en polipropileno de alta resistencia con tratamiento UV, diseñado para el almacenamiento y transporte seguro de productos a granel.', img: './assets/bigbag8.png' }
    ],
    urbanas: [
        { id: 'urb-1', name: 'Raticida en Bloques', desc: 'Cebo sólido en bloques para control de roedores. Formulación anticoagulante de alta eficacia.', img: './assets/urbanas1.webp' },
        { id: 'urb-2', name: 'Raticida en Pellets', desc: 'Gránulos atrayentes para control de roedores. Presentación dispersable en áreas de difícil acceso.', img: './assets/urbanas2.webp' },
        { id: 'urb-3', name: 'Trampa para moscas Fly Hunt', desc: 'Trampa ecológica y reutilizable que ayuda a reducir poblaciones de moscas.', img: './assets/urbanas3.webp' },
        { id: 'urb-5', name: 'Repelente para Mamíferos', desc: 'Formulación líquida para alejar mamíferos no deseados. Presentación concentrado emulsionable.', img: './assets/urbanas5.webp' }
    ],
    seguridad: [
        { id: 'seg-1', name: 'Guante Gamisol 1100-TAC', desc: 'G13 algodón moteado con micromotas. Código: 1.175.', img: './assets/seguridad1.webp' },
        { id: 'seg-2', name: 'Guante URK 1018 MILCOLOR', desc: 'Gris moteado. Bolsa por 300 pares. Código: 1.3.', img: './assets/seguridad2.webp' },
        { id: 'seg-3', name: 'Guante Gamisol 1100A G-7', desc: 'Moteado pesado. Código: 1.5.', img: './assets/seguridad3.webp' },
        { id: 'seg-4', name: 'Guante medio paseo SG GV05', desc: 'Código 1.168 al 1.24. Talle 8. Color amarillo.', img: './assets/seguridad4.webp' },
        { id: 'seg-4-1', name: 'Guante Nitrilo Verde', desc: 'MAPA AF-492. Largo 32 cm. Espesor 0,38 cm. Talles 7-11.', img: './assets/seguridad4_1.webp' },
        { id: 'seg-5', name: 'Anteojo STEELPRO NITRO', desc: 'Anteojo de seguridad con patilla regulable. Disponible claro y oscuro.', img: './assets/SEGURIDAD5.webp' },
        { id: 'seg-6', name: 'Anteojo LIBUS ARGON', desc: 'Anteojo de seguridad HC con patilla regulable.', img: './assets/seguridad6.webp' },
        { id: 'seg-7', name: 'Antiparra STEELPRO ZEX', desc: 'Antiparra antiempañante disponible claro y oscuro.', img: './assets/SEGURIDAD7.webp' },
        { id: 'seg-8', name: 'Máscara de Rostro Completo', desc: 'Máscara para fumigación y manejo de agroquímicos. Silicona, visor panorámico.', img: './assets/SEGURIDAD8.webp' },
        { id: 'seg-9', name: 'Filtro VO Tipo A1', desc: 'Filtro contra vapores orgánicos. Conexión bayoneta universal. Precio por par.', img: './assets/SEGURIDAD9.webp' },
        { id: 'seg-10', name: 'Mamelucos DUPONT', desc: 'Protección contra polvo, suciedad y partículas de materiales peligrosos.', img: './assets/SEGURIDAD10.webp' }
    ]
};

/* ==================== RENDER PRODUCTS ==================== */
function renderProducts() {
    if (!isCatalog()) return;
    Object.keys(products).forEach(pilar => {
        const grid = $(`#grid-${pilar}`);
        if (!grid) return;
        grid.innerHTML = products[pilar].map(p => `
            <div class="producto-card" onclick="openModal('${pilar}', '${p.id}')">
                <div class="producto-head">
                    <span class="producto-tag">${pilarNames[pilar]}</span>
                    <span class="producto-arrow">↗</span>
                </div>
                <div class="producto-img-wrap">
                    <div class="skeleton"></div>
                    <img src="${p.img}" alt="${p.name}" class="producto-img" loading="lazy" width="200" height="180" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded');this.style.display='none'">
                </div>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <button class="producto-btn" onclick="event.stopPropagation();addToCart('${pilar}', '${p.id}')">
                    Añadir →
                </button>
            </div>
        `).join('');
    });
}

/* ==================== TABS ==================== */
function filterPilar(pilar) {
    $$('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.pilar === pilar);
    });
    $$('.productos-section').forEach(s => {
        s.classList.toggle('active', s.id === `catalogo-${pilar}`);
    });
    // Update URL hash without jumping
    if (pilar !== 'faq') {
        history.replaceState(null, null, `#catalogo-${pilar}`);
    } else {
        history.replaceState(null, null, '#faq');
    }
}

$$('.tab').forEach(tab => {
    tab.addEventListener('click', () => filterPilar(tab.dataset.pilar));
});

/* ==================== AUTO-ACTIVATE FROM HASH ==================== */
(function() {
    const hash = window.location.hash.replace('#', '');
    const validPilars = ['intensiva', 'almacenados', 'embalaje', 'urbanas', 'seguridad', 'faq'];

    // Map catalogo-xxx to xxx
    let targetPilar = null;
    if (hash.startsWith('catalogo-')) {
        targetPilar = hash.replace('catalogo-', '');
    } else if (validPilars.includes(hash)) {
        targetPilar = hash;
    }

    if (targetPilar && validPilars.includes(targetPilar)) {
        const activate = () => {
            if (typeof filterPilar === 'function') {
                filterPilar(targetPilar);
                const tabsSection = $('.tabs');
                if (tabsSection) {
                    tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => setTimeout(activate, 100));
        } else {
            setTimeout(activate, 100);
        }
    }
})();

/* ==================== MODAL ==================== */
let currentProduct = null;

function openModal(pilar, id) {
    const product = products[pilar]?.find(p => p.id === id);
    if (!product) return;
    currentProduct = { ...product, pilar };

    const modalImg = $('#modalImg');
    const modalPilar = $('#modalPilar');
    const modalTitle = $('#modalTitle');
    const modalDesc = $('#modalDesc');
    const modal = $('#productModal');

    if (!modalImg || !modal) return;

    modalImg.src = product.img || '';
    modalImg.alt = product.name;
    modalImg.classList.remove('loaded');
    if (modalPilar) modalPilar.textContent = pilarNames[pilar];
    if (modalTitle) modalTitle.textContent = product.name;
    if (modalDesc) modalDesc.textContent = product.desc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = $('#productModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

function addFromModal() {
    if (!currentProduct) return;
    addToCart(currentProduct.pilar, currentProduct.id);
    closeModal();
}

// Click outside modal to close
$('#productModal')?.addEventListener('click', e => {
    if (e.target === $('#productModal')) closeModal();
});

/* ==================== CART ==================== */
let cart = [];

try {
    const saved = localStorage.getItem(ARGYAN_CONFIG.storageKey);
    if (saved) cart = JSON.parse(saved);
} catch (e) { console.warn('No se pudo cargar carrito', e); }

function addToCart(pilar, id) {
    const product = products[pilar]?.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, pilar, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`${product.name} añadido a la consulta`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    updateCartUI();
}

function saveCart() {
    try {
        localStorage.setItem(ARGYAN_CONFIG.storageKey, JSON.stringify(cart));
    } catch (e) { console.warn('No se pudo guardar carrito', e); }
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = $('#cartCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }

    const container = $('#cartItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty">La consulta está vacía</div>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" style="animation:fadeIn .3s ease">
            <div class="cart-item-img">
                <img src="${item.img}" alt="${item.name}" onerror="this.style.display='none'" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${pilarNames[item.pilar]}</span>
                <div class="cart-item-qty">
                    <button onclick="updateQty('${item.id}', -1)" aria-label="Disminuir cantidad">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty('${item.id}', 1)" aria-label="Aumentar cantidad">+</button>
                </div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart('${item.id}')">Eliminar</div>
        </div>
    `).join('');
}

function toggleCart() {
    const sidebar = $('#cartSidebar');
    const overlay = $('#cartOverlay');
    if (!sidebar) return;

    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    overlay?.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

function finalizeCart() {
    if (cart.length === 0) return;

    const items = cart.map((item, i) => 
        `${i + 1}. *${item.name}* — ${pilarNames[item.pilar]} — Cant: ${item.qty}`
    ).join('%0A');

    const msg = `Hola, quiero hacer una consulta desde el catálogo de ARGYAN.%0A%0A*Productos:*%0A${items}%0A%0AQuedo atento/a.`;
    window.location.href = `https://wa.me/${ARGYAN_CONFIG.whatsappNumber}?text=${msg}`;
}

/* ==================== TOAST ==================== */
function showToast(msg) {
    const existing = $('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = 'position:fixed;bottom:100px;right:24px;background:var(--verde-800);color:#fff;padding:14px 24px;border-radius:4px;box-shadow:0 10px 30px rgba(0,0,0,.3);z-index:10001;font-size:14px;font-weight:500;transform:translateY(20px);opacity:0;transition:all .3s ease;font-family:Inter,sans-serif;';
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2200);
}

/* ==================== KEYBOARD ==================== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = $('#productModal');
        const cart = $('#cartSidebar');
        if (modal?.classList.contains('active')) closeModal();
        if (cart?.classList.contains('open')) toggleCart();
    }
});

/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

/* ==================== GLOBALS ==================== */
window.filterPilar = filterPilar;
window.openModal = openModal;
window.closeModal = closeModal;
window.addFromModal = addFromModal;
window.addToCart = addToCart;
window.toggleCart = toggleCart;
window.finalizeCart = finalizeCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;