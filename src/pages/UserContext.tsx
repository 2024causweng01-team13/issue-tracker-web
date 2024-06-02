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
  token: string;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = useMemo(() => !!user, [user]);

  const login = (token: string) => {
    if (!token) return;
    
    const id = jwtDecode(token).sub;
    if (!id) return;

    const exp = jwtDecode(token).exp;
    if (!exp || exp < Date.now() / 1000) return;

    setUser({ id: Number(id), token });
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
