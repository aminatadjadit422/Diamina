// ========================================
//  detail-produit.js — Page Détail Produit
//  D&A Couture – Projet Web L2
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Récupérer l'id depuis l'URL (?id=5)
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const produit = produits.find(p => p.id === id);

  const wrapper = document.getElementById('detailWrapper');

  if (!produit) {
    wrapper.innerHTML = `
      <div class="detail-error">
        <i class="fas fa-exclamation-circle"></i>
        <p>Produit introuvable.</p>
        <a href="produits.html" class="btn-primary">Retour au catalogue</a>
      </div>`;
    return;
  }

  // Quantité en panier pour ce produit
  function getQtePanier() {
    const panier = getPanier();
    const item = panier.find(i => i.id === produit.id);
    return item ? item.qte : 0;
  }

  // Mettre à jour l'affichage de la quantité et du total
  function refreshQteDisplay() {
    const qte = getQtePanier();
    const qteEl = document.getElementById('qteValue');
    const totalEl = document.getElementById('totalLigne');
    const btnMoins = document.getElementById('btnMoins');
    if (qteEl) qteEl.textContent = qte;
    if (totalEl) totalEl.textContent = qte > 0 ? formatPrix(produit.prix * qte) : '—';
    if (btnMoins) btnMoins.disabled = qte === 0;
  }

  const imgSrc = '../' + produit.image;
  const badge = produit.badge
    ? `<span class="detail-badge">${produit.badge}</span>`
    : '';

  // Génération des pastilles de couleur
  const couleurHex = produit.couleurHex || '#cccccc';
  const isLight = ['#FAFAFA','#FFFFF0','#FFFDD0','#F9D5E5','#E8E8F0'].includes(couleurHex);
  const couleurBlock = `
    <div class="meta-item">
      <span class="meta-label">Couleur</span>
      <span class="meta-value couleur-row">
        <span class="couleur-pastille" style="background:${couleurHex};${isLight ? 'border:1.5px solid #ccc;' : ''}"></span>
        <span class="detail-couleur-txt">${produit.couleur}</span>
      </span>
    </div>`;

  // Génération des boutons de taille
  const tailles = produit.tailles || [];
  const taillesBlock = tailles.length > 0 ? `
    <div class="detail-tailles-section">
      <p class="tailles-label"><i class="fas fa-ruler-horizontal"></i> Taille</p>
      <div class="tailles-grid">
        ${tailles.map((t, i) => `
          <button class="taille-btn${i === 0 ? ' selected' : ''}" onclick="selectTaille(this)">${t}</button>
        `).join('')}
      </div>
    </div>` : '';

  wrapper.innerHTML = `
    <div class="detail-card">

      <!-- Colonne image -->
      <div class="detail-img-col">
        <div class="detail-img-wrap">
          <img src="${imgSrc}" alt="${produit.nom}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
          <div class="img-fallback" style="display:none">
            <div class="bg-grad"></div>
            <span class="emoji-icon">👗</span>
          </div>
          ${badge}
          <button class="detail-wishlist" onclick="toggleWishlist(this)" title="Ajouter aux favoris">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>

      <!-- Colonne infos -->
      <div class="detail-info-col">

        <p class="detail-cat"><i class="fas fa-tag"></i> ${produit.categorie}</p>
        <h1 class="detail-nom">${produit.nom}</h1>
        <p class="detail-desc">${produit.description}</p>

        <div class="detail-meta">
          ${couleurBlock}
          <div class="meta-item">
            <span class="meta-label">Référence</span>
            <span class="meta-value">#DC-${String(produit.id).padStart(3,'0')}</span>
          </div>
        </div>

        ${taillesBlock}

        <div class="detail-prix-block">
          <span class="detail-prix">${formatPrix(produit.prix)}</span>
        </div>

        <!-- Contrôle quantité -->
        <div class="detail-qty-section">
          <p class="qty-label">Quantité dans le panier :</p>
          <div class="qty-controls-detail">
            <button class="qty-btn-detail" id="btnMoins" onclick="modifierQte(-1)" disabled>
              <i class="fas fa-minus"></i>
            </button>
            <span class="qty-value-detail" id="qteValue">0</span>
            <button class="qty-btn-detail" id="btnPlus" onclick="modifierQte(1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p class="qty-total">
            Total : <strong id="totalLigne">—</strong>
          </p>
        </div>

        <!-- Actions -->
        <div class="detail-actions">
          <button class="btn-primary btn-ajouter" onclick="ajouterAuPanierDetail()">
            <i class="fas fa-shopping-bag"></i> Ajouter au panier
          </button>
          <a href="commande.html" class="btn-outline btn-panier">
            <i class="fas fa-receipt"></i> Voir mon panier
          </a>
        </div>

      </div>
    </div>
  `;

  refreshQteDisplay();

  // Sélection de taille
  window.selectTaille = function(btn) {
    document.querySelectorAll('.taille-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  };

  // Modifier quantité depuis le détail
  window.modifierQte = function(delta) {
    const panier = getPanier();
    const idx = panier.findIndex(i => i.id === produit.id);
    if (delta > 0) {
      if (idx >= 0) panier[idx].qte += 1;
      else panier.push({ id: produit.id, qte: 1 });
    } else {
      if (idx >= 0) {
        panier[idx].qte = Math.max(0, panier[idx].qte - 1);
        if (panier[idx].qte === 0) panier.splice(idx, 1);
      }
    }
    savePanier(panier);
    updateCartCount();
    refreshQteDisplay();
  };

  // Ajouter via le bouton principal
  window.ajouterAuPanierDetail = function() {
    ajouterAuPanier(produit.id);
    refreshQteDisplay();
  };

  // Wishlist
  window.toggleWishlist = function(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
  };
});
