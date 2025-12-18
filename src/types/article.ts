export interface Article {
  id: string;
  title: string;
  authors: string[];
  createdAt: string;
  content: string;
  category: Category;
  thumbnail: string;
  tags: string[];
  views: number;
}

export type Category = '전체' | '개발' | '인프라' | '디자인' | '프로덕트';

export const categories: Category[] = ['전체', '개발', '인프라', '디자인', '프로덕트'];
