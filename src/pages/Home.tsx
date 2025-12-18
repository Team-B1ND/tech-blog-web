import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import type { Category, CategorySlug } from '@/types/article';
import { slugToCategory, categoryToSlug } from '@/types/article';
import { useArticles } from '@/hooks/api';
import { mapApiArticles } from '@/lib/api/mappers';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleCardSkeleton } from '@/skeleton/article/ArticleCardSkeleton.tsx';
import { CategoryFilter } from '@/components/filter/CategoryFilter';
import { Sidebar } from '@/components/common/Sidebar';
import { Pagination } from '@/components/common/Pagination';
import { NotFound } from '@/pages/NotFound';

const ARTICLES_PER_PAGE = 20;
const validSlugs = new Set(['dev', 'infra', 'design', 'product']);

export const Home = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  const isValidSlug = !categorySlug || validSlugs.has(categorySlug);
  const selectedCategory: Category = isValidSlug
    ? (slugToCategory[categorySlug as CategorySlug] || 'ALL')
    : 'ALL';
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  // ALL일 때는 category 파라미터를 보내지 않음
  const { data, isLoading, error } = useArticles({
    category: selectedCategory === 'ALL' ? undefined : selectedCategory,
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  });

  if (!isValidSlug) {
    return <NotFound />;
  }

  const articles = data ? mapApiArticles(data.data) : [];
  const totalPages = data?.pagination.totalPages || 1;
  const totalCount = data?.pagination.totalCount || 0;

  const currentSlug = categoryToSlug[selectedCategory];

  if (error) {
    return (
      <HomeContainer>
        <ErrorState>데이터를 불러오는데 실패했습니다.</ErrorState>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>B1ND 기술 블로그</HeroTitle>
        <HeroSubtitle>
          B1ND 팀이 겪은 기술적 도전과 해결 과정을 모두에게 공유합니다
        </HeroSubtitle>
      </Hero>

      <ContentWrapper>
        <MainContent>
          <FilterRow>
            <CategoryFilter
              selectedCategory={selectedCategory}
            />
            <ArticleCount>총 {totalCount}개의 글</ArticleCount>
          </FilterRow>

          {isLoading ? (
            <ArticleList>
              {Array.from({ length: 5 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </ArticleList>
          ) : articles.length === 0 ? (
            <EmptyState>
              아티클이 아직 없어요
            </EmptyState>
          ) : (
            <>
              <ArticleList>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </ArticleList>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={currentSlug ? `/${currentSlug}` : '/'}
              />
            </>
          )}
        </MainContent>

        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
      </ContentWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

const Hero = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  min-width: 0;
`;

const SidebarWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ArticleCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
