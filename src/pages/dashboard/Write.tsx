import type { ApiCategory } from '@/lib/api/types';
import { MarkdownToolbar } from '@/components/write/MarkdownToolbar';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { AuthorSelector, type Author } from '@/components/write/AuthorSelector';
import { useMarkdownEditor } from '@/hooks/write/useMarkdownEditor';
import { useWriteForm } from '@/hooks/write/useWriteForm';
import { useAuth } from '@/hooks/auth/useAuth';
import { API_CATEGORIES } from '@/constants';
import ImageIcon from '@/assets/icons/image.svg?react';
import * as S from './Write.style';

export const Write = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <WriteForm currentUser={{ id: user.id, name: user.name }} />;
};

const WriteForm = ({ currentUser }: { currentUser: Author }) => {
  const {
    fileInputRef,
    title,
    setTitle,
    authors,
    setAuthors,
    category,
    setCategory,
    tags,
    setTags,
    thumbnailPreview,
    content,
    setContent,
    canSubmit,
    isPending,
    handleThumbnailUpload,
    clearThumbnail,
    triggerThumbnailUpload,
    handleSubmit,
  } = useWriteForm(currentUser);

  const {
    textareaRef,
    imageInputRef,
    isUploadingImage,
    handleToolbarAction,
    handleImageUpload: handleContentImageUpload,
    triggerImageUpload,
  } = useMarkdownEditor(content, setContent);

  return (
    <S.Container>
      <S.Header>
        <S.Title>새 글 작성</S.Title>
        <S.ButtonGroup>
          <S.SubmitButton type="button" onClick={handleSubmit} disabled={!canSubmit}>
            {isPending ? '저장 중...' : '저장'}
          </S.SubmitButton>
        </S.ButtonGroup>
      </S.Header>

      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <S.FormGroup $flex={2}>
            <S.Label htmlFor="title">제목 *</S.Label>
            <S.Input
              id="title"
              type="text"
              placeholder="글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </S.FormGroup>
          <S.FormGroup $flex={1}>
            <S.Label htmlFor="category">카테고리 *</S.Label>
            <S.Select id="category" value={category} onChange={(e) => setCategory(e.target.value as ApiCategory)}>
              {API_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </S.Select>
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup $flex={1}>
            <S.Label>작성자</S.Label>
            <AuthorSelector authors={authors} onChange={setAuthors} currentUser={currentUser} />
          </S.FormGroup>
          <S.FormGroup $flex={1}>
            <S.Label htmlFor="tags">태그 (쉼표로 구분)</S.Label>
            <S.Input
              id="tags"
              type="text"
              placeholder="springboot, react, devops"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormGroup>
          <S.Label>썸네일 이미지</S.Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            style={{ display: 'none' }}
          />
          {thumbnailPreview ? (
            <S.ThumbnailPreview>
              <S.ThumbnailImage src={thumbnailPreview} alt="썸네일 미리보기" />
              <S.ThumbnailOverlay>
                <S.ThumbnailButton type="button" onClick={triggerThumbnailUpload}>
                  변경
                </S.ThumbnailButton>
                <S.ThumbnailButton type="button" onClick={clearThumbnail}>
                  삭제
                </S.ThumbnailButton>
              </S.ThumbnailOverlay>
            </S.ThumbnailPreview>
          ) : (
            <S.ImageUploadArea onClick={triggerThumbnailUpload}>
              <S.UploadIcon>
                <ImageIcon />
              </S.UploadIcon>
              <S.UploadText>클릭하여 이미지 업로드</S.UploadText>
            </S.ImageUploadArea>
          )}
        </S.FormGroup>

        <S.EditorSection>
          <S.Label>본문</S.Label>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleContentImageUpload}
            style={{ display: 'none' }}
          />
          <S.EditorWrapper>
            <S.EditorPane>
              <S.PaneHeader>편집</S.PaneHeader>
              <MarkdownToolbar
                onInsert={handleToolbarAction}
                onImageUpload={triggerImageUpload}
                isUploading={isUploadingImage}
              />
              <S.Textarea
                ref={textareaRef}
                id="content"
                placeholder="아티클을 작성하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </S.EditorPane>
            <S.PreviewPane>
              <S.PaneHeader>미리보기</S.PaneHeader>
              <S.PreviewContent>
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <S.PlaceholderText>마크다운을 작성하면 미리보기가 표시됩니다</S.PlaceholderText>
                )}
              </S.PreviewContent>
            </S.PreviewPane>
          </S.EditorWrapper>
        </S.EditorSection>
      </S.Form>
    </S.Container>
  );
};
