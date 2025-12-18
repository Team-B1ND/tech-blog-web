import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import DodamIcon from '../assets/Dodam Face.svg?react';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoggedIn } = useAuth();
  const [selectedAuthorId,] = useState('');

  const redirectUrl = searchParams.get('redirect') || '/';

  // 이미 로그인되어 있으면 리다이렉트
  if (isLoggedIn) {
    navigate(redirectUrl, { replace: true });
    return null;
  }

  const handleLogin = () => {
    if (!selectedAuthorId) return;

    const success = login(selectedAuthorId);
    if (success) {
      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>로그인</Title>
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
	gap: ${({ theme }) => theme.spacing.xl};
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
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LoginButton = styled.button`
  color: white;
  width: 100%;
	display: flex;
	justify-content: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background-color 0.2s ease;
	gap: ${({ theme }) => theme.spacing.sm};
  padding:
	  ${({ theme }) => theme.spacing.dodamHorizontal}
  	${({ theme }) => theme.spacing.dodamVertical}
	;
	background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
