// ========================================
//  search.js — Barre de recherche
//  D&A Couture – Projet Web L2
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn  = document.getElementById('searchToggle');
  const searchBar  = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchBtn  = document.getElementById('searchBtn');
  const results    = document.getElementById('searchResults');

  if (!toggleBtn) return;

  // Afficher / masquer la barre
  toggleBtn.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  // Fermer si clic extérieur
  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && e.target !== toggleBtn) {
      searchBar.classList.remove('open');
      results.classList.remove('visible');
    }
  });

  // Recherche en temps réel
  searchInput.addEventListener('input', () => doSearch(searchInput.value));

  // Bouton recherche
  searchBtn.addEventListener('click', () => doSearch(searchInput.value));

  // Touche Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch(searchInput.value);
    if (e.key === 'Escape') {
      searchBar.classList.remove('open');
      results.classList.remove('visible');
    }
  });

  function doSearch(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      results.innerHTML = '';
      results.classList.remove('visible');
      return;
    }

    const found = produits.filter(p =>
      p.nom.toLowerCase().includes(q) ||
      p.categorie.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (found.length === 0) {
      results.innerHTML = `<div class="search-result-item">Aucun résultat pour « ${query} »</div>`;
    } else {
      results.innerHTML = found.slice(0, 6).map(p => `
        <div class="search-result-item" onclick="goToProduct(${p.id})">
          <span style="font-size:1.4rem">${p.emoji}</span>
          <span>${p.nom}</span>
          <span class="result-cat">${p.categorie}</span>
        </div>
      `).join('');
    }
    results.classList.add('visible');
  }
});

function goToProduct(id) {
  // Redirige vers la page produits avec le filtre par catégorie
  const p = produits.find(x => x.id === id);
  if (p) {
    localStorage.setItem('da_filter_cat', p.categorie);
    window.location.href = 'content/produits.html';
  }
}

function filterAndGo(cat) {
  localStorage.setItem('da_filter_cat', cat);
  window.location.href = 'content/produits.html';
}
