import styled from 'styled-components';
import type { CommentInput } from '@/types/comment';
import { useComments, useCreateComment } from '@/hooks/api';
import { apiClient } from '@/lib/api/client';
import { useQueryClient } from '@tanstack/react-query';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const { data: apiComments, isLoading } = useComments(articleId);
  const { mutate: createComment, isPending: isCreating } = useCreateComment(articleId);

  const handleAddComment = (input: CommentInput) => {
    createComment({
      author: input.author,
      content: input.content,
    });
  };

  const handleAddReply = async (parentId: string, input: CommentInput) => {
    try {
      await apiClient.post(`/articles/${articleId}/comments/${parentId}/replies`, {
        author: input.author,
        content: input.content,
      });
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    } catch (error) {
      console.error('Failed to create reply:', error);
    }
  };

  const comments = apiComments || [];
  const totalCount = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0
  );

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>댓글</SectionTitle>
        <CommentCount>{totalCount}</CommentCount>
      </SectionHeader>

      <CommentForm onSubmit={handleAddComment} isSubmitting={isCreating} />

      {isLoading ? (
        <LoadingState>댓글을 불러오는 중...</LoadingState>
      ) : (
        <CommentList>
          {comments.length === 0 ? (
            <EmptyState>
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </EmptyState>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={{
                  id: String(comment.id),
                  articleId,
                  author: comment.author,
                  content: comment.content,
                  createdAt: comment.createdAt.replace('T', ' ').substring(0, 16),
                  parentId: null,
                  replies: (comment.replies || []).map((reply) => ({
                    id: String(reply.id),
                    articleId,
                    author: reply.author,
                    content: reply.content,
                    createdAt: reply.createdAt.replace('T', ' ').substring(0, 16),
                    parentId: String(comment.id),
                    replies: [],
                  })),
                }}
                onReply={handleAddReply}
              />
            ))
          )}
        </CommentList>
      )}
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

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
