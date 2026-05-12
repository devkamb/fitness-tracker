const DB_NAME = 'FitnessTracker';
const DB_VERSION = 2;
const STORES = ['days', 'workouts', 'weights', 'photos', 'settings', 'career'];

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      STORES.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'id' });
        }
      });
    };
  });
}

async function getStore(storeName, mode = 'readonly') {
  const db = await openDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

export async function getData(storeName, id) {
  const store = await getStore(storeName);
  return new Promise((resolve, reject) => {
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function setData(storeName, data) {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.put(data);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getAllData(storeName) {
  const store = await getStore(storeName);
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteData(storeName, id) {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function exportAll() {
  const result = {};
  for (const store of STORES) {
    result[store] = await getAllData(store);
  }
  return result;
}

export async function importAll(data) {
  for (const store of STORES) {
    if (data[store]) {
      for (const item of data[store]) {
        await setData(store, item);
      }
    }
  }
}

export async function clearStore(storeName) {
  const store = await getStore(storeName, 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function clearAll() {
  for (const store of STORES) {
    await clearStore(store);
  }
}

// ============================================================
// BACKUP: Auto-backup to localStorage on every save
// ============================================================

const BACKUP_KEY = 'ft_backup';

export async function backupToLocalStorage() {
  try {
    const data = await exportAll();
    localStorage.setItem(BACKUP_KEY, JSON.stringify(data));
    localStorage.setItem(BACKUP_KEY + '_time', new Date().toISOString());
  } catch (e) {
    console.warn('Backup failed:', e);
  }
}

export function getBackup() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export async function restoreFromBackup() {
  const backup = getBackup();
  if (backup) {
    await importAll(backup);
    return true;
  }
  return false;
}

// Wrap setData to auto-backup after writes
const _origSetData = setData;
export async function setDataWithBackup(storeName, data) {
  await _origSetData(storeName, data);
  // Debounced backup - don't block the UI
  clearTimeout(window._backupTimer);
  window._backupTimer = setTimeout(() => backupToLocalStorage(), 2000);
}

// ============================================================
// SEED: Restore historical workout data from screenshots
// ============================================================

const SEED_KEY = 'ft_data_seeded_v2';

export async function seedHistoricalData() {
  if (localStorage.getItem(SEED_KEY)) return; // Already seeded

  const s = (w, r) => ({ weight: String(w), reps: String(r), done: true });
  const s0 = (w, r) => ({ weight: String(w), reps: String(r), done: false });

  const workouts = [
    // ---- Week of Apr 13-16 (from "Last week" labels) ----
    {
      id: '2026-04-13', workout: 'Push', exercises: {
        db_bench:      { sets: [s(45,8), s(45,8), s(50,6), s(50,5)] },
        incline_db:    { sets: [s(50,10), s(50,8), s(50,8)] },
        ohp:           { sets: [s(50,10), s(50,10), s(50,10)] },
        lateral_raises:{ sets: [s(15,18), s(17,15), s(17,15)] },
        dips:          { sets: [s(85,10), s(75,8), s(80,8)] },
        tri_pushdowns: { sets: [s(42,15), s(47,15), s(47,15)] },
      }
    },
    {
      id: '2026-04-14', workout: 'Pull', exercises: {
        pullups:    { sets: [s(70,8), s(70,10), s(70,7), s(70,8)] },
        bb_rows:    { sets: [s(45,11), s(50,8), s(50,8), s(50,10)] },
        cable_rows: { sets: [s(120,10), s(120,12), s(120,12)] },
        face_pulls: { sets: [s(37,15), s(37,20), s(37,20)] },
        bb_curls:   { sets: [s(50,8), s(40,12), s(40,12)] },
        hammer_curls:{ sets: [s(20,18), s(22,12), s(22,12)] },
      }
    },
    {
      id: '2026-04-16', workout: 'Legs', exercises: {
        back_squats:    { sets: [s(50,8), s(55,8), s(55,8), s(60,6)] },
        rdls:           { sets: [s0(0,0), s0(0,0), s0(0,0), s0(0,0)] },
        leg_press:      { sets: [s(145,12), s(145,12), s(175,12)] },
        walking_lunges: { sets: [s(0,10), s(0,10), s(0,9)] },
        leg_curls:      { sets: [s(85,12), s(85,15), s(85,12)] },
        calf_raises:    { sets: [s(0,20), s(0,20), s(0,20)] },
      }
    },

    // ---- Sat Apr 18 - Upper ----
    {
      id: '2026-04-18', workout: 'Upper', exercises: {
        db_bench_s:     { sets: [s(50,10), s(55,12), s(55,12)] },
        cable_rows_s:   { sets: [s(120,15), s(140,15), s(140,12)] },
        db_shoulder:    { sets: [s(30,12), s(35,10), s(35,12)] },
        lat_pulldown_s: { sets: [s(120,15), s(140,15), s(140,10)] },
        db_curls_s:     { sets: [s(15,15), s(20,15), s(20,15)] },
        oh_tri_ext:     { sets: [s(17,15), s(17,12), s(17,12)] },
      }
    },

    // ---- Mon Apr 20 - Push ----
    {
      id: '2026-04-20', workout: 'Push', exercises: {
        db_bench:      { sets: [s(50,8), s(55,8), s(60,8), s(65,7)] },
        incline_db:    { sets: [s(50,10), s(55,7), s(55,9)] },
        ohp:           { sets: [s(50,10), s(60,8), s(60,8)] },
        lateral_raises:{ sets: [s(17,15), s(20,15), s(20,15)] },
        dips:          { sets: [s(85,12), s(75,8), s(85,12)] },
        tri_pushdowns: { sets: [s(47,15), s(52,12), s(52,15)] },
      }
    },

    // ---- Tue Apr 21 - Pull ----
    {
      id: '2026-04-21', workout: 'Pull', exercises: {
        pullups:     { sets: [s(70,10), s(60,10), s(60,8), s(60,8)] },
        bb_rows:     { sets: [s(50,10), s(50,8), s(55,8), s(55,8)] },
        cable_rows:  { sets: [s(140,15), s(140,12), s(140,12)] },
        face_pulls:  { sets: [s(37,15), s(42,20), s(42,20)] },
        bb_curls:    { sets: [s(50,12), s(40,8), s(40,8)] },
        hammer_curls:{ sets: [s(22,12), s(22,12), s(25,12)] },
      }
    },

    // ---- Thu Apr 23 - Legs ----
    {
      id: '2026-04-23', workout: 'Legs', exercises: {
        back_squats:    { sets: [s(60,8), s(60,8), s(65,6), s(65,6)] },
        rdls:           { sets: [s0(0,0), s0(0,0), s0(0,0), s0(0,0)] },
        leg_press:      { sets: [s(175,12), s(190,12), s(220,12)] },
        walking_lunges: { sets: [s(0,10), s(0,10), s(0,10)] },
        leg_curls:      { sets: [s(100,14), s(100,13), s(100,13)] },
        calf_raises:    { sets: [s(0,20), s(30,20), s(30,20)] },
      }
    },
  ];

  // Insert all workout data (won't overwrite existing)
  for (const w of workouts) {
    const existing = await getData('workouts', w.id);
    if (!existing) {
      await _origSetData('workouts', w);
    }
  }

  localStorage.setItem(SEED_KEY, 'true');
  console.log('Historical workout data seeded successfully!');

  // Immediately backup after seeding
  await backupToLocalStorage();
}
