import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, clearTokens, setTokens } from '@/lib/api/client';
import type { ApiResponse, ApiAuthInfo, ApiLoginInfo, ApiTokenResponse } from '@/lib/api/types';

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

export const useMasterLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { username: string; password: string }) => {
      const { data } = await apiClient.post<ApiResponse<ApiTokenResponse>>('/auth/master', params);
      return data.data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await apiClient.post<ApiResponse<ApiTokenResponse>>('/auth/refresh', { refreshToken });
      return data.data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
    },
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
