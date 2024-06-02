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

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = useMemo(() => !!user, [user]);

  const login = (token: string) => {
    if (!token) return;
    
    const { id, name, expiresAt } = jwtDecode<{ id: string; name: string; expiresAt: number }>(token);
    if (!id || !name || !expiresAt || expiresAt < Date.now() / 1000) {
      console.log('Invalid token');
      return
    }

    setUser({ id: Number(id), name, token });
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
