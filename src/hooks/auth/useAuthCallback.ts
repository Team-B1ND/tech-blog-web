import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

type Status = 'loading' | 'success' | 'error';

export const useAuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(decodeURIComponent(error));
        return;
      }

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        await queryClient.invalidateQueries({ queryKey: ['auth'] });

        setStatus('success');

        const redirectUrl = localStorage.getItem('auth_redirect') || '/';
        localStorage.removeItem('auth_redirect');

        setTimeout(() => {
          navigate(redirectUrl, { replace: true });
        }, 500);
      } else {
        setStatus('error');
        setErrorMessage('인증 정보를 받지 못했습니다.');
      }
    };

    handleCallback();
  }, [searchParams, queryClient, navigate]);

  const handleRetry = () => navigate('/login');

  return {
    status,
    errorMessage,
    handleRetry,
  };
};
