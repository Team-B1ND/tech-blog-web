import { useCommentSection } from '@/hooks/comment/useCommentSection';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import * as S from './CommentSection.style';

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const { comments, totalCount, isLoading, isCreating, handleAddComment, handleAddReply, mapComment } =
    useCommentSection(articleId);

  return (
    <S.Section>
      <S.SectionHeader>
        <S.SectionTitle>댓글</S.SectionTitle>
        <S.CommentCount>{totalCount}</S.CommentCount>
      </S.SectionHeader>

      <CommentForm onSubmit={handleAddComment} isSubmitting={isCreating} />

      {isLoading ? (
        <S.LoadingState>댓글을 불러오는 중...</S.LoadingState>
      ) : (
        <S.CommentList>
          {comments.length === 0 ? (
            <S.EmptyState>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</S.EmptyState>
          ) : (
            comments.map((comment) => <CommentItem key={comment.id} comment={mapComment(comment)} onReply={handleAddReply} />)
          )}
        </S.CommentList>
      )}
    </S.Section>
  );
};

export default CommentSection;
