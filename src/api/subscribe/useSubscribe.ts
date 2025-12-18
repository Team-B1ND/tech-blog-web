import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client.ts';
import type { ApiResponse, SubscribeParams } from '@/lib/api/types.ts';

export const useSubscribe = () => {
  return useMutation({
    mutationFn: async (params: SubscribeParams) => {
      const { data } = await apiClient.post<ApiResponse<null>>('/subscribe', params);
      return data;
    },
  });
};
