import { useState } from 'react';
import styled from 'styled-components';
import type { Comment, CommentInput } from '@/types/comment';
import CommentForm from './CommentForm';

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, input: CommentInput) => void;
  isReply?: boolean;
}

const CommentItem = ({ comment, onReply, isReply = false }: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (input: CommentInput) => {
    onReply(comment.id, input);
    setShowReplyForm(false);
  };

  return (
    <CommentWrapper $isReply={isReply}>
      <CommentHeader>
        <AuthorName>{comment.author}</AuthorName>
        <CommentDate>{comment.createdAt}</CommentDate>
      </CommentHeader>
      <CommentContent>{comment.content}</CommentContent>
      <CommentActions>
        {!isReply && (
          <ReplyButton onClick={() => setShowReplyForm(!showReplyForm)}>
            {showReplyForm ? '취소' : '답글'}
          </ReplyButton>
        )}
      </CommentActions>

      {showReplyForm && (
        <ReplyFormWrapper>
          <CommentForm
            onSubmit={handleReply}
            isReply
            replyAuthor={comment.author}
            onCancel={() => setShowReplyForm(false)}
          />
        </ReplyFormWrapper>
      )}

      {comment.replies.length > 0 && (
        <RepliesWrapper>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              isReply
            />
          ))}
        </RepliesWrapper>
      )}
    </CommentWrapper>
  );
};

export default CommentItem;

const CommentWrapper = styled.div<{ $isReply: boolean }>`
  padding: ${({ theme, $isReply }) => $isReply ? theme.spacing.md : theme.spacing.lg};
  background-color: ${({ theme, $isReply }) => $isReply ? theme.colors.categoryBg : theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${({ $isReply, theme }) => !$isReply && `border: 1px solid ${theme.colors.border};`}
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const CommentContent = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const CommentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ReplyButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.categoryBg};
  }
`;

const ReplyFormWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const RepliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
`;
