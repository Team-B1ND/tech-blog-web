import { useSubscribeForm } from '@/hooks/subscribe/useSubscribeForm';
import CheckIcon from '@/assets/icons/check.svg?react';
import * as S from './Subscribe.style';

export const Subscribe = () => {
  const {
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
  } = useSubscribeForm();

  if (isSuccess) {
    return (
      <S.Container>
        <S.Card>
          <S.SuccessContent>
            <S.SuccessIcon>
              <CheckIcon />
            </S.SuccessIcon>
            <S.SuccessTitle>구독 완료!</S.SuccessTitle>
            <S.SuccessText>새로운 글이 올라오면 이메일로 알려드릴게요.</S.SuccessText>
            <S.BackButton onClick={navigateToHome}>홈으로 돌아가기</S.BackButton>
          </S.SuccessContent>
        </S.Card>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Card>
        <S.Title>아티클 구독</S.Title>
        <S.Description>B1ND 기술 블로그의 새로운 글을 이메일로 받아보세요.</S.Description>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="name">이름</S.Label>
            <S.Input
              id="name"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="email">이메일</S.Label>
            <S.Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </S.FormGroup>

          <S.CheckboxGroup>
            <S.Checkbox
              id="privacy"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <S.CheckboxLabel htmlFor="privacy">개인정보 수집 및 이용에 동의합니다</S.CheckboxLabel>
          </S.CheckboxGroup>

          {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

          <S.SubmitButton type="submit" disabled={!canSubmit}>
            {isSubmitting ? '구독 중...' : '구독하기'}
          </S.SubmitButton>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};
