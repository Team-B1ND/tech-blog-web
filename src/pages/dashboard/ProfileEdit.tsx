import { useCurrentMember } from '@/api';
import type { ApiMember } from '@/lib/api/types';
import { useProfileEditForm } from '@/hooks/profile/useProfileEditForm';
import * as S from './ProfileEdit.style';

export const ProfileEdit = () => {
  const { data: member, isLoading } = useCurrentMember();

  if (isLoading || !member) {
    return null;
  }

  return <ProfileEditForm member={member} />;
};

const ProfileEditForm = ({ member }: { member: ApiMember }) => {
  const {
    bio,
    setBio,
    generation,
    handleGenerationChange,
    hasChanges,
    isPending,
    handleSave,
    handleCancel,
  } = useProfileEditForm(member);

  return (
    <S.Container>
      <S.Header>
        <S.Title>내 정보 수정</S.Title>
        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={handleCancel}>
            취소
          </S.CancelButton>
          <S.SaveButton onClick={handleSave} disabled={!hasChanges || isPending}>
            {isPending ? '저장 중...' : '저장'}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Header>

      <S.ProfileSection>
        <S.NameRow>
          <S.GenerationChip>
            <S.GenerationInput
              type="number"
              value={generation}
              onChange={handleGenerationChange}
              placeholder="1"
              min="1"
            />
            <S.GenerationSuffix>기</S.GenerationSuffix>
          </S.GenerationChip>
          <S.Name>{member.name}</S.Name>
        </S.NameRow>
        <S.BioInput
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자신을 소개해주세요"
        />
      </S.ProfileSection>
    </S.Container>
  );
};
