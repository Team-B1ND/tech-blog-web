import type { CommentInput } from '@/types/comment';
import { useCommentForm } from '@/hooks/comment/useCommentForm';
import * as S from './CommentForm.style';

interface CommentFormProps {
  onSubmit: (comment: CommentInput) => void;
  isReply?: boolean;
  replyAuthor?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const CommentForm = ({ onSubmit, isReply = false, replyAuthor, onCancel, isSubmitting = false }: CommentFormProps) => {
  const { author, setAuthor, content, textareaRef, canSubmit, handleContentChange, handleSubmit } = useCommentForm({
    onSubmit,
  });

  return (
    <S.Form onSubmit={handleSubmit} $isReply={isReply}>
      {isReply && replyAuthor && (
        <S.ReplyingTo>
          <S.ReplyLabel>@{replyAuthor}</S.ReplyLabel>
          <span>에게 답글</span>
        </S.ReplyingTo>
      )}
      <S.InputRow>
        <S.AuthorInput
          type="text"
          placeholder="이름"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </S.InputRow>
      <S.ContentTextarea
        ref={textareaRef}
        placeholder={isReply ? '답글을 입력하세요' : '댓글을 입력하세요'}
        value={content}
        onChange={handleContentChange}
      />
      <S.ButtonRow>
        {isReply && onCancel && (
          <S.CancelButton type="button" onClick={onCancel}>
            취소
          </S.CancelButton>
        )}
        <S.SubmitButton type="submit" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? '작성 중...' : isReply ? '답글 작성' : '댓글 작성'}
        </S.SubmitButton>
      </S.ButtonRow>
    </S.Form>
  );
};

export default CommentForm;
