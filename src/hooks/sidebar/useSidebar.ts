import { usePopularArticles, useTags } from '@/api';
import { mapApiArticles } from '@/libs/api/mappers';
import { useSearch } from '@/contexts/SearchContext';

export const useSidebar = () => {
  const { data: popularData, isLoading: popularLoading } = usePopularArticles(5);
  const { data: tagsData, isLoading: tagsLoading } = useTags();
  const { openSearch } = useSearch();

  const popularArticles = popularData ? mapApiArticles(popularData) : [];
  const tags = tagsData || [];

  const handleTagClick = (tagName: string) => {
    openSearch(`tag:${tagName}`);
  };

  return {
    popularArticles,
    popularLoading,
    tags,
    tagsLoading,
    handleTagClick,
  };
};
