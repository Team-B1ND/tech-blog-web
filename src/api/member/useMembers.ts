import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/libs/api/client';
import type { ApiResponse, ApiMember, ApiArticle, PaginatedResponse, ActivateRequest, UpdateProfileRequest } from '@/libs/api/types';

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

export const useMemberArticles = (memberId: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['member', memberId, 'articles', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ApiArticle>>>(`/members/${memberId}/articles`, {
        params,
      });
      return data.data;
    },
    enabled: !!memberId,
  });
};

export const useCurrentMember = () => {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiMember>>('/members/me');
      return data.data;
    },
  });
};

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

interface MemberSearchResponse {
  articles: ApiMember[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

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
