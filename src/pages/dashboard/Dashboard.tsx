import styled from 'styled-components';
import { useCurrentMember, useMemberArticles } from '@/api';
import { mapApiArticles } from '@/lib/api/mappers.ts';
import { ArticleCard } from '@/components/article/ArticleCard.tsx';
import { DashboardSkeleton } from '@/skeleton/dashboard/DashboardSkeleton.tsx';
import { ArticleCardSkeleton } from '@/skeleton/article/ArticleCardSkeleton.tsx';

export const Dashboard = () => {
  const { data: member, isLoading: isMemberLoading } = useCurrentMember();

  const { data: articlesData, isLoading: isArticlesLoading } = useMemberArticles(member?.id || '', {
    page: 1,
    limit: 6,
  });

  if (isMemberLoading || !member) {
    return <DashboardSkeleton />;
  }

  const articles = articlesData ? mapApiArticles(articlesData.articles) : [];
  const totalCount = articlesData?.pagination.totalCount || 0;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <Container>
      <WelcomeSection>
        <WelcomeTitle>안녕하세요, {member.name}님!</WelcomeTitle>
        {member.bio && <WelcomeSubtitle>{member.bio}</WelcomeSubtitle>}
        <WelcomeStats>
          {member.generation}기 · 글 {totalCount}개 · 조회 {totalViews.toLocaleString()}
        </WelcomeStats>
      </WelcomeSection>

      <RecentArticles>
        <SectionTitle>최근 작성한 글</SectionTitle>
        {isArticlesLoading ? (
          <ArticleGrid>
            {[...Array(6)].map((_, i) => (
              <ArticleCardSkeleton key={i} variant="block" />
            ))}
          </ArticleGrid>
        ) : articles.length > 0 ? (
          <ArticleGrid>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="block" />
            ))}
          </ArticleGrid>
        ) : (
          <EmptyState>작성한 글이 없습니다.</EmptyState>
        )}
      </RecentArticles>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const WelcomeStats = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const RecentArticles = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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
