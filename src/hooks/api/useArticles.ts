import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type {
  ApiResponse,
  ApiArticle,
  PaginatedResponse,
  ArticleListParams,
  ArticleSearchParams,
} from '@/lib/api/types';

// 글 목록 조회
export const useArticles = (params?: ArticleListParams) => {
  return useQuery({
    queryKey: ['articles', 'list', params?.category ?? 'all', params?.page ?? 1, params?.limit ?? 10],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(
        '/articles',
        { params }
      );
      return data.data;
    },
  });
};

// 글 목록 무한 스크롤
export const useInfiniteArticles = (params?: Omit<ArticleListParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(
        '/articles',
        { params: { ...params, page: pageParam } }
      );
      return data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

// 글 상세 조회
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

// 인기 글 목록
export const usePopularArticles = (limit?: number) => {
  return useQuery({
    queryKey: ['articles', 'popular', limit],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiArticle[]>>(
        '/articles/popular',
        { params: { limit } }
      );
      return data.data;
    },
  });
};

// 글 검색
export const useSearchArticles = (params: ArticleSearchParams) => {
  return useQuery({
    queryKey: ['articles', 'search', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(
        '/articles/search',
        { params }
      );
      return data.data;
    },
    enabled: !!params.q,
  });
};
