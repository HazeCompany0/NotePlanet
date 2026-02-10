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
const noteSystemStatus = document.getElementById('noteSystemStatus');

let notes = [];
let query = '';
let persistenceMode = 'localStorage';
const memoryFallback = { notes: [] };

function setSystemStatus(message, kind = 'ok') {
  if (!noteSystemStatus) return;
  noteSystemStatus.textContent = message;
  noteSystemStatus.classList.remove('ok', 'warn');
  noteSystemStatus.classList.add(kind === 'warn' ? 'warn' : 'ok');
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `note-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function normalizeNote(note) {
  return {
    id: note?.id ? String(note.id) : generateId(),
    title: String(note?.title || 'Ohne Titel'),
    content: String(note?.content || ''),
    createdAt: note?.createdAt ? String(note.createdAt) : new Date().toISOString(),
  };
}

function readStoredNotes() {
  if (persistenceMode === 'memory') {
    return memoryFallback.notes;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    persistenceMode = 'memory';
    setSystemStatus('Lokaler Speicher nicht verfügbar. Notizen laufen im temporären Speicher.', 'warn');
    return memoryFallback.notes;
  }
}

function writeStoredNotes(nextNotes) {
  if (persistenceMode === 'memory') {
    memoryFallback.notes = nextNotes;
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
    return true;
  } catch {
    persistenceMode = 'memory';
    memoryFallback.notes = nextNotes;
    setSystemStatus('Speichern im Browser blockiert. Notizen bleiben nur bis zum Neuladen erhalten.', 'warn');
    return false;
  }
}

function loadNotes() {
  const stored = readStoredNotes();
  if (!stored) {
    return [
      {
        id: generateId(),
        title: 'Welcome to ScribeAI',
        content: 'Scan Ergebnis und Zusammenfassung der letzten Sitzung.',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  if (!Array.isArray(stored)) {
    return [];
  }

  return stored.map(normalizeNote);
}

function saveNotes() {
  const isPersistent = writeStoredNotes(notes);
  if (isPersistent) {
    setSystemStatus('Notizen wurden lokal gespeichert.', 'ok');
  }
}

function formatDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return 'Unbekanntes Datum';
  }

  return date.toLocaleString('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderNotes() {
  if (!noteGrid || !entryCount) return;

  const normalizedQuery = query.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => {
    if (!normalizedQuery) return true;
    return `${note.title} ${note.content}`.toLowerCase().includes(normalizedQuery);
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

if (noteForm) {
  noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(noteForm);
    const title = String(formData.get('title') || '').trim();
    const content = String(formData.get('content') || '').trim();

    if (!title || !content) {
      setSystemStatus('Bitte Titel und Inhalt ausfüllen.', 'warn');
      return;
    }

    notes.unshift(
      normalizeNote({
        id: generateId(),
        title,
        content,
        createdAt: new Date().toISOString(),
      }),
    );

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

notes = loadNotes();
if (persistenceMode === 'localStorage') {
  setSystemStatus('Notizen bereit. Änderungen werden automatisch lokal gespeichert.', 'ok');
}
renderNotes();
