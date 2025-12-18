import styled, { css, keyframes } from 'styled-components';

interface ArticleCardSkeletonProps {
  variant?: 'list' | 'block';
}

export const ArticleCardSkeleton = ({ variant = 'list' }: ArticleCardSkeletonProps) => {
  return (
    <Card $variant={variant}>
      <ThumbnailSkeleton $variant={variant} />
      <Content $variant={variant}>
        <CategorySkeleton />
        <TitleSkeleton />
        <TitleSkeleton $short />
        <MetaSkeleton />
      </Content>
    </Card>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.categoryBg} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.categoryBg} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const Card = styled.div<{ $variant: 'list' | 'block' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ $variant, theme }) =>
    $variant === 'block'
      ? css`
          flex-direction: column;
          background-color: ${theme.colors.cardBackground};
          border-radius: ${theme.borderRadius.lg};
          overflow: hidden;
        `
      : css`
          padding: ${theme.spacing.lg} 0;
          border-bottom: 1px solid ${theme.colors.border};

          @media (max-width: ${theme.breakpoints.mobile}) {
            flex-direction: column;
            gap: ${theme.spacing.md};
          }
        `}
`;

const ThumbnailSkeleton = styled(SkeletonBase)<{ $variant: 'list' | 'block' }>`
  flex-shrink: 0;

  ${({ $variant, theme }) =>
    $variant === 'block'
      ? css`
          width: 100%;
          height: 160px;
          border-radius: 0;
        `
      : css`
          width: 200px;
          height: 134px;
          border-radius: ${theme.borderRadius.lg};

          @media (max-width: ${theme.breakpoints.mobile}) {
            width: 100%;
            height: 180px;
          }
        `}
`;

const Content = styled.div<{ $variant: 'list' | 'block' }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  ${({ $variant, theme }) =>
    $variant === 'block' &&
    css`
      padding: ${theme.spacing.sm} ${theme.spacing.md};
    `}
`;

const CategorySkeleton = styled(SkeletonBase)`
  width: 50px;
  height: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TitleSkeleton = styled(SkeletonBase)<{ $short?: boolean }>`
  width: ${({ $short }) => ($short ? '60%' : '90%')};
  height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MetaSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 16px;
  margin-top: auto;
`;
