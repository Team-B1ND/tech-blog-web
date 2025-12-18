import { useParams, useSearchParams } from 'react-router-dom';
import type { Category, CategorySlug } from '@/types/article';
import { slugToCategory, categoryToSlug } from '@/types/article';
import { useArticles } from '@/api';
import { mapApiArticles } from '@/lib/api/mappers';

const ARTICLES_PER_PAGE = 20;
const validSlugs = new Set(['dev', 'infra', 'design', 'product']);

export const useHomePage = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  const isValidSlug = !categorySlug || validSlugs.has(categorySlug);
  const selectedCategory: Category = isValidSlug ? (slugToCategory[categorySlug as CategorySlug] || 'ALL') : 'ALL';
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const { data, isLoading, error } = useArticles({
    category: selectedCategory === 'ALL' ? undefined : selectedCategory,
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  });

  const articles = data ? mapApiArticles(data.articles) : [];
  const totalPages = data?.pagination.totalPages || 1;
  const totalCount = data?.pagination.totalCount || 0;
  const currentSlug = categoryToSlug[selectedCategory];

  return {
    isValidSlug,
    selectedCategory,
    currentPage,
    articles,
    totalPages,
    totalCount,
    currentSlug,
    isLoading,
    isError: !!error,
  };
};
