import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getArticleById } from '../data/articles';
import { useSearch } from '../contexts/SearchContext';
import CommentSection from '../components/comment/CommentSection.tsx';
import {ViewSpan} from "../components/article/ViewSpan.tsx";
import LinkIcon from '../assets/icons/link.svg?react';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || '');
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

  if (!article) {
    return (
      <NotFound>
        <NotFoundTitle>글을 찾을 수 없습니다</NotFoundTitle>
        <BackLink to="/">홈으로 돌아가기</BackLink>
      </NotFound>
    );
  }

  return (
    <ArticleWrapper>
      <ArticleHeader>
        <Title>{article.title}</Title>
        <Meta>
          <Authors>
            {article.authors.map((author, index) => (
              <span key={author}>
                {author}
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
          <CategoryTag>#{article.category}</CategoryTag>
          {article.tags.map((tag) => (
            <Tag key={tag} onClick={() => openSearch(`tag:${tag}`)}>{tag}</Tag>
          ))}
        </TagsRow>
      </ArticleHeader>

      <Content>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, node, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const isBlock = node?.position?.start.line !== node?.position?.end.line || match;
              return isBlock && match ? (
                <CodeBlockWrapper>
                  <CodeLanguage>{match[1]}</CodeLanguage>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </CodeBlockWrapper>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {article.content}
        </ReactMarkdown>
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

const CodeBlockWrapper = styled.div`
  position: relative;

  &:hover span {
    opacity: 1;
  }
`;

const CodeLanguage = styled.span`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-family: 'Fira Code', 'Consolas', monospace;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
  pointer-events: none;
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

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const NotFoundTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:hover {
    text-decoration: underline;
  }
`;
