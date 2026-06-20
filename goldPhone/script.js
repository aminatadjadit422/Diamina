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
