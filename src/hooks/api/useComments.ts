import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api/client';
import type { ApiResponse, ApiComment, CommentCreateParams } from '../../lib/api/types';

// 댓글 목록 조회
export const useComments = (articleId: string | number) => {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiComment[]>>(
        `/articles/${articleId}/comments`
      );
      return data.data;
    },
    enabled: !!articleId,
  });
};

// 댓글 작성
export const useCreateComment = (articleId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CommentCreateParams) => {
      const { data } = await apiClient.post<ApiResponse<ApiComment>>(
        `/articles/${articleId}/comments`,
        params
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });
};

// 대댓글 작성
export const useCreateReply = (articleId: string | number, commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CommentCreateParams) => {
      const { data } = await apiClient.post<ApiResponse<ApiComment>>(
        `/articles/${articleId}/comments/${commentId}/replies`,
        params
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });
};
