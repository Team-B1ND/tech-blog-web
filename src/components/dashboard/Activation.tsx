import { useState } from 'react';
import styled from 'styled-components';
import { useActivateMember } from '@/api';

export const Activation = () => {
  const activateMember = useActivateMember();
  const [secretKey, setSecretKey] = useState('');

  const handleActivate = async () => {
    if (!secretKey.trim()) return;

    try {
      await activateMember.mutateAsync({ secretKey: secretKey.trim() });
      alert('인증이 완료되었습니다!');
      setSecretKey('');
    } catch {
      alert('인증에 실패했습니다. 토큰을 확인해주세요.');
    }
  };

  return (
    <Container>
      <ActivationCard>
        <Title>회원 인증</Title>
        <Description>
          서비스를 이용하려면 인증 토큰을 입력해주세요
        </Description>
        <Input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="인증 토큰을 입력하세요"
          onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
        />
        <ActivateButton
          onClick={handleActivate}
          disabled={!secretKey.trim() || activateMember.isPending}
        >
          {activateMember.isPending ? '인증 중...' : '인증하기'}
        </ActivateButton>
      </ActivationCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const ActivationCard = styled.div`
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

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActivateButton = styled.button`
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: background-color 0.2s ease;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
