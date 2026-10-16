import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { mockUsers, type MockUser, type Role } from "@/data/mock";

const KEY = "medipath-session";

interface AuthContextValue {
  user: MockUser | null;
  login: (role: Role, options?: { remember?: boolean; user?: Partial<MockUser> }) => MockUser;
  logout: () => void;
  updateUser: (changes: Partial<MockUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readSession = (): MockUser | null => {
  const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
};

const writeSession = (user: MockUser, remember: boolean) => {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(readSession);

  const login: AuthContextValue["login"] = useCallback((role, options) => {
    const next = { ...mockUsers[role], ...options?.user, role };
    writeSession(next, options?.remember ?? false);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback((changes: Partial<MockUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...changes };
      writeSession(next, localStorage.getItem(KEY) !== null);
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
