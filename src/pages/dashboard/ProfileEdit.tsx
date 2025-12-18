import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrentMember, useUpdateProfile } from '@/api';
import type { ApiMember } from '@/lib/api/types';

export const ProfileEdit = () => {
  const { data: member, isLoading } = useCurrentMember();

  if (isLoading) {
    return null;
  }

  if (!member) {
    return null;
  }

  return <ProfileEditForm member={member} />;
};

const ProfileEditForm = ({ member }: { member: ApiMember }) => {
  const navigate = useNavigate();
  const updateProfile = useUpdateProfile();
  const [bio, setBio] = useState(member.bio || '');
  const [generation, setGeneration] = useState(member.generation?.toString() || '');

  const hasChanges =
    bio !== (member.bio || '') ||
    generation !== (member.generation?.toString() || '');

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      await updateProfile.mutateAsync({
        bio,
        generation: generation ? Number(generation) : undefined,
      });
      alert('프로필이 저장되었습니다.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('프로필 저장에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>내 정보 수정</Title>
        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <SaveButton onClick={handleSave} disabled={!hasChanges || updateProfile.isPending}>
            {updateProfile.isPending ? '저장 중...' : '저장'}
          </SaveButton>
        </ButtonGroup>
      </Header>

      <ProfileSection>
        <NameRow>
          <GenerationChip>
            <GenerationInput
              type="number"
              value={generation}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || Number(value) >= 1) {
                  setGeneration(value);
                }
              }}
              placeholder="1"
              min="1"
            />
            <GenerationSuffix>기</GenerationSuffix>
          </GenerationChip>
          <Name>{member.name}</Name>
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

const GenerationChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const GenerationInput = styled.input`
  width: 32px;
  background: transparent;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border: none;
  outline: none;
  text-align: center;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const GenerationSuffix = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: white;
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
