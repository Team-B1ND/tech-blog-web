import { useAuthorSelector, type Author } from '@/hooks/write/useAuthorSelector';
import CloseIcon from '@/assets/icons/close.svg?react';
import * as S from './AuthorSelector.style';

export type { Author };

interface AuthorSelectorProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
  currentUser: Author;
}

export const AuthorSelector = ({ authors, onChange, currentUser }: AuthorSelectorProps) => {
  const {
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
  } = useAuthorSelector({ authors, onChange, currentUser });

  return (
    <S.Container ref={containerRef}>
      <S.InputWrapper onClick={focusInput}>
        <S.AuthorTags>
          {authors.map((author) => (
            <S.AuthorTag key={author.id} $isCurrentUser={author.id === currentUser.id}>
              <S.AuthorName>{author.name}</S.AuthorName>
              {author.id !== currentUser.id && (
                <S.RemoveButton type="button" onClick={() => handleRemove(author.id)}>
                  <CloseIcon />
                </S.RemoveButton>
              )}
            </S.AuthorTag>
          ))}
          <S.SearchInput
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={authors.length === 1 ? '공동 작성자 검색...' : ''}
          />
        </S.AuthorTags>
      </S.InputWrapper>

      {isOpen && query && (
        <S.Dropdown>
          {isLoading ? (
            <S.DropdownItem $disabled>검색 중...</S.DropdownItem>
          ) : filteredResults && filteredResults.length > 0 ? (
            filteredResults.map((member) => (
              <S.DropdownItem key={member.id} onClick={() => handleSelect(member)}>
                {member.generation && <S.MemberGeneration>{member.generation}기</S.MemberGeneration>}
                <S.MemberName>{member.name}</S.MemberName>
              </S.DropdownItem>
            ))
          ) : (
            <S.DropdownItem $disabled>검색 결과가 없습니다</S.DropdownItem>
          )}
        </S.Dropdown>
      )}
    </S.Container>
  );
};
