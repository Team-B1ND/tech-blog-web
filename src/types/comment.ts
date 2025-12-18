export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  replies: Comment[];
}

export interface CommentInput {
  author: string;
  content: string;
}
