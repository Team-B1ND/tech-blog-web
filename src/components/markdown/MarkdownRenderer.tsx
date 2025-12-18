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
    <div className={className}>
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
              <InlineCode {...props}>
                {children}
              </InlineCode>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
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

const InlineCode = styled.code`
  padding: 0.2em 0.4em;
  background-color: rgba(110, 118, 129, 0.2);
  border-radius: 4px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85em;
`;
