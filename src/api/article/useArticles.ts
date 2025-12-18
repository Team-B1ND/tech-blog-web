import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client.ts';
import type {ApiResponse, ApiArticle, ApiPopularArticle, PaginatedResponse, ArticleListParams, ArticleSearchParams, ApiCategory,} from '@/lib/api/types.ts';

// 글 작성 요청 타입
export interface CreateArticleRequest {
  title: string;
  authorIds: string[];
  category: ApiCategory;
  tags?: string[];
  content: string;
}

// 파일 업로드 응답 타입
interface FileUploadResponse {
  url: string;
}

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
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
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
      const { data } = await apiClient.get<ApiResponse<ApiPopularArticle[]>>(
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

// 글 작성
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

// 이미지 업로드
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
