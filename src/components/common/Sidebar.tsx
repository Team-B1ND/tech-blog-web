import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePopularArticles, useTags } from '@/hooks/api';
import { mapApiArticles } from '@/lib/api/mappers';
import { useSearch } from '@/contexts/SearchContext';
import { ViewSpan } from '@/components/article/ViewSpan';
import { Skeleton } from '@/skeleton/Skeleton.tsx';

const PopularSkeleton = () => (
  <PopularList>
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonItem key={i}>
        <SkeletonTitle $width={`${70 + Math.random() * 30}%`} />
        <SkeletonViews />
      </SkeletonItem>
    ))}
  </PopularList>
);

const TagsSkeleton = () => (
  <TagList>
    {Array.from({ length: 8 }).map((_, i) => (
      <SkeletonTag key={i} $width={40 + Math.random() * 40} />
    ))}
  </TagList>
);

export const Sidebar = () => {
  const { data: popularData, isLoading: popularLoading } = usePopularArticles(5);
  const { data: tagsData, isLoading: tagsLoading } = useTags();
  const { openSearch } = useSearch();

  const popularArticles = popularData ? mapApiArticles(popularData) : [];
  const tags = tagsData || [];

  return (
    <SidebarWrapper>
      <Section>
        <SectionTitle>지금 인기 글</SectionTitle>
        {popularLoading ? (
          <PopularSkeleton />
        ) : popularArticles.length === 0 ? (
          <EmptyText>인기 글이 없습니다</EmptyText>
        ) : (
          <PopularList>
            {popularArticles.map((article) => (
              <PopularItem key={article.id} to={`/article/${article.id}`}>
                <PopularContent>
                  <PopularTitle>{article.title}</PopularTitle>
                  <ViewSpan views={article.views} />
                </PopularContent>
              </PopularItem>
            ))}
          </PopularList>
        )}
      </Section>

      <Section>
        <SectionTitle>태그</SectionTitle>
        {tagsLoading ? (
          <TagsSkeleton />
        ) : tags.length === 0 ? (
          <EmptyText>태그가 없습니다</EmptyText>
        ) : (
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag.id} onClick={() => openSearch(`tag:${tag.name}`)}>
                {tag.name}
              </Tag>
            ))}
          </TagList>
        )}
      </Section>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PopularItem = styled(Link)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const PopularContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const PopularTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const EmptyText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const SkeletonTitle = styled(Skeleton)<{ $width: string }>`
  height: 16px;
  width: ${({ $width }) => $width};
`;

const SkeletonViews = styled(Skeleton)`
  height: 12px;
  width: 50px;
`;

const SkeletonTag = styled(Skeleton)<{ $width: number }>`
  height: 24px;
  width: ${({ $width }) => $width}px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;
