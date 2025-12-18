export interface ArticleAuthor {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  authors: ArticleAuthor[];
  createdAt: string;
  content: string;
  category: Category;
  thumbnail: string;
  tags: string[];
  views: number;
}

export type Category = '전체' | '개발' | '인프라' | '디자인' | '프로덕트';

export const categories: Category[] = ['전체', '개발', '인프라', '디자인', '프로덕트'];

export type CategorySlug = '' | 'dev' | 'infra' | 'design' | 'product';

export const categorySlugMap: Record<CategorySlug, Category> = {
  '': '전체',
  'dev': '개발',
  'infra': '인프라',
  'design': '디자인',
  'product': '프로덕트',
};

export const categoryToSlugMap: Record<Category, CategorySlug> = {
  '전체': '',
  '개발': 'dev',
  '인프라': 'infra',
  '디자인': 'design',
  '프로덕트': 'product',
};
