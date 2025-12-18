import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon404 from '@/assets/404.svg?react';


export const NotFound = () => {
  return (
    <Container>
	    <Icon404 />
      <Title>페이지를 찾을 수 없습니다</Title>
      <Description>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </Description>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
