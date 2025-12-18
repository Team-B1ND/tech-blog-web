import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useArticle } from '@/api';
import { mapApiArticle } from '@/lib/api/mappers.ts';
import { categoryDisplayName } from '@/types/article.ts';
import { useSearch } from '@/contexts/SearchContext.tsx';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer.tsx';
import { Skeleton } from '@/skeleton/Skeleton.tsx';
import CommentSection from '@/components/comment/CommentSection.tsx';
import { ViewSpan } from '@/components/article/ViewSpan.tsx';
import LinkIcon from '@/assets/icons/link.svg?react';
import { NotFound } from '@/pages/common/NotFound.tsx';

const ArticleSkeleton = () => (
  <>
    <ArticleHeader>
      <SkeletonTitle />
      <SkeletonTitleSecond />
      <Meta>
        <SkeletonMeta $width={80} />
        <SkeletonMeta $width={100} />
        <SkeletonMeta $width={60} />
      </Meta>
      <TagsRow>
        <SkeletonTag $width={70} />
        <SkeletonTag $width={50} />
        <SkeletonTag $width={60} />
      </TagsRow>
    </ArticleHeader>
    <SkeletonContent>
      <SkeletonParagraph />
      <SkeletonParagraph $width="95%" />
      <SkeletonParagraph $width="88%" />
      <SkeletonParagraph $width="92%" />
      <SkeletonParagraph $width="70%" />
      <SkeletonHeading />
      <SkeletonParagraph />
      <SkeletonParagraph $width="85%" />
      <SkeletonParagraph $width="90%" />
      <SkeletonParagraph $width="60%" />
    </SkeletonContent>
  </>
);

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const { data: apiArticle, isLoading, error } = useArticle(id || '');
  const { openSearch } = useSearch();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
      <ArticleWrapper>
        <ArticleSkeleton />
      </ArticleWrapper>
    );
  }

  if (error || !apiArticle) {
    return <NotFound />;
  }

  const article = mapApiArticle(apiArticle);

  return (
    <ArticleWrapper>
      <ArticleHeader>
        <Title>{article.title}</Title>
        <Meta>
          <Authors>
            {article.authors.map((author, index) => (
              <span key={author.id}>
                <AuthorLink to={`/author/${author.id}`}>{author.name}</AuthorLink>
                {index < article.authors.length - 1 && ', '}
              </span>
            ))}
          </Authors>
          <Separator>·</Separator>
          <Date>{article.createdAt}</Date>
          <Separator>·</Separator>
	        <ViewSpan views={article.views}/>
        </Meta>
        <TagsRow>
          <CategoryTag>#{categoryDisplayName[article.category]}</CategoryTag>
          {article.tags.map((tag) => (
            <Tag key={tag} onClick={() => openSearch(`tag:${tag}`)}>{tag}</Tag>
          ))}
        </TagsRow>
      </ArticleHeader>

      <Content>
        <MarkdownRenderer content={article.content} />
      </Content>

      <ButtonRow>
        <BackToList to="/">
          <BackArrow>←</BackArrow>
          목록으로 돌아가기
        </BackToList>
        <ShareButton onClick={handleCopyLink} $copied={copied}>
          <LinkIcon />
          {copied ? '복사됨!' : '링크 복사'}
        </ShareButton>
      </ButtonRow>

      <CommentSection articleId={article.id} />
    </ArticleWrapper>
  );
};

export default Article;

const ArticleWrapper = styled.article`
  max-width: 720px;
  margin: 0 auto;
`;

const ArticleHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const AuthorLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textTertiary};
`;


const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const CategoryTag = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
`;

const Tag = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  overflow: visible;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 700;
    margin: ${({ theme }) => theme.spacing.xxl} 0 ${({ theme }) => theme.spacing.lg};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  strong {
    font-weight: 600;
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  ul li {
    list-style: disc;
  }

  ol li {
    list-style: decimal;
  }

  code {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9em;
  }

  pre {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;

    > div {
      border-radius: ${({ theme }) => theme.borderRadius.md} !important;
      margin: 0 !important;
    }

    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 4px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: ${({ theme }) => theme.spacing.lg} 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: visible;
    display: table;
  }

  th, td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    text-align: left;
  }

  th:last-child, td:last-child {
    border-right: none;
  }

  tr:last-child td {
    border-bottom: none;
  }

  th {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const BackToList = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ShareButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme, $copied }) => $copied ? theme.colors.primary : theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme, $copied }) => $copied ? 'white' : theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $copied }) => $copied ? theme.colors.primary : theme.colors.border};
    color: ${({ theme, $copied }) => $copied ? 'white' : theme.colors.text};
  }
`;

const BackArrow = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

// Skeleton styles
const SkeletonTitle = styled(Skeleton)`
  height: 40px;
  width: 90%;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 32px;
  }
`;

const SkeletonTitleSecond = styled(Skeleton)`
  height: 40px;
  width: 60%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 32px;
  }
`;

const SkeletonMeta = styled(Skeleton)<{ $width: number }>`
  height: 18px;
  width: ${({ $width }) => $width}px;
`;

const SkeletonTag = styled(Skeleton)<{ $width: number }>`
  height: 24px;
  width: ${({ $width }) => $width}px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SkeletonHeading = styled(Skeleton)`
  height: 28px;
  width: 50%;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SkeletonParagraph = styled(Skeleton)<{ $width?: string }>`
  height: 20px;
  width: ${({ $width }) => $width || '100%'};
`;
