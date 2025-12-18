import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAuthorById, getArticlesByAuthor } from '../data/authors';
import { ArticleCard } from '../components/article/ArticleCard';
import { Pagination } from '../components/common/Pagination';
import { NotFound } from './NotFound';

const ARTICLES_PER_PAGE = 9;

export const Author = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const author = getAuthorById(id || '');

  if (!author) {
    return <NotFound />;
  }

  const allArticles = getArticlesByAuthor(author.name);
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return (
    <Container>
      <AuthorHeader>
        <NameRow>
	        <Generation>{author.generation}기</Generation>
          <Name>{author.name}</Name>
        </NameRow>
        <Bio>{author.bio}</Bio>
      </AuthorHeader>

      <ArticlesSection>
        <SectionTitle>작성한 글 ({allArticles.length})</SectionTitle>
        <ArticleGrid>
          {paginatedArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="block" />
          ))}
        </ArticleGrid>
        {allArticles.length === 0 && (
          <EmptyState>작성한 글이 없습니다.</EmptyState>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/author/${id}`}
          />
        )}
      </ArticlesSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const AuthorHeader = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Name = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Generation = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const Bio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ArticlesSection = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
