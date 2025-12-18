import { useSearchModal } from '@/hooks/useSearchModal';
import SearchIconSvg from '@/assets/icons/search.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import { SearchSkeleton } from '@/skeletons/search/SearchSkeleton';
import * as S from './SearchModal.style';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { query, inputRef, results, isLoading, isQueryTooShort, handleQueryChange, handleSelect } = useSearchModal({
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.SearchHeader>
          <S.SearchIcon>
            <SearchIconSvg />
          </S.SearchIcon>
          <S.SearchInput
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={handleQueryChange}
          />
          <S.CloseButton onClick={onClose}>
            <CloseIcon />
          </S.CloseButton>
        </S.SearchHeader>

        <S.SearchResults>
          {isQueryTooShort ? (
            <S.HintText>2글자 이상 입력해주세요</S.HintText>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : results.length === 0 ? (
            <S.HintText>검색 결과가 없습니다</S.HintText>
          ) : (
            results.map((article) => (
              <S.ResultItem key={article.id} onClick={() => handleSelect(article.id)}>
                <S.ResultCategory>{article.category}</S.ResultCategory>
                <S.ResultTitle>{article.title}</S.ResultTitle>
                <S.ResultMeta>
                  {article.authors.map((a) => a.name).join(', ')} · {article.createdAt}
                </S.ResultMeta>
              </S.ResultItem>
            ))
          )}
        </S.SearchResults>

        <S.SearchFooter>
          <S.Shortcut>
            <S.Key>ESC</S.Key>
            <span>닫기</span>
          </S.Shortcut>
        </S.SearchFooter>
      </S.Modal>
    </S.Overlay>
  );
};

export default SearchModal;
