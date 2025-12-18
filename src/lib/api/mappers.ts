import type { Article, Category } from '@/types/article';
import type { ApiArticle } from './types';

// API Article → 프론트엔드 Article (카테고리는 그대로 사용)
export const mapApiArticle = (apiArticle: ApiArticle): Article => ({
  id: String(apiArticle.id),
  title: apiArticle.title,
  content: apiArticle.content,
  category: apiArticle.category as Category,
  thumbnail: apiArticle.thumbnail || '',
  views: apiArticle.views || 0,
  authors: (apiArticle.authors || []).map((a) => ({ id: a.id, name: a.name })),
  tags: (apiArticle.tags || []).map((t) => t.name),
  createdAt: apiArticle.createdAt?.split('T')[0] || '',
});

// API Article 배열 → 프론트엔드 Article 배열
export const mapApiArticles = (apiArticles: ApiArticle[] | undefined | null): Article[] =>
  (apiArticles || []).map(mapApiArticle);
