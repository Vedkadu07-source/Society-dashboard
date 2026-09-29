import { createContext, useContext, useState, useCallback } from 'react';
import storage from '../utils/storage';
import { DEMO_USERS, SEED_COMPLAINTS, SEED_PAYMENTS, SEED_RESIDENTS } from '../data/mockData';

const AppContext = createContext(null);

// ---------------------------------------------------------------------------
// Initialise seed data on first visit (synchronous, before first render)
// ---------------------------------------------------------------------------
function initSeedData() {
  if (!storage.get('seeded')) {
    storage.set('users', DEMO_USERS);
    storage.set('complaints', SEED_COMPLAINTS);
    storage.set('payments', SEED_PAYMENTS);
    storage.set('residents', SEED_RESIDENTS);
    storage.set('seeded', true);
  }
}

// Run immediately so that useState initialisers read the seeded data
initSeedData();

export function AppProvider({ children }) {

  // ----- Auth -----
  const [user, setUser] = useState(() => storage.get('currentUser'));

  const login = useCallback((email, password) => {
    const users = storage.get('users', []);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return { ok: false, message: 'Invalid email or password.' };
    const userObj = { ...found };
    delete userObj.password;
    storage.set('currentUser', userObj);
    setUser(userObj);
    return { ok: true, user: userObj };
  }, []);

  const logout = useCallback(() => {
    storage.remove('currentUser');
    setUser(null);
  }, []);

  const register = useCallback((data) => {
    const users = storage.get('users', []);
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      flat: data.flat,
      password: data.password,
      role: 'resident',
    };
    users.push(newUser);
    storage.set('users', users);

    // Also add to residents list
    const residents = storage.get('residents', []);
    residents.push({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      flat: newUser.flat,
      paymentStatus: 'Pending',
    });
    storage.set('residents', residents);

    return { ok: true };
  }, []);

  // ----- Complaints -----
  const [complaints, setComplaints] = useState(() => storage.get('complaints', []));

  const refreshComplaints = useCallback(() => {
    setComplaints(storage.get('complaints', []));
  }, []);

  const addComplaint = useCallback((complaint) => {
    const list = storage.get('complaints', []);
    list.unshift(complaint);
    storage.set('complaints', list);
    setComplaints(list);
  }, []);

  const updateComplaint = useCallback((id, updates) => {
    const list = storage.get('complaints', []);
    const idx = list.findIndex((c) => c.id === id);
    if (idx === -1) return;
    list[idx] = { ...list[idx], ...updates };
    storage.set('complaints', list);
    setComplaints([...list]);
  }, []);

  const deleteComplaint = useCallback((id) => {
    const list = storage.get('complaints', []).filter((c) => c.id !== id);
    storage.set('complaints', list);
    setComplaints(list);
  }, []);

  // ----- Payments -----
  const [payments, setPayments] = useState(() => storage.get('payments', []));
  const [currentDuePaid, setCurrentDuePaid] = useState(() => storage.get('currentDuePaid', false));

  const addPayment = useCallback((payment) => {
    const list = storage.get('payments', []);
    list.unshift(payment);
    storage.set('payments', list);
    storage.set('currentDuePaid', true);
    setPayments(list);
    setCurrentDuePaid(true);
  }, []);

  // ----- Residents -----
  const [residents] = useState(() => storage.get('residents', []));

  // ----- Toasts -----
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        complaints,
        refreshComplaints,
        addComplaint,
        updateComplaint,
        deleteComplaint,
        payments,
        currentDuePaid,
        addPayment,
        residents,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
