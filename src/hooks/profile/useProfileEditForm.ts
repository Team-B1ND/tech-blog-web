import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '@/api';
import type { ApiMember } from '@/lib/api/types';

export const useProfileEditForm = (member: ApiMember) => {
  const navigate = useNavigate();
  const updateProfile = useUpdateProfile();
  const [bio, setBio] = useState(member.bio || '');
  const [generation, setGeneration] = useState(member.generation?.toString() || '');

  const hasChanges = bio !== (member.bio || '') || generation !== (member.generation?.toString() || '');

  const handleGenerationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 1) {
      setGeneration(value);
    }
  };

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

  const handleCancel = () => navigate(-1);

  return {
    bio,
    setBio,
    generation,
    handleGenerationChange,
    hasChanges,
    isPending: updateProfile.isPending,
    handleSave,
    handleCancel,
  };
};
