import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api';
import type { ApiResponse } from '../../lib/api';

// 로그인 URL 정보
interface LoginInfo {
  loginUrl: string;
  description: string;
}

// 현재 인증 정보
export interface AuthInfo {
  authenticated: boolean;
  memberId: string | null;
  name: string | null;
  role: string | null;
  activated: boolean;
  loginUrl: string;
}

// 로그인 URL 조회
export const useLoginInfo = () => {
  return useQuery({
    queryKey: ['auth', 'login'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<LoginInfo>>('/auth/login');
      return data.data;
    },
  });
};

// 현재 인증 정보 조회
export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<AuthInfo>>('/auth/me');
      return data.data;
    },
    retry: false,
  });
};

// 로그아웃 (토큰 삭제)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};
