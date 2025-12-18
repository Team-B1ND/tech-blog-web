import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { ApiResponse, ApiMember, ApiArticle, PaginatedResponse, ActivateRequest, UpdateProfileRequest } from '@/lib/api/types';

// 회원 상세 조회
export const useMember = (memberId: string) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiMember>>(`/members/${memberId}`);
      return data.data;
    },
    enabled: !!memberId,
  });
};

// 회원별 글 목록 조회
export const useMemberArticles = (memberId: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['member', memberId, 'articles', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(
        `/members/${memberId}/articles`,
        { params }
      );
      return data.data;
    },
    enabled: !!memberId,
  });
};

// 현재 로그인한 회원 정보 조회
export const useCurrentMember = () => {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiMember>>('/members/me');
      return data.data;
    },
  });
};

// 회원 활성화
export const useActivateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ActivateRequest) => {
      const { data } = await apiClient.post<ApiResponse<ApiMember>>('/members/activate', params);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

// 프로필 수정
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UpdateProfileRequest) => {
      const { data } = await apiClient.patch<ApiResponse<ApiMember>>('/members/me', params);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

// 회원 검색 응답 타입
interface MemberSearchResponse {
  articles: ApiMember[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

// 회원 검색
export const useSearchMembers = (query: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['members', 'search', query, params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<MemberSearchResponse>>('/members/search', {
        params: { q: query, page: params?.page ?? 1, limit: params?.limit ?? 20 },
      });
      return data.data.articles;
    },
    enabled: query.length > 0,
  });
};
