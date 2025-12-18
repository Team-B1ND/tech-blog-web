import * as S from '@/pages/article/Article.style';

export const ArticleDetailSkeleton = () => (
  <>
    <S.ArticleHeader>
      <S.SkeletonTitle />
      <S.SkeletonTitleSecond />
      <S.Meta>
        <S.SkeletonMeta $width={80} />
        <S.SkeletonMeta $width={100} />
        <S.SkeletonMeta $width={60} />
      </S.Meta>
      <S.TagsRow>
        <S.SkeletonTag $width={70} />
        <S.SkeletonTag $width={50} />
        <S.SkeletonTag $width={60} />
      </S.TagsRow>
    </S.ArticleHeader>
    <S.SkeletonContent>
      <S.SkeletonParagraph />
      <S.SkeletonParagraph $width="95%" />
      <S.SkeletonParagraph $width="88%" />
      <S.SkeletonParagraph $width="92%" />
      <S.SkeletonParagraph $width="70%" />
      <S.SkeletonHeading />
      <S.SkeletonParagraph />
      <S.SkeletonParagraph $width="85%" />
      <S.SkeletonParagraph $width="90%" />
      <S.SkeletonParagraph $width="60%" />
    </S.SkeletonContent>
  </>
);
