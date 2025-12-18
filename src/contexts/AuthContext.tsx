import type { ReactNode } from 'react';
import { useAuthInfo, useLogout } from '../hooks/api';
import { AuthContext } from './authTypes';
import type { User } from './authTypes';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: authInfo, isLoading, refetch } = useAuthInfo();
  const { mutate: logoutMutate } = useLogout();

  const user: User | null = authInfo?.authenticated && authInfo.memberId
    ? {
        id: authInfo.memberId,
        name: authInfo.name || '',
        role: authInfo.role || '',
        activated: authInfo.activated,
      }
    : null;

  const logout = () => {
    logoutMutate();
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        loginUrl: authInfo?.loginUrl || null,
        logout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
