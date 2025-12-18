import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Category } from '../types/article';
import { categories } from '../types/article';

export const Write = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [category, setCategory] = useState<Category>('개발');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = title.trim() && authors.trim() && content.trim() && !isSubmitting;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    const articleData = {
      id: `article-${Date.now()}`,
      title: title.trim(),
      authors: authors.split(',').map(a => a.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
      content: content,
      category,
      thumbnail: thumbnail || '/default-thumbnail.jpg',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      views: 0,
    };

    console.log('Article Data:', JSON.stringify(articleData, null, 2));

    try {
      await navigator.clipboard.writeText(JSON.stringify(articleData, null, 2));
      alert('글 데이터가 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    setIsSubmitting(false);
  };

  return (
    <Container>
      <Header>
        <Title>새 글 작성</Title>
        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate('/')}>
            취소
          </CancelButton>
          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isSubmitting ? '저장 중...' : '저장'}
          </SubmitButton>
        </ButtonGroup>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup $flex={2}>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              type="text"
              placeholder="글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </FormGroup>
          <FormGroup $flex={1}>
            <Label htmlFor="category">카테고리 *</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {categories.filter(c => c !== '전체').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup $flex={1}>
            <Label htmlFor="authors">작성자 * (쉼표로 구분)</Label>
            <Input
              id="authors"
              type="text"
              placeholder="홍길동, 김철수"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </FormGroup>
          <FormGroup $flex={1}>
            <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
            <Input
              id="tags"
              type="text"
              placeholder="React, TypeScript, Frontend"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label>썸네일 이미지</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {thumbnail ? (
            <ThumbnailPreview>
              <ThumbnailImage src={thumbnail} alt="썸네일 미리보기" />
              <ThumbnailOverlay>
                <ThumbnailButton type="button" onClick={() => fileInputRef.current?.click()}>
                  변경
                </ThumbnailButton>
                <ThumbnailButton type="button" onClick={() => setThumbnail('')}>
                  삭제
                </ThumbnailButton>
              </ThumbnailOverlay>
            </ThumbnailPreview>
          ) : (
            <ImageUploadArea onClick={() => fileInputRef.current?.click()}>
              <UploadIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </UploadIcon>
              <UploadText>클릭하여 이미지 업로드</UploadText>
            </ImageUploadArea>
          )}
        </FormGroup>

        <EditorSection>
          <Label>내용 * (Markdown 지원)</Label>
          <EditorWrapper>
            <EditorPane>
              <PaneHeader>편집</PaneHeader>
              <Textarea
                id="content"
                placeholder="마크다운으로 글을 작성하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </EditorPane>
            <PreviewPane>
              <PaneHeader>미리보기</PaneHeader>
              <PreviewContent>
                {content ? (
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
                    {content}
                  </ReactMarkdown>
                ) : (
                  <PlaceholderText>마크다운을 작성하면 미리보기가 표시됩니다</PlaceholderText>
                )}
              </PreviewContent>
            </PreviewPane>
          </EditorWrapper>
        </EditorSection>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CancelButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div<{ $flex?: number }>`
  flex: ${({ $flex }) => $flex || 1};
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageUploadArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const UploadIcon = styled.div`
  color: ${({ theme }) => theme.colors.textTertiary};
  display: flex;
  align-items: center;
`;

const UploadText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const ThumbnailPreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;

  &:hover div {
    opacity: 1;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const ThumbnailButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const EditorSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const EditorPane = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const PreviewPane = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const PaneHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: 'Fira Code', 'Consolas', monospace;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  outline: none;
  resize: none;
  line-height: 1.6;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const PreviewContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 700;
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
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
    margin: ${({ theme }) => theme.spacing.md} 0;
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
    margin: ${({ theme }) => theme.spacing.md} 0;
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
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.sm};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.categoryBg};
    font-weight: 600;
  }
`;

const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.colors.textTertiary};
  font-style: italic;
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
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Fira Code', 'Consolas', monospace;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1;
  pointer-events: none;
`;
