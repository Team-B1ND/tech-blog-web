import { useCurrentMember, useMemberArticles } from '@/api';
import { mapApiArticles } from '@/lib/api/mappers';

export const useDashboard = () => {
  const { data: member, isLoading: isMemberLoading } = useCurrentMember();

  const { data: articlesData, isLoading: isArticlesLoading } = useMemberArticles(member?.id || '', {
    page: 1,
    limit: 6,
  });

  const articles = articlesData ? mapApiArticles(articlesData.articles) : [];
  const totalCount = articlesData?.pagination.totalCount || 0;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return {
    member,
    isMemberLoading,
    isArticlesLoading,
    articles,
    totalCount,
    totalViews,
  };
};
