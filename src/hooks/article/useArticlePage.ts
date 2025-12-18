import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '@/api';
import { mapApiArticle } from '@/libs/api/mappers';
import { useSearch } from '@/contexts/SearchContext';

export const useArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: apiArticle, isLoading, error } = useArticle(id || '');
  const { openSearch } = useSearch();
  const [copied, setCopied] = useState(false);

  const article = apiArticle ? mapApiArticle(apiArticle) : null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTagClick = (tag: string) => {
    openSearch(`tag:${tag}`);
  };

  return {
    article,
    isLoading,
    isError: !!error || !apiArticle,
    copied,
    handleCopyLink,
    handleTagClick,
  };
};
