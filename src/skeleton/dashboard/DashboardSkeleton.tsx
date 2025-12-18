import styled from 'styled-components';
import { Skeleton } from '@/skeleton/Skeleton.tsx';
import { ArticleCardSkeleton } from '@/skeleton/article/ArticleCardSkeleton.tsx';

export const DashboardSkeleton = () => {
  return (
    <Container>
      <WelcomeSection>
        <TitleSkeleton />
        <SubtitleSkeleton />
        <StatsSkeleton />
      </WelcomeSection>

      <RecentArticles>
        <SectionTitleSkeleton />
        <ArticleGrid>
          {[...Array(6)].map((_, i) => (
            <ArticleCardSkeleton key={i} variant="block" />
          ))}
        </ArticleGrid>
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

const TitleSkeleton = styled(Skeleton)`
  width: 280px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SubtitleSkeleton = styled(Skeleton)`
  width: 200px;
  height: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatsSkeleton = styled(Skeleton)`
  width: 160px;
  height: 16px;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const RecentArticles = styled.section``;

const SectionTitleSkeleton = styled(Skeleton)`
  width: 120px;
  height: 24px;
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
