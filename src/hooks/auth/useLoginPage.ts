import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

const OAUTH_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/dauth`;

export const useLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, isLoading } = useAuth();

  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isLoading, isLoggedIn, navigate, redirectUrl]);

  const handleLogin = () => {
    localStorage.setItem('auth_redirect', redirectUrl);
    window.location.href = OAUTH_URL;
  };

  return {
    isLoading,
    isLoggedIn,
    handleLogin,
  };
};
