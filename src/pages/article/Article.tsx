import { useArticlePage } from '@/hooks/article/useArticlePage';
import { categoryDisplayName } from '@/types/article';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { ArticleDetailSkeleton } from '@/skeletons/article/ArticleDetailSkeleton';
import CommentSection from '@/components/comment/CommentSection';
import { ViewSpan } from '@/components/article/ViewSpan';
import { NotFound } from '@/pages/common/NotFound';
import LinkIcon from '@/assets/icons/link.svg?react';
import * as S from './Article.style';

const Article = () => {
  const { article, isLoading, isError, copied, handleCopyLink, handleTagClick } = useArticlePage();

  if (isLoading) {
    return (
      <S.ArticleWrapper>
        <ArticleDetailSkeleton />
      </S.ArticleWrapper>
    );
  }

  if (isError || !article) {
    return <NotFound />;
  }

  return (
    <S.ArticleWrapper>
      <S.ArticleHeader>
        <S.Title>{article.title}</S.Title>
        <S.Meta>
          <S.Authors>
            {article.authors.map((author, index) => (
              <span key={author.id}>
                <S.AuthorLink to={`/author/${author.id}`}>{author.name}</S.AuthorLink>
                {index < article.authors.length - 1 && ', '}
              </span>
            ))}
          </S.Authors>
          <S.Separator>·</S.Separator>
          <S.Date>{article.createdAt}</S.Date>
          <S.Separator>·</S.Separator>
          <ViewSpan views={article.views} />
        </S.Meta>
        <S.TagsRow>
          <S.CategoryTag>#{categoryDisplayName[article.category]}</S.CategoryTag>
          {article.tags.map((tag) => (
            <S.Tag key={tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </S.Tag>
          ))}
        </S.TagsRow>
      </S.ArticleHeader>

      <S.Content>
        <MarkdownRenderer content={article.content} />
      </S.Content>

      <S.ButtonRow>
        <S.BackToList to="/">
          <S.BackArrow>←</S.BackArrow>
          목록으로 돌아가기
        </S.BackToList>
        <S.ShareButton onClick={handleCopyLink} $copied={copied}>
          <LinkIcon />
          {copied ? '복사됨!' : '링크 복사'}
        </S.ShareButton>
      </S.ButtonRow>

      <CommentSection articleId={article.id} />
    </S.ArticleWrapper>
  );
};

export default Article;
