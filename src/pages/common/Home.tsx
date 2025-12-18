import { useHomePage } from '@/hooks/home/useHomePage';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleCardSkeleton } from '@/skeletons/article/ArticleCardSkeleton';
import { CategoryFilter } from '@/components/filter/CategoryFilter';
import { Sidebar } from '@/components/common/Sidebar';
import { Pagination } from '@/components/common/Pagination';
import { NotFound } from '@/pages/common/NotFound';
import bannerImage from '@/assets/dodam/banner.png';
import * as S from './Home.style';

export const Home = () => {
  const {
    isValidSlug,
    selectedCategory,
    currentPage,
    articles,
    totalPages,
    totalCount,
    currentSlug,
    isLoading,
    isError,
  } = useHomePage();

  if (!isValidSlug) {
    return <NotFound />;
  }

  if (isError) {
    return (
      <S.HomeContainer>
        <S.ErrorState>데이터를 불러오는데 실패했습니다.</S.ErrorState>
      </S.HomeContainer>
    );
  }

  return (
    <S.HomeContainer>
      <S.Hero>
        <S.HeroBanner src={bannerImage} alt="B1ND 기술 블로그" />
      </S.Hero>

      <S.ContentWrapper>
        <S.MainContent>
          <S.FilterRow>
            <CategoryFilter selectedCategory={selectedCategory} />
            <S.ArticleCount>총 {totalCount}개의 글</S.ArticleCount>
          </S.FilterRow>

          {isLoading ? (
            <S.ArticleList>
              {Array.from({ length: 5 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </S.ArticleList>
          ) : articles.length === 0 ? (
            <S.EmptyState>아티클이 아직 없어요</S.EmptyState>
          ) : (
            <>
              <S.ArticleList>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </S.ArticleList>

              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={currentSlug ? `/${currentSlug}` : '/'} />
            </>
          )}
        </S.MainContent>

        <S.SidebarWrapper>
          <Sidebar />
        </S.SidebarWrapper>
      </S.ContentWrapper>
    </S.HomeContainer>
  );
};
