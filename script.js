const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

if (loginForm && loginStatus) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = String(formData.get('email') || '').trim();

    if (!email) {
      loginStatus.textContent = 'Bitte gib eine gültige E-Mail ein.';
      loginStatus.classList.remove('success');
      return;
    }

    loginStatus.textContent = `Erfolgreich angemeldet als ${email}.`;
    loginStatus.classList.add('success');
  });
}
