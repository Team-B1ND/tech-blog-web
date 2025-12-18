import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
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

export const AuthorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

export const AuthorTag = styled.span<{ $isCurrentUser?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: ${({ theme, $isCurrentUser }) => ($isCurrentUser ? theme.colors.primary : theme.colors.border)};
  color: ${({ theme, $isCurrentUser }) => ($isCurrentUser ? 'white' : theme.colors.text)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

export const AuthorName = styled.span``;

export const RemoveButton = styled.button`
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

export const SearchInput = styled.input`
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

export const Dropdown = styled.div`
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

export const DropdownItem = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textTertiary : theme.colors.text)};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, $disabled }) => ($disabled ? 'transparent' : theme.colors.categoryBg)};
  }
`;

export const MemberName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
`;

export const MemberGeneration = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
