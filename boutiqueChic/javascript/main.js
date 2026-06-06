// ========================================
//  main.js — Page d'accueil
//  D&A Couture – Projet Web L2
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const categories = [
    'Collection Royale',
    'Féerie Moderne',
    'Glamour Absolu',
    'Élégance Intemporelle',
    'Tendances 2026',
    'Chaussures',
    'Accessoires'
  ];

  // 2 produits par catégorie, tous dans une seule grille
  const featured = categories.flatMap(cat =>
    produits.filter(p => p.categorie === cat).slice(0, 2)
  );

  const grid = document.getElementById('featuredProducts');
  if (grid) {
    grid.innerHTML = featured.map(buildProductCard).join('');
  }
});

// Naviguer vers la page produits avec un filtre pré-sélectionné
function filterAndGo(cat) {
  localStorage.setItem('da_filter_cat', cat);
  window.location.href = 'content/produits.html';
}
