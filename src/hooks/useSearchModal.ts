import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchArticles } from '@/hooks/api';
import { mapApiArticles } from '@/lib/api/mappers';
import { useSearch } from '@/contexts/SearchContext';

interface UseSearchModalParams {
  isOpen: boolean;
  onClose: () => void;
}

export const useSearchModal = ({ isOpen, onClose }: UseSearchModalParams) => {
  const { initialQuery } = useSearch();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useSearchArticles({
    q: debouncedQuery.length >= 2 ? debouncedQuery : '',
  });

  const results = data ? mapApiArticles(data.data) : [];

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSelect = (articleId: string) => {
    onClose();
    navigate(`/article/${articleId}`);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const isQueryTooShort = query.trim().length < 2;

  return {
    query,
    inputRef,
    results,
    isLoading,
    isQueryTooShort,
    handleQueryChange,
    handleSelect,
  };
};