import styled from 'styled-components';
import { categories } from '../../types/article.ts';
import type { Category } from '../../types/article.ts';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <FilterWrapper>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          $isActive={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: all 0.2s ease;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.categoryActiveBg : theme.colors.categoryBg};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.categoryActiveText : theme.colors.textSecondary};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.categoryActiveBg : theme.colors.border};
  }
`;
