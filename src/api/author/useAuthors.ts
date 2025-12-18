import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client.ts';
import type {
  ApiResponse,
  ApiAuthor,
  ApiArticle,
  PaginatedResponse,
} from '@/lib/api/types.ts';

// 작성자 정보 조회
export const useAuthor = (id: string) => {
  return useQuery({
    queryKey: ['author', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiAuthor>>(`/authors/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// 작성자별 글 목록
export const useAuthorArticles = (authorId: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['author', authorId, 'articles', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(
        `/authors/${authorId}/articles`,
        { params }
      );
      return data.data;
    },
    enabled: !!authorId,
  });
};
