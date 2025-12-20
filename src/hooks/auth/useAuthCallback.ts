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
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(decodeURIComponent(error));
        return;
      }

      // 백엔드에서 HttpOnly 쿠키로 토큰을 설정했으므로
      // 프론트엔드는 쿠키를 직접 다룰 필요 없음
      // refetchQueries를 사용하여 완료될 때까지 기다림
      await queryClient.refetchQueries({ queryKey: ['auth'] });

      setStatus('success');

      const redirectUrl = localStorage.getItem('auth_redirect') || '/';
      localStorage.removeItem('auth_redirect');

      setTimeout(() => {
        navigate(redirectUrl, { replace: true });
      }, 500);
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
