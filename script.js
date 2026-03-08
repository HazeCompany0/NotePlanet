const page = document.body?.dataset.page;
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const links = nav ? [...nav.querySelectorAll('a')] : [];

const pageToFile = {
  dashboard: 'index.html',
  diagnose: 'diagnose.html',
  history: 'history.html',
  settings: 'settings.html',
  community: 'community.html',
  'add-plant': 'add-plant.html',
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!nav.contains(target) && !menuToggle.contains(target)) {
      nav.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('open');
    }
  });
}

if (page && links.length > 0) {
  const activeFile = pageToFile[page];
  links.forEach((link) => {
    if (link.getAttribute('href') === activeFile) {
      link.classList.add('active');
    }
  });
}

const toast = document.getElementById('toast');
if (toast && page === 'dashboard') {
  window.setTimeout(() => toast.classList.add('show'), 600);
}
