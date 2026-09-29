// ---------------------------------------------------------------------------
// localStorage utility – centralises all read/write/delete operations
// ---------------------------------------------------------------------------

const PREFIX = 'societyhub_';

function key(name) {
  return `${PREFIX}${name}`;
}

function isAvailable() {
  try {
    const t = '__ls_test__';
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

const available = isAvailable();

const storage = {
  get(name, fallback = null) {
    if (!available) return fallback;
    try {
      const raw = localStorage.getItem(key(name));
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(name, value) {
    if (!available) return;
    try {
      localStorage.setItem(key(name), JSON.stringify(value));
    } catch {
      // quota exceeded – silent
    }
  },

  remove(name) {
    if (!available) return;
    localStorage.removeItem(key(name));
  },

  clear() {
    if (!available) return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

export default storage;
