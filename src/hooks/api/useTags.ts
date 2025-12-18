import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { ApiResponse, ApiTag } from '@/lib/api/types';

// 태그 목록 조회
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiTag[]>>('/tags');
      return data.data;
    },
  });
};
