import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/libs/api/client';
import type {
  ApiResponse,
  ApiArticle,
  ApiPopularArticle,
  PaginatedResponse,
  ArticleListParams,
  ArticleSearchParams,
  ApiCategory,
} from '@/libs/api/types';

export interface CreateArticleRequest {
  title: string;
  authorIds: string[];
  category: ApiCategory;
  tags?: string[];
  content: string;
}

interface FileUploadResponse {
  url: string;
}

export const useArticles = (params?: ArticleListParams) => {
  return useQuery({
    queryKey: ['articles', 'list', params?.category ?? 'all', params?.page ?? 1, params?.limit ?? 10],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>('/articles', { params });
      return data.data;
    },
  });
};

export const useInfiniteArticles = (params?: Omit<ArticleListParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>('/articles', {
        params: { ...params, page: pageParam },
      });
      return data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useArticle = (id: string | number) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiArticle>>(`/articles/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const usePopularArticles = (limit?: number) => {
  return useQuery({
    queryKey: ['articles', 'popular', limit],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiPopularArticle[]>>('/articles/popular', { params: { limit } });
      return data.data;
    },
  });
};

export const useSearchArticles = (params: ArticleSearchParams) => {
  return useQuery({
    queryKey: ['articles', 'search', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>('/articles/search', { params });
      return data.data;
    },
    enabled: !!params.q,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ article, thumbnail }: { article: CreateArticleRequest; thumbnail: File }) => {
      const formData = new FormData();
      formData.append('article', new Blob([JSON.stringify(article)], { type: 'application/json' }));
      formData.append('thumbnail', thumbnail);

      const { data } = await apiClient.post<ApiResponse<ApiArticle>>('/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await apiClient.post<ApiResponse<FileUploadResponse>>('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
  });
};
