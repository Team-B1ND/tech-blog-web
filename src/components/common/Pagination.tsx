import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const getPageUrl = (baseUrl: string, page: number) => {
  if (page === 1) return baseUrl;
  return `${baseUrl}?page=${page}`;
};

export const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper>
      {currentPage === 1 ? (
        <NavButtonDisabled aria-label="이전 페이지">
          <ChevronLeftIcon />
        </NavButtonDisabled>
      ) : (
        <NavLink to={getPageUrl(baseUrl, currentPage - 1)} aria-label="이전 페이지">
          <ChevronLeftIcon />
        </NavLink>
      )}

      <PageList>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <PageLink
              key={index}
              to={getPageUrl(baseUrl, page)}
              $isActive={page === currentPage}
            >
              {page}
            </PageLink>
          ) : (
            <Ellipsis key={index}>{page}</Ellipsis>
          )
        )}
      </PageList>

      {currentPage === totalPages ? (
        <NavButtonDisabled aria-label="다음 페이지">
          <ChevronRightIcon />
        </NavButtonDisabled>
      ) : (
        <NavLink to={getPageUrl(baseUrl, currentPage + 1)} aria-label="다음 페이지">
          <ChevronRightIcon />
        </NavLink>
      )}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const PageList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PageLink = styled(Link)<{ $isActive: boolean }>`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? '#ffffff' : theme.colors.textSecondary};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primaryHover : theme.colors.categoryBg};
  }
`;

const NavLink = styled(Link)`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavButtonDisabled = styled.span`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.3;
  cursor: not-allowed;
`;

const Ellipsis = styled.span`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
