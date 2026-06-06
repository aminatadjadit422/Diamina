// ========================================
//  produits.js — Page Catalogue
//  D&A Couture – Projet Web L2
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const grid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Lire filtre venant de la navigation
  let activeCat = localStorage.getItem('da_filter_cat') || 'Tous';
  let activeSousCat = 'Tous';
  localStorage.removeItem('da_filter_cat');

  function render(cat, sousCat) {
    activeCat = cat;
    activeSousCat = sousCat || 'Tous';

    let list;
    if (cat === 'Tous') {
      list = produits;
    } else {
      list = produits.filter(p => p.categorie === cat);
      if (cat === 'Accessoires' && activeSousCat !== 'Tous') {
        list = list.filter(p => p.sousCategorie === activeSousCat);
      }
    }

    grid.innerHTML = list.length
      ? list.map(buildProductCard).join('')
      : '<p style="grid-column:1/-1;text-align:center;color:var(--texte-doux)">Aucun produit dans cette catégorie.</p>';

    filterBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat && !b.dataset.souscat);
    });

    // Afficher/masquer les sous-filtres accessoires
    const sousBar = document.getElementById('accessoires-sous-bar');
    if (sousBar) {
      sousBar.style.display = (cat === 'Accessoires') ? 'flex' : 'none';
      sousBar.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.souscat === activeSousCat);
      });
    }
  }

  filterBtns.forEach(btn => {
    if (!btn.dataset.souscat) {
      btn.addEventListener('click', () => render(btn.dataset.cat, 'Tous'));
    }
  });

  // Sous-filtres accessoires
  const sousBar = document.getElementById('accessoires-sous-bar');
  if (sousBar) {
    sousBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => render('Accessoires', btn.dataset.souscat));
    });
  }

  render(activeCat);
});
