import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchMembers } from '@/api';
import type { ApiMember } from '@/lib/api/types';
import CloseIcon from '@/assets/icons/close.svg?react';

export interface Author {
  id: string;
  name: string;
}

interface AuthorSelectorProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
  currentUser: Author;
}

export const AuthorSelector = ({ authors, onChange, currentUser }: AuthorSelectorProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults, isLoading } = useSearchMembers(query, { limit: 10 });

  // 현재 사용자가 포함되어 있지 않으면 추가
  useEffect(() => {
    if (currentUser && !authors.some(a => a.id === currentUser.id)) {
      onChange([currentUser, ...authors]);
    }
  }, [currentUser]);

  // 외부 클릭 시 드롭다운 닫기
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
    if (!authors.some(a => a.id === member.id)) {
      onChange([...authors, { id: member.id, name: member.name }]);
    }
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemove = (id: string) => {
    // 현재 사용자는 제거 불가
    if (id === currentUser.id) return;
    onChange(authors.filter(a => a.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const filteredResults = searchResults?.filter(
    member => !authors.some(a => a.id === member.id)
  );

  return (
    <Container ref={containerRef}>
      <InputWrapper onClick={() => inputRef.current?.focus()}>
        <AuthorTags>
          {authors.map(author => (
            <AuthorTag key={author.id} $isCurrentUser={author.id === currentUser.id}>
              <AuthorName>{author.name}</AuthorName>
              {author.id !== currentUser.id && (
                <RemoveButton type="button" onClick={() => handleRemove(author.id)}>
                  <CloseIcon />
                </RemoveButton>
              )}
            </AuthorTag>
          ))}
          <SearchInput
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setIsOpen(true)}
            placeholder={authors.length === 1 ? "공동 작성자 검색..." : ""}
          />
        </AuthorTags>
      </InputWrapper>

      {isOpen && query && (
        <Dropdown>
          {isLoading ? (
            <DropdownItem $disabled>검색 중...</DropdownItem>
          ) : filteredResults && filteredResults.length > 0 ? (
            filteredResults.map(member => (
              <DropdownItem key={member.id} onClick={() => handleSelect(member)}>
                {member.generation && <MemberGeneration>{member.generation}기</MemberGeneration>}
                <MemberName>{member.name}</MemberName>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem $disabled>검색 결과가 없습니다</DropdownItem>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: text;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AuthorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

const AuthorTag = styled.span<{ $isCurrentUser?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser ? theme.colors.primary : theme.colors.border};
  color: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser ? 'white' : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

const AuthorName = styled.span``;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 4px 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
`;

const DropdownItem = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textTertiary : theme.colors.text};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? 'transparent' : theme.colors.categoryBg};
  }
`;

const MemberName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
`;

const MemberGeneration = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
