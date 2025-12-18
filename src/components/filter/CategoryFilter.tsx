import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { categories, categoryToSlugMap } from '../../types/article.ts';
import type { Category } from '../../types/article.ts';

interface CategoryFilterProps {
  selectedCategory: Category;
}

export const CategoryFilter = ({ selectedCategory }: CategoryFilterProps) => {
  return (
    <FilterWrapper>
      {categories.map((category) => {
        const slug = categoryToSlugMap[category];
        const to = slug ? `/${slug}` : '/';
        return (
          <CategoryLink
            key={category}
            to={to}
            $isActive={selectedCategory === category}
          >
            {category}
          </CategoryLink>
        );
      })}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const CategoryLink = styled(Link)<{ $isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.categoryActiveBg : theme.colors.categoryBg};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.categoryActiveText : theme.colors.textSecondary};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.categoryActiveBg : theme.colors.border};
  }
`;
