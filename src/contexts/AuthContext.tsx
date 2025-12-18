import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Author } from '../types/author';
import { getAuthorById } from '../data/authors';

interface AuthContextType {
  user: Author | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (authorId: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = 'b1nd_tech_auth_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUserId) {
      const author = getAuthorById(savedUserId);
      if (author) {
        setUser(author);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (authorId: string): boolean => {
    const author = getAuthorById(authorId);
    if (author) {
      setUser(author);
      localStorage.setItem(AUTH_STORAGE_KEY, authorId);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
