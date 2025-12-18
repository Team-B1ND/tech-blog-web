import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscribe } from '@/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useSubscribeForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: subscribe, isPending: isSubmitting } = useSubscribe();

  const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
  const canSubmit = !!(name.trim() && isValidEmail(email) && agreed && !isSubmitting);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setErrorMessage('');
    subscribe(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const code = error.response?.data?.error?.code;
          if (code === 'ALREADY_SUBSCRIBED') {
            setErrorMessage('이미 구독된 이메일입니다.');
          } else {
            setErrorMessage('구독 중 오류가 발생했습니다. 다시 시도해주세요.');
          }
        },
      }
    );
  };

  const navigateToHome = () => navigate('/');

  return {
    name,
    setName,
    email,
    setEmail,
    agreed,
    setAgreed,
    isSuccess,
    errorMessage,
    isSubmitting,
    canSubmit,
    handleSubmit,
    navigateToHome,
  };
};
