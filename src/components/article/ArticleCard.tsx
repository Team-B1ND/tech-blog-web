import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { Article } from '../../types/article.ts';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <CardLink to={`/article/${article.id}`}>
      <Card>
        <Thumbnail src={article.thumbnail} alt={article.title} />
        <Content>
          <CategoryBadge>{article.category}</CategoryBadge>
          <Title>{article.title}</Title>
          <Meta>
            <Authors>
              {article.authors.join(', ')}
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

const Card = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 134px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 180px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
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

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
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
