// API 공통 응답 타입
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

// 페이지네이션
export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// API 카테고리 (백엔드 enum)
export type ApiCategory = 'DEVELOPMENT' | 'DESIGN' | 'PRODUCT' | 'INFRA';

// Article API 타입
export interface ApiArticleAuthor {
  id: string;
  name: string;
}

export interface ApiArticle {
  id: number;
  title: string;
  content: string;
  category: ApiCategory;
  thumbnail: string | null;
  views: number;
  authors: ApiArticleAuthor[];
  tags: ApiTag[];
  createdAt: string;
}

export interface ArticleListParams {
  category?: ApiCategory;
  page?: number;
  limit?: number;
}

export interface ArticleSearchParams {
  q: string;
  page?: number;
  limit?: number;
}

// Author API 타입
export interface ApiAuthor {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
  grade?: number;
  room?: number;
  number?: number;
  role?: string;
  activated?: boolean;
}

// Tag API 타입
export interface ApiTag {
  id: number;
  name: string;
}

// Comment API 타입
export interface ApiComment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  replies: ApiComment[];
}

export interface CommentCreateParams {
  author: string;
  content: string;
}

// Subscribe API 타입
export interface SubscribeParams {
  name: string;
  email: string;
}
