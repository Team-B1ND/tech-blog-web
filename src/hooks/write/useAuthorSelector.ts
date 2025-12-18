import { useState, useRef, useEffect } from 'react';
import { useSearchMembers } from '@/api';
import type { ApiMember } from '@/lib/api/types';

export interface Author {
  id: string;
  name: string;
}

interface UseAuthorSelectorProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
  currentUser: Author;
}

export const useAuthorSelector = ({ authors, onChange, currentUser }: UseAuthorSelectorProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults, isLoading } = useSearchMembers(query, { limit: 10 });

  useEffect(() => {
    if (currentUser && !authors.some((a) => a.id === currentUser.id)) {
      onChange([currentUser, ...authors]);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (member: ApiMember) => {
    if (!authors.some((a) => a.id === member.id)) {
      onChange([...authors, { id: member.id, name: member.name }]);
    }
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemove = (id: string) => {
    if (id === currentUser.id) return;
    onChange(authors.filter((a) => a.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (query) setIsOpen(true);
  };

  const focusInput = () => inputRef.current?.focus();

  const filteredResults = searchResults?.filter((member) => !authors.some((a) => a.id === member.id));

  return {
    query,
    isOpen,
    isLoading,
    containerRef,
    inputRef,
    filteredResults,
    handleSelect,
    handleRemove,
    handleInputChange,
    handleInputFocus,
    focusInput,
  };
};
