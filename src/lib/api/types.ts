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

export interface Pagination {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedResponse<T> {
  articles: T[];
  pagination: Pagination;
}

export type ApiCategory = 'DEVELOPMENT' | 'DESIGN' | 'PRODUCT' | 'INFRA';

// 글의 작성자 정보 (간략)
export interface ApiAuthorInfo {
  id: string;
  name: string;
}

// 글 응답
export interface ApiArticle {
  id: string;
  title: string;
  content: string;
  category: ApiCategory;
  thumbnail: string | null;
  views: number;
  authors: ApiAuthorInfo[];
  tags: string[];
  createdAt: string;
}

// 인기 글 응답
export interface ApiPopularArticle {
  id: string;
  title: string;
  views: number;
}

export interface ArticleListParams {
  category?: ApiCategory;
  page?: number;
  limit?: number;
}

export interface ArticleSearchParams {
  q: string;
  tag?: string;
  page?: number;
  limit?: number;
}

// 회원 응답
export interface ApiMember {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  generation?: number;
}

// 태그 응답
export interface ApiTag {
  tag: string;
  count: number;
}

// 댓글 응답
export interface ApiComment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  parentId?: string;
  replies: ApiComment[];
}

export interface CommentCreateParams {
  author: string;
  content: string;
}

export interface SubscribeParams {
  name: string;
  email: string;
}

// 인증 관련
export interface ApiAuthInfo {
  authenticated: boolean;
  memberId: string | null;
  name: string | null;
  role: string | null;
  activated: boolean;
  loginUrl: string;
}

export interface ApiLoginInfo {
  loginUrl: string;
  description: string;
}

export interface ApiTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ActivateRequest {
  secretKey: string;
}

export interface UpdateProfileRequest {
  bio?: string;
  generation?: number;
}
