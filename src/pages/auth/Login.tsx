import { useLoginPage } from '@/hooks/auth/useLoginPage';
import DodamIcon from '@/assets/dodam/Dodam Face.svg?react';
import * as S from './Login.style';

export const Login = () => {
  const { isLoading, isLoggedIn, handleLogin } = useLoginPage();

  if (isLoading) {
    return (
      <S.Container>
        <S.LoginCard>
          <S.LoadingText>로딩 중...</S.LoadingText>
        </S.LoginCard>
      </S.Container>
    );
  }

  if (isLoggedIn) {
    return null;
  }

  return (
    <S.Container>
      <S.LoginCard>
        <S.Title>로그인</S.Title>
        <S.Description>도담도담 계정으로 로그인하세요</S.Description>
        <S.LoginButton onClick={handleLogin}>
          <DodamIcon />
          도담도담으로 로그인
        </S.LoginButton>
      </S.LoginCard>
    </S.Container>
  );
};
