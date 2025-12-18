import type { Author } from '../types/author';
import type { Article } from '../types/article';
import { articles } from './articles';

export const authors: Author[] = [
  {
    id: 'kim-dev',
    name: '김개발',
    bio: '프론트엔드 개발을 좋아하는 개발자입니다.',
    generation: 9,
  },
  {
    id: 'lee-front',
    name: '이프론트',
    bio: 'React와 TypeScript를 주로 다룹니다.',
    generation: 9,
  },
  {
    id: 'lee-infra',
    name: '이인프라',
    bio: '클라우드 인프라와 DevOps에 관심이 많습니다.',
    generation: 8,
  },
  {
    id: 'park-design',
    name: '박디자인',
    bio: 'UI/UX 디자인과 디자인 시스템을 연구합니다.',
    generation: 9,
  },
  {
    id: 'choi-ui',
    name: '최유아이',
    bio: '사용자 중심의 디자인을 추구합니다.',
    generation: 9,
  },
  {
    id: 'choi-type',
    name: '최타입',
    bio: 'TypeScript 마니아입니다.',
    generation: 8,
  },
  {
    id: 'jung-product',
    name: '정프로덕',
    bio: '데이터 기반의 프로덕트 매니징을 합니다.',
    generation: 8,
  },
  {
    id: 'han-research',
    name: '한리서치',
    bio: '사용자 리서치와 데이터 분석을 담당합니다.',
    generation: 9,
  },
  {
    id: 'kim-devops',
    name: '김데브옵스',
    bio: 'CI/CD와 자동화에 푹 빠져있습니다.',
    generation: 8,
  },
  {
    id: 'choi-backend',
    name: '최백엔드',
    bio: '백엔드 개발과 데이터베이스 최적화를 담당합니다.',
    generation: 9,
  },
];

const nameToIdMap: Record<string, string> = {};
authors.forEach(author => {
  nameToIdMap[author.name] = author.id;
});

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
};

export const getAuthorByName = (name: string): Author | undefined => {
  return authors.find(author => author.name === name);
};

export const getAuthorIdByName = (name: string): string | undefined => {
  return nameToIdMap[name];
};

export const getArticlesByAuthor = (authorName: string): Article[] => {
  return articles.filter(article => article.authors.some(a => a.name === authorName));
};
