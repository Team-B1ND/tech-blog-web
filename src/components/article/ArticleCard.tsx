import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import type { Article } from '../../types/article.ts';

interface ArticleCardProps {
  article: Article;
  variant?: 'list' | 'block';
}

export const ArticleCard = ({ article, variant = 'list' }: ArticleCardProps) => {
  return (
    <CardLink to={`/article/${article.id}`}>
      <Card $variant={variant}>
        <Thumbnail $variant={variant} src={article.thumbnail} alt={article.title} />
        <Content $variant={variant}>
          <CategoryBadge>{article.category}</CategoryBadge>
          <Title $variant={variant}>{article.title}</Title>
          <Meta>
            <Authors>
              {article.authors.map(a => a.name).join(', ')}
            </Authors>
            <Separator>·</Separator>
            <Date>{article.createdAt}</Date>
          </Meta>
        </Content>
      </Card>
    </CardLink>
  );
};

const CardLink = styled(Link)`
  display: block;
`;

const Card = styled.article<{ $variant: 'list' | 'block' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === 'block'
      ? css`
          flex-direction: column;
          background-color: ${theme.colors.cardBackground};
          border-radius: ${theme.borderRadius.lg};
          overflow: hidden;

          &:hover {
            transform: translateY(-4px);
          }
        `
      : css`
          padding: ${theme.spacing.lg} 0;
          border-bottom: 1px solid ${theme.colors.border};

          &:hover {
            transform: translateX(4px);
          }

          @media (max-width: ${theme.breakpoints.mobile}) {
            flex-direction: column;
            gap: ${theme.spacing.md};
          }
        `}
`;

const Thumbnail = styled.img<{ $variant: 'list' | 'block' }>`
  object-fit: cover;
  flex-shrink: 0;

  ${({ $variant, theme }) =>
    $variant === 'block'
      ? css`
          width: 100%;
          height: 160px;
          border-radius: 0;
        `
      : css`
          width: 200px;
          height: 134px;
          border-radius: ${theme.borderRadius.lg};

          @media (max-width: ${theme.breakpoints.mobile}) {
            width: 100%;
            height: 180px;
          }
        `}
`;

const Content = styled.div<{ $variant: 'list' | 'block' }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  ${({ $variant, theme }) =>
    $variant === 'block' &&
    css`
      padding: ${theme.spacing.sm} ${theme.spacing.md};
    `}
`;

const CategoryBadge = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h2<{ $variant: 'list' | 'block' }>`
  font-size: ${({ theme, $variant }) => $variant === 'block' ? theme.fontSizes.lg : theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
  flex-wrap: wrap;
`;

const Authors = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;
