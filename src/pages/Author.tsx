import { useParams, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthor, useAuthorArticles } from '@/hooks/api';
import { mapApiArticles } from '@/lib/api/mappers';
import { useAuth } from '@/hooks/useAuth';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Pagination } from '@/components/common/Pagination';
import { NotFound } from '@/pages/NotFound';

const ARTICLES_PER_PAGE = 9;

export const Author = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, logout } = useAuth();

  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const { data: author, isLoading: authorLoading, error: authorError } = useAuthor(id || '');
  const { data: articlesData, isLoading: articlesLoading } = useAuthorArticles(id || '', {
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  });

  if (authorLoading) {
    return (
      <Container>
        <LoadingState>작성자 정보를 불러오는 중...</LoadingState>
      </Container>
    );
  }

  if (authorError || !author) {
    return <NotFound />;
  }

  const isOwnProfile = isLoggedIn && user?.id === author.id;
  const articles = articlesData ? mapApiArticles(articlesData.data) : [];
  const totalCount = articlesData?.pagination.totalCount || 0;
  const totalPages = articlesData?.pagination.totalPages || 1;

  return (
    <Container>
      <AuthorHeader>
        <NameRow>
          {author.grade && <Generation>{author.grade}기</Generation>}
          <Name>{author.name}</Name>
        </NameRow>
        {author.email && <Bio>{author.email}</Bio>}
        {isOwnProfile && (
          <ButtonRow>
            <EditProfileButton to="/dashboard/profile">
              내 정보 수정
            </EditProfileButton>
            <LogoutButton onClick={logout}>
              로그아웃
            </LogoutButton>
          </ButtonRow>
        )}
      </AuthorHeader>

      <ArticlesSection>
        <SectionTitle>작성한 글 ({totalCount})</SectionTitle>
        {articlesLoading ? (
          <LoadingState>글을 불러오는 중...</LoadingState>
        ) : articles.length === 0 ? (
          <EmptyState>작성한 글이 없습니다.</EmptyState>
        ) : (
          <>
            <ArticleGrid>
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} variant="block" />
              ))}
            </ArticleGrid>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/author/${id}`}
              />
            )}
          </>
        )}
      </ArticlesSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const EditProfileButton = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
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
