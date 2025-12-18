import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPopularArticles, getAllTags } from '../../data/articles.ts';
import { useSearch } from '../../contexts/SearchContext.tsx';
import {ViewSpan} from "../article/ViewSpan.tsx";

export const Sidebar = () => {
  const popularArticles = getPopularArticles(5);
  const tags = getAllTags();
  const { openSearch } = useSearch();

  return (
    <SidebarWrapper>
      <Section>
        <SectionTitle>지금 인기 글</SectionTitle>
        <PopularList>
          {popularArticles.map((article) => (
            <PopularItem key={article.id} to={`/article/${article.id}`}>
              <PopularContent>
                <PopularTitle>{article.title}</PopularTitle>
	              <ViewSpan views={article.views}/>
              </PopularContent>
            </PopularItem>
          ))}
        </PopularList>
      </Section>

      <Section>
        <SectionTitle>태그</SectionTitle>
        <TagList>
          {tags.map(({ tag, count }) => (
            <Tag key={tag} onClick={() => openSearch(`tag:${tag}`)}>
              {tag}
              <TagCount>{count}</TagCount>
            </Tag>
          ))}
        </TagList>
      </Section>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PopularItem = styled(Link)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const PopularContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const PopularTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const TagCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};

  ${Tag}:hover & {
    color: rgba(255, 255, 255, 0.8);
  }
`;
