import { useDashboard } from '@/hooks/dashboard/useDashboard';
import { ArticleCard } from '@/components/article/ArticleCard';
import { DashboardSkeleton } from '@/skeleton/dashboard/DashboardSkeleton';
import { ArticleCardSkeleton } from '@/skeleton/article/ArticleCardSkeleton';
import * as S from './Dashboard.style';

export const Dashboard = () => {
  const { member, isMemberLoading, isArticlesLoading, articles, totalCount, totalViews } = useDashboard();

  if (isMemberLoading || !member) {
    return <DashboardSkeleton />;
  }

  return (
    <S.Container>
      <S.WelcomeSection>
        <S.WelcomeTitle>안녕하세요, {member.name}님!</S.WelcomeTitle>
        {member.bio && <S.WelcomeSubtitle>{member.bio}</S.WelcomeSubtitle>}
        <S.WelcomeStats>
          {member.generation}기 · 글 {totalCount}개 · 조회 {totalViews.toLocaleString()}
        </S.WelcomeStats>
      </S.WelcomeSection>

      <S.RecentArticles>
        <S.SectionTitle>최근 작성한 글</S.SectionTitle>
        {isArticlesLoading ? (
          <S.ArticleGrid>
            {[...Array(6)].map((_, i) => (
              <ArticleCardSkeleton key={i} variant="block" />
            ))}
          </S.ArticleGrid>
        ) : articles.length > 0 ? (
          <S.ArticleGrid>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="block" />
            ))}
          </S.ArticleGrid>
        ) : (
          <S.EmptyState>작성한 글이 없습니다.</S.EmptyState>
        )}
      </S.RecentArticles>
    </S.Container>
  );
};
