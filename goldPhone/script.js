// Gold Phone - script.js
// Fonctions globales partagées

function toggleMenu() {
    const menu = document.getElementById('dropdown');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// Fermer le dropdown si on clique ailleurs
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('dropdown');
    if (dropdown && !e.target.closest('.account-menu')) {
        dropdown.style.display = 'none';
    }
});

// Menu mobile (hamburger)
function toggleNav() {
    const nav = document.querySelector('.menu');
    const btn = document.querySelector('.hamburger-btn');
    if (!nav || !btn) return;
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Fermer le menu mobile si on clique sur un lien ou en dehors
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.menu');
    const btn = document.querySelector('.hamburger-btn');
    if (!nav || !btn) return;
    if (nav.classList.contains('open') && !e.target.closest('.menu') && !e.target.closest('.hamburger-btn')) {
        nav.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }
});

// ==============================
// GESTION DU PANIER (localStorage)
// ==============================
function getPanier() {
    try { return JSON.parse(localStorage.getItem('gp_panier')) || []; }
    catch(e) { return []; }
}
function savePanier(p) {
    localStorage.setItem('gp_panier', JSON.stringify(p));
}
function updateCartBadge() {
    const panier = getPanier();
    const total = panier.reduce((s, i) => s + (parseInt(i.qty) || 1), 0);
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}
function ajouterAuPanier(id, nom, prix, img) {
    let panier = getPanier();
    const idx = panier.findIndex(i => i.id === id);
    if (idx > -1) {
        panier[idx].qty = (panier[idx].qty || 1) + 1;
    } else {
        panier.push({ id, nom, prix, img, qty: 1 });
    }
    savePanier(panier);
    updateCartBadge();
    // Animation badge
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.classList.remove('bounce');
        void badge.offsetWidth;
        badge.classList.add('bounce');
    }
    showToast('✅ Ajouté au panier !');
}
function showToast(msg) {
    let toast = document.getElementById('gp-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'gp-toast';
        toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1c1b21;color:#e9cd72;padding:12px 26px;border-radius:30px;font-weight:700;font-size:14px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);opacity:0;transition:opacity 0.3s;border:1px solid rgba(201,162,39,.4);';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Initialiser le badge au chargement
document.addEventListener('DOMContentLoaded', updateCartBadge);
