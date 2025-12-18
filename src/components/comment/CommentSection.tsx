import { useState } from 'react';
import styled from 'styled-components';
import type { Comment, CommentInput } from '../../types/comment.ts';
import CommentForm from './CommentForm.tsx';
import CommentItem from './CommentItem.tsx';

interface CommentSectionProps {
  articleId: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDate = () => {
  const now = new Date();
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (input: CommentInput) => {
    const newComment: Comment = {
      id: generateId(),
      articleId,
      author: input.author,
      content: input.content,
      createdAt: formatDate(),
      parentId: null,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleAddReply = (parentId: string, input: CommentInput) => {
    const newReply: Comment = {
      id: generateId(),
      articleId,
      author: input.author,
      content: input.content,
      createdAt: formatDate(),
      parentId,
      replies: [],
    };

    setComments(
      comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  const totalCount = comments.reduce(
    (acc, comment) => acc + 1 + comment.replies.length,
    0
  );

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>댓글</SectionTitle>
        <CommentCount>{totalCount}</CommentCount>
      </SectionHeader>

      <CommentForm onSubmit={handleAddComment} />

      <CommentList>
        {comments.length === 0 ? (
          <EmptyState>
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </EmptyState>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleAddReply}
            />
          ))
        )}
      </CommentList>
    </Section>
  );
};

export default CommentSection;

const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
