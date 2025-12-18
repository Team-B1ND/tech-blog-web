export interface ArticleAuthor {
  id: string;
  name: string;
}

export type Category = 'ALL' | 'DEVELOPMENT' | 'INFRA' | 'DESIGN' | 'PRODUCT';

export const categories: Category[] = ['ALL', 'DEVELOPMENT', 'INFRA', 'DESIGN', 'PRODUCT'];

export const categoryDisplayName: Record<Category, string> = {
  'ALL': '전체',
  'DEVELOPMENT': '개발',
  'INFRA': '인프라',
  'DESIGN': '디자인',
  'PRODUCT': '프로덕트',
};

export type CategorySlug = '' | 'dev' | 'infra' | 'design' | 'product';

export const slugToCategory: Record<CategorySlug, Category> = {
  '': 'ALL',
  'dev': 'DEVELOPMENT',
  'infra': 'INFRA',
  'design': 'DESIGN',
  'product': 'PRODUCT',
};

export const categoryToSlug: Record<Category, CategorySlug> = {
  'ALL': '',
  'DEVELOPMENT': 'dev',
  'INFRA': 'infra',
  'DESIGN': 'design',
  'PRODUCT': 'product',
};

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
