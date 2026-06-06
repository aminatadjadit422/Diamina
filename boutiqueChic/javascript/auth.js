// ========================================
//  auth.js — Authentification simulée
//  D&A Couture – Projet Web L2
// ========================================

// Utilisateurs prédéfinis (simulation sans backend)
const utilisateurs = [
  { nom: "Dihia", prenom: "A", email: "dihia@ummto.dz",    mdp: "Dihia2025!" },
  { nom: "Admin", prenom: "DA", email: "admin@dacouture.dz", mdp: "Admin@2025" }
];

// ========== EXPRESSIONS RÉGULIÈRES ==========
const REGEX = {
  email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mdp:     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  nom:     /^[A-Za-zÀ-ÿ\s'-]{2,50}$/,
  tel:     /^(\+213|0)(5|6|7)\d{8}$/
};

// ========== HELPERS ==========
function setInvalid(groupId, msg) {
  const g = document.getElementById(groupId);
  if (!g) return;
  g.classList.add('invalid');
  const em = g.querySelector('.error-msg');
  if (em) em.textContent = msg;
}
function clearInvalid(groupId) {
  const g = document.getElementById(groupId);
  if (g) g.classList.remove('invalid');
}
function showMessage(type, text) {
  const el = document.getElementById('formMessage');
  if (!el) return;
  el.className = 'form-message ' + type;
  el.textContent = text;
}

// ========== INSCRIPTION ==========
function handleInscription(e) {
  e.preventDefault();
  let ok = true;

  const prenom = document.getElementById('prenom').value.trim();
  const nom    = document.getElementById('nom').value.trim();
  const email  = document.getElementById('email').value.trim();
  const tel    = document.getElementById('tel')?.value.trim() || '';
  const mdp    = document.getElementById('mdp').value;
  const conf   = document.getElementById('confirm').value;

  // Validations
  clearInvalid('g-prenom'); clearInvalid('g-nom');
  clearInvalid('g-email'); clearInvalid('g-tel');
  clearInvalid('g-mdp'); clearInvalid('g-confirm');

  if (!REGEX.nom.test(prenom))  { setInvalid('g-prenom', 'Prénom invalide (2–50 lettres).'); ok = false; }
  if (!REGEX.nom.test(nom))     { setInvalid('g-nom', 'Nom invalide (2–50 lettres).'); ok = false; }
  if (!REGEX.email.test(email)) { setInvalid('g-email', 'Adresse email invalide.'); ok = false; }
  if (tel && !REGEX.tel.test(tel)) { setInvalid('g-tel', 'Numéro algérien invalide (+213XXXXXXXX ou 0XXXXXXXXX).'); ok = false; }
  if (!REGEX.mdp.test(mdp))     { setInvalid('g-mdp', 'Min 8 caractères, 1 majuscule, 1 chiffre, 1 symbole.'); ok = false; }
  if (mdp !== conf)             { setInvalid('g-confirm', 'Les mots de passe ne correspondent pas.'); ok = false; }

  if (!ok) return;

  // Vérifier si email déjà utilisé
  const users = JSON.parse(localStorage.getItem('da_users') || '[]');
  const allUsers = [...utilisateurs, ...users];
  if (allUsers.find(u => u.email === email)) {
    showMessage('error', 'Cet email est déjà utilisé.');
    return;
  }

  // Enregistrer
  users.push({ prenom, nom, email, tel, mdp });
  localStorage.setItem('da_users', JSON.stringify(users));
  showMessage('success', `Bienvenue ${prenom} ! Votre compte a été créé. ✨`);
  setTimeout(() => window.location.href = 'connexion.html', 2000);
}

// ========== CONNEXION ==========
function handleConnexion(e) {
  e.preventDefault();
  let ok = true;

  const email = document.getElementById('email').value.trim();
  const mdp   = document.getElementById('mdp').value;

  clearInvalid('g-email'); clearInvalid('g-mdp');

  if (!REGEX.email.test(email)) { setInvalid('g-email', 'Email invalide.'); ok = false; }
  if (mdp.length < 6)           { setInvalid('g-mdp', 'Mot de passe trop court.'); ok = false; }
  if (!ok) return;

  const users = JSON.parse(localStorage.getItem('da_users') || '[]');
  const allUsers = [...utilisateurs, ...users];
  const user = allUsers.find(u => u.email === email && u.mdp === mdp);

  if (!user) {
    showMessage('error', 'Identifiants incorrects. Veuillez réessayer.');
    return;
  }

  localStorage.setItem('da_session', JSON.stringify({ email: user.email, prenom: user.prenom || user.nom }));
  showMessage('success', `Bonjour ${user.prenom || user.nom} ! Connexion réussie ✨`);
  setTimeout(() => window.location.href = '../index.html', 1500);
}

// ========== TOGGLE MOT DE PASSE ==========
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ========== DÉCONNEXION ==========
function deconnecter() {
  localStorage.removeItem('da_session');
  window.location.href = '../index.html';
}

// Afficher nom session si connecté
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const session = JSON.parse(localStorage.getItem('da_session') || 'null');
  const userLink = document.querySelector('.nav-icons a[href*="connexion"]');
  if (session && userLink) {
    userLink.innerHTML = `<i class="fas fa-user"></i>`;
    userLink.title = `Connecté : ${session.prenom}`;
  }
});
