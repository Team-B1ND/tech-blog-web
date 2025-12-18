import type { ApiCategory } from '@/lib/api/types';

export const API_CATEGORIES: { label: string; value: ApiCategory }[] = [
  { label: '개발', value: 'DEVELOPMENT' },
  { label: '인프라', value: 'INFRA' },
  { label: '디자인', value: 'DESIGN' },
  { label: '프로덕트', value: 'PRODUCT' },
];
