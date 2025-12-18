import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      className={className}
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
      {content}
    </ReactMarkdown>
  );
};

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
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Fira Code', 'Consolas', monospace;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
  pointer-events: none;
`;
