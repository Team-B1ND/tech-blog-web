import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { articles } from '../../data/articles.ts';
import { useSearch } from '../../contexts/SearchContext.tsx';
import type { Article } from '../../types/article.ts';
import SearchIconSvg from '../../assets/icons/search.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { initialQuery } = useSearch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();

    // tag: 접두사로 검색하는 경우 정확한 태그 매칭
    if (searchQuery.startsWith('tag:')) {
      const tagQuery = searchQuery.slice(4).trim().toLowerCase();
      if (tagQuery.length < 1) {
        setResults([]);
        return;
      }
      const filtered = articles.filter((article) =>
        article.tags.some((tag) => tag.toLowerCase() === tagQuery)
      );
      setResults(filtered);
      return;
    }

    // 일반 검색
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery) ||
        article.authors.some((author) => author.toLowerCase().includes(searchQuery)) ||
        article.category.toLowerCase().includes(searchQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
    setResults(filtered);
  }, [query]);

  const handleSelect = (articleId: string) => {
    onClose();
    navigate(`/article/${articleId}`);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <SearchHeader>
          <SearchIcon>
            <SearchIconSvg />
          </SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="검색... (태그: tag:태그명)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </SearchHeader>

        <SearchResults>
          {query.trim().length < 2 ? (
            <HintText>2글자 이상 입력해주세요</HintText>
          ) : results.length === 0 ? (
            <HintText>검색 결과가 없습니다</HintText>
          ) : (
            results.map((article) => (
              <ResultItem key={article.id} onClick={() => handleSelect(article.id)}>
                <ResultCategory>{article.category}</ResultCategory>
                <ResultTitle>{article.title}</ResultTitle>
                <ResultMeta>
                  {article.authors.join(', ')} · {article.createdAt}
                </ResultMeta>
              </ResultItem>
            ))
          )}
        </SearchResults>

        <SearchFooter>
          <Shortcut>
            <Key>ESC</Key>
            <span>닫기</span>
          </Shortcut>
        </SearchFooter>
      </Modal>
    </Overlay>
  );
};

export default SearchModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 0 ${({ theme }) => theme.spacing.md};
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SearchIcon = styled.div`
  color: ${({ theme }) => theme.colors.textTertiary};
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textTertiary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const HintText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const ResultItem = styled.button`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.categoryBg};
  }
`;

const ResultCategory = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResultTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResultMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const SearchFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.categoryBg};
`;

const Shortcut = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Key = styled.span`
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
`;
