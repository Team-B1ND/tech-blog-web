import type { CommentInput } from '@/types/comment';
import { useComments, useCreateComment } from '@/api';
import { apiClient } from '@/libs/api/client';
import { useQueryClient } from '@tanstack/react-query';

export const useCommentSection = (articleId: string) => {
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
  const totalCount = comments.reduce((acc, comment) => acc + 1 + (comment.replies?.length || 0), 0);

  const mapComment = (comment: (typeof comments)[0]) => ({
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
  });

  return {
    comments,
    totalCount,
    isLoading,
    isCreating,
    handleAddComment,
    handleAddReply,
    mapComment,
  };
};
