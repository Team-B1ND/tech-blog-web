import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [originalBio, setOriginalBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user.bio);
      setOriginalBio(user.bio);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const hasChanges = bio !== originalBio;

  const handleSave = async () => {
    if (!hasChanges) return;
    setIsSaving(true);

    // 목업: 실제로는 API 호출
    console.log('Profile update:', { bio });

    await new Promise(resolve => setTimeout(resolve, 500));

    alert('프로필이 저장되었습니다. (목업)');
    setIsSaving(false);
  };

  return (
    <Container>
      <Header>
        <Title>내 정보 수정</Title>
        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <SaveButton onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? '저장 중...' : '저장'}
          </SaveButton>
        </ButtonGroup>
      </Header>

      <ProfileSection>
        <NameRow>
          <Generation>{user.generation}기</Generation>
          <Name>{user.name}</Name>
        </NameRow>
        <BioInput
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자신을 소개해주세요"
        />
      </ProfileSection>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CancelButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SaveButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProfileSection = styled.div`
  text-align: center;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Name = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Generation = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const BioInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  font-family: inherit;
  text-align: center;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
