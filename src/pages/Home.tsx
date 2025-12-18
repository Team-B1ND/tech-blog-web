import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import type { Category, CategorySlug } from '../types/article';
import { categorySlugMap, categoryToSlugMap } from '../types/article';
import { getArticlesPaginated } from '../data/articles';
import {ArticleCard} from "../components/article/ArticleCard.tsx";
import {CategoryFilter} from "../components/filter/CategoryFilter.tsx";
import {Sidebar} from "../components/common/Sidebar.tsx";
import {Pagination} from "../components/common/Pagination.tsx";

const ARTICLES_PER_PAGE = 20;

export const Home = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  const selectedCategory: Category = categorySlugMap[categorySlug as CategorySlug] || '전체';
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const { articles, totalPages, totalCount } = getArticlesPaginated(
    selectedCategory,
    currentPage,
    ARTICLES_PER_PAGE
  );

  const currentSlug = categoryToSlugMap[selectedCategory];

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

          <ArticleList>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </ArticleList>

          {articles.length === 0 ? (
            <EmptyState>
              해당 카테고리에 대한 글이 아직 없습니다.
            </EmptyState>
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={currentSlug ? `/${currentSlug}` : '/'}
            />
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
