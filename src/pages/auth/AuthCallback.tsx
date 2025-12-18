import { useAuthCallback } from '@/hooks/auth/useAuthCallback';
import * as S from './AuthCallback.style';

export const AuthCallback = () => {
  const { status, errorMessage, handleRetry } = useAuthCallback();

  if (status === 'error') {
    return (
      <S.Container>
        <S.Card>
          <S.ErrorIcon>⚠️</S.ErrorIcon>
          <S.ErrorTitle>로그인 실패</S.ErrorTitle>
          <S.ErrorText>{errorMessage}</S.ErrorText>
          <S.RetryButton onClick={handleRetry}>다시 로그인하기</S.RetryButton>
        </S.Card>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Card>
        <S.Spinner />
        <S.StatusText>{status === 'success' ? '로그인 성공! 이동 중...' : '로그인 처리 중...'}</S.StatusText>
      </S.Card>
    </S.Container>
  );
};
