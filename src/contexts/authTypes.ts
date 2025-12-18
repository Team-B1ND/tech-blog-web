import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
  role: string;
  activated: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginUrl: string | null;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
