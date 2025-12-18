import { useSidebar } from '@/hooks/sidebar/useSidebar';
import { ViewSpan } from '@/components/article/ViewSpan';
import { PopularSkeleton } from '@/skeleton/sidebar/PopularSkeleton';
import { TagsSkeleton } from '@/skeleton/sidebar/TagsSkeleton';
import * as S from './Sidebar.style';

export const Sidebar = () => {
  const { popularArticles, popularLoading, tags, tagsLoading, handleTagClick } = useSidebar();

  return (
    <S.SidebarWrapper>
      <S.Section>
        <S.SectionTitle>지금 인기 글</S.SectionTitle>
        {popularLoading ? (
          <PopularSkeleton />
        ) : popularArticles.length === 0 ? (
          <S.EmptyText>인기 글이 없습니다</S.EmptyText>
        ) : (
          <S.PopularList>
            {popularArticles.map((article) => (
              <S.PopularItem key={article.id} to={`/article/${article.id}`}>
                <S.PopularContent>
                  <S.PopularTitle>{article.title}</S.PopularTitle>
                  <ViewSpan views={article.views} />
                </S.PopularContent>
              </S.PopularItem>
            ))}
          </S.PopularList>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>태그</S.SectionTitle>
        {tagsLoading ? (
          <TagsSkeleton />
        ) : tags.length === 0 ? (
          <S.EmptyText>태그가 없습니다</S.EmptyText>
        ) : (
          <S.TagList>
            {tags.map((tag) => (
              <S.Tag key={tag.id} onClick={() => handleTagClick(tag.name)}>
                {tag.name}
              </S.Tag>
            ))}
          </S.TagList>
        )}
      </S.Section>
    </S.SidebarWrapper>
  );
};
