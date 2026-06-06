// ========================================
//  commande.js — Page Panier / Commande
//  D&A Couture – Projet Web L2
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});

function renderCart() {
  const panier  = getPanier();
  const content = document.getElementById('cartContent');

  if (panier.length === 0) {
    content.innerHTML = `
      <div class="panier-vide">
        <i class="fas fa-shopping-bag"></i>
        <p>Votre panier est vide.</p>
        <a href="produits.html" class="btn-primary">Voir le catalogue</a>
      </div>`;
    return;
  }

  let sousTotal = 0;
  const items = panier.map(item => {
    const p = produits.find(x => x.id === item.id);
    if (!p) return '';
    const ligne = p.prix * item.qte;
    sousTotal += ligne;
    return `
      <div class="cart-item" id="ci-${p.id}">
        <span class="cart-item-emoji">${p.emoji}</span>
        <div class="cart-item-info">
          <h4>${p.nom}</h4>
          <p>${p.categorie}</p>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-num" id="qn-${p.id}">${item.qte}</span>
          <button class="qty-btn" onclick="changeQty(${p.id}, +1)"><i class="fas fa-plus"></i></button>
        </div>
        <span class="cart-item-price">${formatPrix(ligne)}</span>
        <button class="cart-item-remove" onclick="removeItem(${p.id})" title="Supprimer">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
  }).join('');

  const livraison = 1500;
  const total = sousTotal + livraison;

  content.innerHTML = `
    ${items}
    <div class="cart-summary">
      <div class="summary-row"><span>Sous-total</span><span>${formatPrix(sousTotal)}</span></div>
      <div class="summary-row"><span>Livraison</span><span>${formatPrix(livraison)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrix(total)}</span></div>
      <div class="summary-actions">
        <button class="btn-primary" onclick="passerCommande()">
          <i class="fas fa-check"></i> Passer la commande
        </button>
        <button class="btn-danger" onclick="viderPanier()">
          <i class="fas fa-trash"></i> Vider le panier
        </button>
      </div>
    </div>`;
}

function changeQty(id, delta) {
  const panier = getPanier();
  const idx = panier.findIndex(i => i.id === id);
  if (idx < 0) return;
  panier[idx].qte = Math.max(1, panier[idx].qte + delta);
  savePanier(panier);
  updateCartCount();
  renderCart();
}

function removeItem(id) {
  const panier = getPanier().filter(i => i.id !== id);
  savePanier(panier);
  updateCartCount();
  renderCart();
}

function viderPanier() {
  savePanier([]);
  updateCartCount();
  renderCart();
}

function passerCommande() {
  const session = JSON.parse(localStorage.getItem('da_session') || 'null');
  if (!session) {
    showToast('Veuillez vous connecter pour commander.');
    setTimeout(() => window.location.href = 'connexion.html', 2000);
    return;
  }
  savePanier([]);
  updateCartCount();
  document.getElementById('cartContent').innerHTML = `
    <div class="panier-vide">
      <i class="fas fa-heart" style="color:var(--rose-vif)"></i>
      <p style="font-family:var(--font-titre);font-size:1.4rem;color:var(--texte)">
        Merci pour votre commande, ${session.prenom} ! 🎉
      </p>
      <p>Vous serez contactée très bientôt.</p>
      <a href="produits.html" class="btn-outline" style="margin-top:1rem;display:inline-block">
        Continuer mes achats
      </a>
    </div>`;
}
