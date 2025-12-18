import { useState } from 'react';
import styled from 'styled-components';
import type { CommentInput } from '@/types/comment';

interface CommentFormProps {
  onSubmit: (comment: CommentInput) => void;
  isReply?: boolean;
  replyAuthor?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const CommentForm = ({ onSubmit, isReply = false, replyAuthor, onCancel, isSubmitting = false }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    onSubmit({ author: author.trim(), content: content.trim() });
    setAuthor('');
    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit} $isReply={isReply}>
      {isReply && replyAuthor && (
        <ReplyingTo>
          <ReplyLabel>@{replyAuthor}</ReplyLabel>
          <span>에게 답글</span>
        </ReplyingTo>
      )}
      <InputRow>
        <AuthorInput
          type="text"
          placeholder="이름"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </InputRow>
      <ContentTextarea
        placeholder={isReply ? '답글을 입력하세요' : '댓글을 입력하세요'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <ButtonRow>
        {isReply && onCancel && (
          <CancelButton type="button" onClick={onCancel}>
            취소
          </CancelButton>
        )}
        <SubmitButton type="submit" disabled={!author.trim() || !content.trim() || isSubmitting}>
          {isSubmitting ? '작성 중...' : isReply ? '답글 작성' : '댓글 작성'}
        </SubmitButton>
      </ButtonRow>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form<{ $isReply: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme, $isReply }) => $isReply ? theme.spacing.md : theme.spacing.lg};
  background-color: ${({ theme, $isReply }) => $isReply ? theme.colors.background : theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${({ $isReply, theme }) => $isReply && `border: 1px solid ${theme.colors.border};`}
`;

const InputRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ReplyingTo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const ReplyLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const AuthorInput = styled.input`
  flex: 1;
  max-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: inherit;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;
