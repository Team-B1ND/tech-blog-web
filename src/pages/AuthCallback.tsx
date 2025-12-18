import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 토큰 또는 에러 파라미터 확인
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(decodeURIComponent(error));
        return;
      }

      if (accessToken && refreshToken) {
        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // React Query 캐시 무효화 (auth 정보 다시 가져오기)
        await queryClient.invalidateQueries({ queryKey: ['auth'] });

        setStatus('success');

        // 저장된 리다이렉트 URL로 이동
        const redirectUrl = localStorage.getItem('auth_redirect') || '/';
        localStorage.removeItem('auth_redirect');

        // 약간의 딜레이 후 리다이렉트 (상태 업데이트 대기)
        setTimeout(() => {
          navigate(redirectUrl, { replace: true });
        }, 500);
      } else {
        // 토큰이 없으면 에러
        setStatus('error');
        setErrorMessage('인증 정보를 받지 못했습니다.');
      }
    };

    handleCallback();
  }, [searchParams, queryClient, navigate]);

  if (status === 'error') {
    return (
      <Container>
        <Card>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>로그인 실패</ErrorTitle>
          <ErrorText>{errorMessage}</ErrorText>
          <RetryButton onClick={() => navigate('/login')}>
            다시 로그인하기
          </RetryButton>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Spinner />
        <StatusText>
          {status === 'success' ? '로그인 성공! 이동 중...' : '로그인 처리 중...'}
        </StatusText>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 300px;
`;

const StatusText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ErrorIcon = styled.span`
  font-size: 48px;
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const RetryButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
