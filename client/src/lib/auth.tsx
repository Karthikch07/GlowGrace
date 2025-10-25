import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

const USERS_KEY = "gg_local_users";
const CURRENT_KEY = "gg_current_user";
const TOKEN_KEY = "gg_auth_token";

function readUsers(): Array<any> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function writeUsers(users: Array<any>) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {}
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_KEY);
      }
    } catch (e) {}
  }, [user]);

  async function signUp({ email, password, firstName, lastName }: { email: string; password: string; firstName?: string; lastName?: string }) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Register failed');
      }
      const body = await res.json();
      const token = body.token;
      if (token) localStorage.setItem(TOKEN_KEY, token);
      const meRes = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      if (!meRes.ok) throw new Error('Failed to fetch user');
      const data = await meRes.json();
      setUser(data);
      localStorage.setItem(CURRENT_KEY, JSON.stringify(data));
      return data;
    } catch (err: any) {
      const users = readUsers();
      if (users.find((u) => u.email === email)) {
        throw new Error('User already exists');
      }
      const id = `local_${Date.now()}`;
      const entry = { id, email, password, firstName, lastName };
      users.push(entry);
      writeUsers(users);
      const publicUser = { id, email, firstName, lastName };
      setUser(publicUser);
      return publicUser;
    }
  }

  async function signIn({ email, password }: { email: string; password: string }) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Login failed');
      }
      const body = await res.json();
      const token = body.token;
      if (token) localStorage.setItem(TOKEN_KEY, token);
      const meRes = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      if (!meRes.ok) throw new Error('Failed to fetch user');
      const data = await meRes.json();
      setUser(data);
      localStorage.setItem(CURRENT_KEY, JSON.stringify(data));
      return data;
    } catch (err: any) {
      const users = readUsers();
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        throw new Error('Invalid credentials');
      }
      const publicUser = { id: found.id, email: found.email, firstName: found.firstName, lastName: found.lastName };
      setUser(publicUser);
      return publicUser;
    }
    }

  function signOut() {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  function getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return { user, signUp, signIn, signOut };
}

export type { User };
