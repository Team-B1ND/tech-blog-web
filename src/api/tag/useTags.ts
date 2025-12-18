import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client.ts';
import type { ApiResponse, ApiTag } from '@/lib/api/types.ts';

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ApiTag[]>>('/tags');
      return data.data;
    },
  });
};
