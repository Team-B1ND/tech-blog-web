import { useAuthorPage } from '@/hooks/author/useAuthorPage';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Pagination } from '@/components/common/Pagination';
import { NotFound } from '@/pages/common/NotFound';
import * as S from './Author.style';

export const Author = () => {
  const {
    id,
    member,
    memberLoading,
    memberError,
    articlesLoading,
    isOwnProfile,
    articles,
    currentPage,
    totalCount,
    totalPages,
    logout,
  } = useAuthorPage();

  if (memberLoading) {
    return (
      <S.Container>
        <S.LoadingState>회원 정보를 불러오는 중...</S.LoadingState>
      </S.Container>
    );
  }

  if (memberError || !member) {
    return <NotFound />;
  }

  return (
    <S.Container>
      <S.AuthorHeader>
        <S.NameRow>
          {member.generation && <S.Generation>{member.generation}기</S.Generation>}
          <S.Name>{member.name}</S.Name>
        </S.NameRow>
        {member.bio && <S.Bio>{member.bio}</S.Bio>}
        {isOwnProfile && (
          <S.ButtonRow>
            <S.EditProfileButton to="/dashboard/profile">내 정보 수정</S.EditProfileButton>
            <S.LogoutButton onClick={logout}>로그아웃</S.LogoutButton>
          </S.ButtonRow>
        )}
      </S.AuthorHeader>

      <S.ArticlesSection>
        <S.SectionTitle>작성한 글 ({totalCount})</S.SectionTitle>
        {articlesLoading ? (
          <S.LoadingState>글을 불러오는 중...</S.LoadingState>
        ) : articles.length === 0 ? (
          <S.EmptyState>작성한 글이 없습니다.</S.EmptyState>
        ) : (
          <>
            <S.ArticleGrid>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="block" />
              ))}
            </S.ArticleGrid>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/author/${id}`} />}
          </>
        )}
      </S.ArticlesSection>
    </S.Container>
  );
};
