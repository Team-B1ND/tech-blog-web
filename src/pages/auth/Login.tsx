import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth.ts';
import DodamIcon from '@/assets/Dodam Face.svg?react';

const OAUTH_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/dauth`;

export const Login = () => {
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

  if (isLoading) {
    return (
      <Container>
        <LoginCard>
          <LoadingText>로딩 중...</LoadingText>
        </LoginCard>
      </Container>
    );
  }

  if (isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <LoginCard>
        <Title>로그인</Title>
        <Description>
          도담도담 계정으로 로그인하세요
        </Description>
        <LoginButton onClick={handleLogin}>
          <DodamIcon />
          도담도담으로 로그인
        </LoginButton>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const LoginButton = styled.button`
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background-color 0.2s ease;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
