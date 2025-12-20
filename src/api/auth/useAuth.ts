import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, clearTokens } from '@/libs/api/client';
import type { ApiResponse, ApiAuthInfo, ApiLoginInfo } from '@/libs/api/types';

export const useLoginInfo = () => {
  return useQuery({
    queryKey: ['auth', 'login'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiLoginInfo>>('/auth/login');
      return data.data;
    },
  });
};

export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiAuthInfo>>('/auth/me');
      return data.data;
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      clearTokens();
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.setQueryData(['member', 'me'], null);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};
