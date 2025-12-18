export interface ArticleAuthor {
  id: string;
  name: string;
}

// 내부적으로 사용하는 카테고리 (API enum과 동일)
export type Category = 'ALL' | 'DEVELOPMENT' | 'INFRA' | 'DESIGN' | 'PRODUCT';

export const categories: Category[] = ['ALL', 'DEVELOPMENT', 'INFRA', 'DESIGN', 'PRODUCT'];

// UI에 표시할 때 사용하는 한글 이름
export const categoryDisplayName: Record<Category, string> = {
  'ALL': '전체',
  'DEVELOPMENT': '개발',
  'INFRA': '인프라',
  'DESIGN': '디자인',
  'PRODUCT': '프로덕트',
};

// URL slug 매핑
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
