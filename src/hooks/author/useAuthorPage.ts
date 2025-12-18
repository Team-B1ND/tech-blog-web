import { useParams, useSearchParams } from 'react-router-dom';
import { useMember, useMemberArticles } from '@/api';
import { mapApiArticles } from '@/libs/api/mappers';
import { useAuth } from '@/hooks/auth/useAuth';

const ARTICLES_PER_PAGE = 9;

export const useAuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, logout } = useAuth();

  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const { data: member, isLoading: memberLoading, error: memberError } = useMember(id || '');
  const { data: articlesData, isLoading: articlesLoading } = useMemberArticles(id || '', {
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  });

  const isOwnProfile = isLoggedIn && user?.id === member?.id;
  const articles = articlesData ? mapApiArticles(articlesData.articles) : [];
  const totalCount = articlesData?.pagination.totalCount || 0;
  const totalPages = articlesData?.pagination.totalPages || 1;

  return {
    id,
    member,
    memberLoading,
    memberError: !!memberError,
    articlesLoading,
    isOwnProfile,
    articles,
    currentPage,
    totalCount,
    totalPages,
    logout,
  };
};
