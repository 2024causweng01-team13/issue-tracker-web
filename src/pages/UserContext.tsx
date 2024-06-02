import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext<{
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface User {
  id: number;
  name: string;
  token: string;
}

const decodeToken = (token: string) => {
  const { id, name, expiresAt } = jwtDecode<{ id: string; name: string; expiresAt: number }>(token);
  if (!id || !name || !expiresAt || expiresAt < Date.now() / 1000) {
    console.log('Invalid token');
    return null;
  }

  return { id: Number(id), name, token };
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const { id, name } = decodeToken(token) ?? {};
    if (!id || !name) return null;

    return { id: Number(id), name, token };
  });

  const login = (token: string) => {
    if (!token) return;
    
    const { id, name } = decodeToken(token) ?? {};
    if (!id || !name) return;

    localStorage.setItem('token', token);
    setUser({ id: Number(id), name, token });
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  const isLoggedIn = useMemo(() => !!user, [user]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
