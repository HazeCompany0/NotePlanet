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

const STORAGE_KEY = 'noteplanet.notes';
const noteForm = document.getElementById('noteForm');
const noteGrid = document.getElementById('noteGrid');
const noteSearch = document.getElementById('noteSearch');
const entryCount = document.getElementById('entryCount');
const toggleNoteFormBtn = document.getElementById('toggleNoteFormBtn');
const quickAddBtn = document.getElementById('quickAddBtn');

let notes = loadNotes();
let query = '';

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `note-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [
        {
          id: generateId(),
          title: 'Welcome to ScribeAI',
          content: 'Scan Ergebnis und Zusammenfassung der letzten Sitzung.',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((note) => ({
      id: note?.id ? String(note.id) : generateId(),
      title: String(note?.title || 'Ohne Titel'),
      content: String(note?.content || ''),
      createdAt: note?.createdAt ? String(note.createdAt) : new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function renderNotes() {
  if (!noteGrid || !entryCount) return;

  const normalized = query.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => {
    if (!normalized) return true;
    return `${note.title} ${note.content}`.toLowerCase().includes(normalized);
  });

  entryCount.textContent = String(notes.length);

  if (visibleNotes.length === 0) {
    noteGrid.innerHTML = '<p class="empty-notes">Keine passenden Notizen gefunden.</p>';
    return;
  }

  noteGrid.innerHTML = visibleNotes
    .map(
      (note) => `
      <article class="note-card">
        <h4>${escapeHtml(note.title)}</h4>
        <p>${escapeHtml(note.content)}</p>
        <small>Erstellt: ${formatDate(note.createdAt)}</small>
      </article>
    `,
    )
    .join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

if (noteForm) {
  noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(noteForm);
    const title = String(formData.get('title') || '').trim();
    const content = String(formData.get('content') || '').trim();

    if (!title || !content) return;

    notes.unshift({
      id: generateId(),
      title,
      content,
      createdAt: new Date().toISOString(),
    });

    saveNotes();
    noteForm.reset();
    noteForm.classList.add('hidden');
    renderNotes();
  });
}

if (toggleNoteFormBtn && noteForm) {
  toggleNoteFormBtn.addEventListener('click', () => {
    noteForm.classList.toggle('hidden');
  });
}

if (quickAddBtn && noteForm) {
  quickAddBtn.addEventListener('click', () => {
    noteForm.classList.remove('hidden');
    noteForm.querySelector('input[name="title"]')?.focus();
  });
}

if (noteSearch) {
  noteSearch.addEventListener('input', () => {
    query = noteSearch.value;
    renderNotes();
  });
}

renderNotes();
