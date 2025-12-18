import type { Article } from '../types/article';

export const articles: Article[] = [
  {
    id: '1',
    title: 'React 19에서 달라진 것들: use() 훅과 서버 컴포넌트',
    authors: ['김개발', '이프론트'],
    createdAt: '2024.12.15',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    tags: ['React', 'Frontend', 'JavaScript'],
    views: 1520,
    content: `# React 19에서 달라진 것들

React 19가 드디어 정식 출시되었습니다. 이번 버전에서는 **서버 컴포넌트**, **use() 훅**, 그리고 다양한 성능 개선이 포함되어 있습니다.

![React 19](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop)

## 주요 변경사항

### 1. use() 훅

\`use()\` 훅은 Promise나 Context를 직접 읽을 수 있게 해주는 새로운 API입니다.

\`\`\`tsx
import { use } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

> **Note:** \`use()\`는 조건문이나 반복문 안에서도 호출할 수 있다는 점에서 기존 훅들과 다릅니다.

### 2. 서버 컴포넌트

서버 컴포넌트를 통해 서버에서 렌더링되는 컴포넌트를 작성할 수 있습니다.

![Server Components](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

\`\`\`tsx
// 서버 컴포넌트 (기본값)
async function BlogPost({ id }) {
  const post = await db.posts.get(id);
  return <article>{post.content}</article>;
}

// 클라이언트 컴포넌트
'use client';
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>{likes}</button>;
}
\`\`\`

## 성능 비교

| 항목 | React 18 | React 19 | 개선율 |
|------|----------|----------|--------|
| 초기 로딩 | 2.3s | 1.2s | 48% |
| TTI | 3.1s | 1.8s | 42% |
| 번들 크기 | 142KB | 128KB | 10% |

---

## 마이그레이션 체크리스트

다음 항목들을 확인하면서 마이그레이션을 진행하세요:

1. **의존성 업데이트**
   - \`react\`와 \`react-dom\`을 19.0으로 업그레이드
   - \`@types/react\` 업데이트

2. **Deprecated API 교체**
   - \`ReactDOM.render\` → \`createRoot\`
   - \`componentWillMount\` 등 Legacy Lifecycle 제거

3. **새 기능 도입** *(선택사항)*
   - 서버 컴포넌트 적용
   - \`use()\` 훅 활용

더 자세한 내용은 [공식 문서](https://react.dev)를 참고하세요.`,
  },
  {
    id: '2',
    title: 'Kubernetes 클러스터 최적화: 비용을 50% 절감한 방법',
    authors: ['이인프라'],
    createdAt: '2024.12.12',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop',
    tags: ['Kubernetes', 'DevOps', 'Cloud'],
    views: 2340,
    content: `# Kubernetes 클러스터 최적화

인프라 비용은 스타트업에게 항상 중요한 이슈입니다. 이번 글에서는 우리 팀이 Kubernetes 클러스터 비용을 50% 절감한 방법을 공유합니다.

## 문제 상황

기존 클러스터 구성에서 여러 문제점이 발견되었습니다:

- 리소스 요청량이 실제 사용량보다 과다 설정됨
- 노드 자동 스케일링 설정 미흡
- 불필요한 워크로드 상시 실행

## 최적화 전략

### 1. 리소스 요청량 조정

기존 설정과 최적화 후 설정을 비교하면 다음과 같습니다:

| 항목 | 기존 | 최적화 후 | 절감율 |
|------|------|----------|--------|
| CPU Request | 4 cores | 1 core | 75% |
| Memory Request | 8Gi | 2Gi | 75% |
| 월 비용 | $2,400 | $1,200 | 50% |

### 2. HPA 설정

다음과 같이 HPA(Horizontal Pod Autoscaler)를 설정했습니다:

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-server
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

### 3. 노드 풀 최적화

Spot 인스턴스를 활용한 노드 풀 구성:

\`\`\`bash
gcloud container node-pools create spot-pool \\
  --cluster=production \\
  --spot \\
  --num-nodes=3 \\
  --enable-autoscaling \\
  --min-nodes=1 \\
  --max-nodes=10
\`\`\`

## 결과

최적화 적용 후 월간 인프라 비용이 **$2,400에서 $1,200으로 50% 절감**되었습니다.

> 중요한 것은 비용 절감과 함께 서비스 안정성도 유지해야 한다는 점입니다.

다음 글에서는 모니터링 시스템 구축에 대해 다루겠습니다.`,
  },
  {
    id: '3',
    title: '디자인 시스템 구축기: 일관된 사용자 경험을 위한 여정',
    authors: ['박디자인', '최유아이'],
    createdAt: '2024.12.10',
    category: '디자인',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    tags: ['Design System', 'UI/UX', 'Figma'],
    views: 890,
    content: `# 디자인 시스템 구축기

일관된 사용자 경험은 좋은 제품의 핵심입니다. 이번 글에서는 우리 팀이 디자인 시스템을 구축한 경험을 공유합니다.

## 왜 디자인 시스템인가?

프로젝트가 커지면서 \`Button\`, \`Input\`, \`Modal\` 같은 컴포넌트들이 제각각으로 만들어지기 시작했습니다. 같은 버튼인데 \`padding\`이 다르고, \`border-radius\`가 다른 상황이 발생했죠.

> 디자인 시스템은 단순한 컴포넌트 라이브러리가 아닙니다. 팀 전체가 공유하는 **디자인 언어**입니다.

## 토큰 시스템 설계

가장 먼저 **디자인 토큰**을 정의했습니다. 토큰은 색상, 간격, 타이포그래피 등의 기본 값을 의미합니다.

### 색상 토큰

\`primary\`, \`secondary\`, \`success\`, \`error\` 등 의미 기반으로 색상을 정의했습니다.

| 토큰명 | 값 | 용도 |
|--------|-----|------|
| \`color.primary\` | #0083F0 | 주요 액션 |
| \`color.secondary\` | #6B7280 | 보조 요소 |
| \`color.success\` | #10B981 | 성공 상태 |
| \`color.error\` | #EF4444 | 에러 상태 |

### 간격 토큰

간격은 \`4px\` 기준으로 배수를 사용합니다: \`spacing.xs\`는 4px, \`spacing.sm\`은 8px, \`spacing.md\`는 16px입니다.

## 컴포넌트 구현

React와 \`styled-components\`를 사용해서 컴포넌트를 구현했습니다.

\`\`\`tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = ({ variant, size, children }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size}>
      {children}
    </StyledButton>
  );
};
\`\`\`

\`$variant\`와 \`$size\` props를 통해 다양한 스타일 변형을 지원합니다. styled-components에서 \`$\` 접두사는 DOM에 전달되지 않는 transient props를 의미합니다.

## 문서화

Storybook을 사용해서 각 컴포넌트를 문서화했습니다. \`npm run storybook\` 명령어로 실행할 수 있습니다.

---

디자인 시스템 구축은 끝이 아닌 시작입니다. 지속적인 관리와 업데이트가 필요합니다.`,
  },
  {
    id: '4',
    title: 'TypeScript 5.0: 새로운 기능과 마이그레이션 가이드',
    authors: ['최타입'],
    createdAt: '2024.12.08',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Frontend'],
    views: 3120,
    content: `# TypeScript 5.0\n\nTypeScript 5.0이 출시되면서 많은 새로운 기능들이 추가되었습니다.`,
  },
  {
    id: '5',
    title: '사용자 리서치로 제품 방향성 찾기',
    authors: ['정프로덕', '한리서치'],
    createdAt: '2024.12.05',
    category: '프로덕트',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    tags: ['UX Research', 'Product', 'Data'],
    views: 670,
    content: `# 사용자 리서치로 제품 방향성 찾기\n\n좋은 제품을 만들기 위해서는 사용자를 깊이 이해해야 합니다.`,
  },
  {
    id: '6',
    title: 'GitHub Actions로 CI/CD 파이프라인 구축하기',
    authors: ['이인프라', '김데브옵스'],
    createdAt: '2024.12.01',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps'],
    views: 1890,
    content: `# GitHub Actions로 CI/CD 파이프라인 구축하기\n\n배포 자동화는 개발 생산성을 크게 높여줍니다.`,
  },
  {
    id: '7',
    title: 'Next.js 14 App Router 완벽 가이드',
    authors: ['김개발'],
    createdAt: '2024.11.28',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    tags: ['Next.js', 'React', 'Frontend'],
    views: 2780,
    content: `# Next.js 14 App Router 완벽 가이드\n\nNext.js 14의 App Router는 React 서버 컴포넌트를 기반으로 한 새로운 라우팅 시스템입니다.`,
  },
  {
    id: '8',
    title: 'Figma 플러그인 개발기: 디자인 워크플로우 자동화',
    authors: ['박디자인'],
    createdAt: '2024.11.25',
    category: '디자인',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
    tags: ['Figma', 'Plugin', 'Design'],
    views: 560,
    content: `# Figma 플러그인 개발기\n\n반복적인 디자인 작업을 자동화하기 위해 Figma 플러그인을 개발했습니다.`,
  },
  {
    id: '9',
    title: 'PostgreSQL 성능 튜닝: 쿼리 최적화 실전 가이드',
    authors: ['최백엔드'],
    createdAt: '2024.11.22',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
    tags: ['PostgreSQL', 'Database', 'Backend'],
    views: 1340,
    content: `# PostgreSQL 성능 튜닝\n\n데이터베이스 성능은 서비스 전체 성능에 큰 영향을 미칩니다.`,
  },
  {
    id: '10',
    title: 'AWS Lambda와 API Gateway로 서버리스 API 구축하기',
    authors: ['이인프라'],
    createdAt: '2024.11.20',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    tags: ['AWS', 'Serverless', 'Lambda'],
    views: 980,
    content: `# 서버리스 API 구축하기\n\n서버리스 아키텍처는 인프라 관리 부담을 줄이고 비용을 최적화할 수 있습니다.`,
  },
  {
    id: '11',
    title: '모바일 앱 접근성 개선: 모두를 위한 디자인',
    authors: ['최유아이', '박디자인'],
    createdAt: '2024.11.18',
    category: '디자인',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    tags: ['Accessibility', 'Mobile', 'UI/UX'],
    views: 450,
    content: `# 모바일 앱 접근성 개선\n\n접근성은 선택이 아닌 필수입니다.`,
  },
  {
    id: '12',
    title: 'GraphQL vs REST: 우리 팀의 선택과 이유',
    authors: ['김개발', '최백엔드'],
    createdAt: '2024.11.15',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    tags: ['GraphQL', 'REST', 'API'],
    views: 1670,
    content: `# GraphQL vs REST\n\nAPI 설계 방식을 선택할 때 고려해야 할 점들을 정리했습니다.`,
  },
  {
    id: '13',
    title: 'Docker 멀티스테이지 빌드로 이미지 크기 줄이기',
    authors: ['김데브옵스'],
    createdAt: '2024.11.12',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop',
    tags: ['Docker', 'DevOps', 'Container'],
    views: 1120,
    content: `# Docker 멀티스테이지 빌드\n\nDocker 이미지 크기를 줄이면 배포 속도가 빨라지고 저장 비용을 절감할 수 있습니다.`,
  },
  {
    id: '14',
    title: 'A/B 테스트 설계와 분석: 데이터 기반 의사결정',
    authors: ['정프로덕', '한리서치'],
    createdAt: '2024.11.10',
    category: '프로덕트',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['A/B Test', 'Data', 'Product'],
    views: 890,
    content: `# A/B 테스트 설계와 분석\n\n데이터 기반 의사결정을 위한 A/B 테스트 방법론을 공유합니다.`,
  },
  {
    id: '15',
    title: 'Zustand로 상태 관리 간소화하기',
    authors: ['이프론트'],
    createdAt: '2024.11.08',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
    tags: ['Zustand', 'React', 'State Management'],
    views: 2100,
    content: `# Zustand로 상태 관리 간소화하기\n\nRedux의 복잡함 없이 간단하게 전역 상태를 관리할 수 있습니다.`,
  },
  {
    id: '16',
    title: '모노레포 구축기: Turborepo 도입 경험',
    authors: ['김개발', '김데브옵스'],
    createdAt: '2024.11.05',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    tags: ['Monorepo', 'Turborepo', 'DevOps'],
    views: 760,
    content: `# 모노레포 구축기\n\n여러 프로젝트를 하나의 저장소에서 관리하면서 얻은 경험을 공유합니다.`,
  },
  {
    id: '17',
    title: 'Terraform으로 인프라 코드화하기',
    authors: ['이인프라'],
    createdAt: '2024.11.02',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    tags: ['Terraform', 'IaC', 'Cloud'],
    views: 1450,
    content: `# Terraform으로 인프라 코드화하기\n\nInfrastructure as Code로 인프라를 버전 관리하고 재현 가능하게 만들 수 있습니다.`,
  },
  {
    id: '18',
    title: '사용자 온보딩 개선으로 전환율 30% 상승',
    authors: ['정프로덕'],
    createdAt: '2024.10.30',
    category: '프로덕트',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    tags: ['Onboarding', 'Conversion', 'Product'],
    views: 1230,
    content: `# 사용자 온보딩 개선\n\n온보딩 과정의 개선으로 신규 사용자 전환율을 크게 높일 수 있었습니다.`,
  },
  {
    id: '19',
    title: 'CSS-in-JS 성능 최적화: styled-components 팁',
    authors: ['이프론트', '박디자인'],
    createdAt: '2024.10.28',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop',
    tags: ['CSS-in-JS', 'styled-components', 'Performance'],
    views: 680,
    content: `# CSS-in-JS 성능 최적화\n\nstyled-components를 사용할 때 성능을 개선하는 방법들을 정리했습니다.`,
  },
  {
    id: '20',
    title: 'Redis 캐싱 전략: 실전 적용 가이드',
    authors: ['최백엔드'],
    createdAt: '2024.10.25',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    tags: ['Redis', 'Cache', 'Backend'],
    views: 1890,
    content: `# Redis 캐싱 전략\n\n적절한 캐싱은 서비스 성능을 크게 향상시킬 수 있습니다.`,
  },
  {
    id: '21',
    title: 'Prometheus와 Grafana로 모니터링 시스템 구축',
    authors: ['김데브옵스', '이인프라'],
    createdAt: '2024.10.22',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Monitoring', 'Prometheus', 'Grafana'],
    views: 1560,
    content: `# 모니터링 시스템 구축\n\n서비스 안정성을 위한 모니터링 시스템 구축 경험을 공유합니다.`,
  },
  {
    id: '22',
    title: 'React Query로 서버 상태 관리하기',
    authors: ['김개발'],
    createdAt: '2024.10.20',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    tags: ['React Query', 'React', 'State Management'],
    views: 2450,
    content: `# React Query로 서버 상태 관리하기\n\n서버 상태와 클라이언트 상태를 분리하여 관리하는 방법을 알아봅니다.`,
  },
  {
    id: '23',
    title: '디자인 토큰 시스템 구축하기',
    authors: ['박디자인'],
    createdAt: '2024.10.18',
    category: '디자인',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    tags: ['Design Token', 'Design System', 'Figma'],
    views: 340,
    content: `# 디자인 토큰 시스템 구축하기\n\n디자인과 개발 간의 일관성을 유지하기 위한 토큰 시스템을 구축했습니다.`,
  },
  {
    id: '24',
    title: 'Jest에서 Vitest로 마이그레이션하기',
    authors: ['이프론트'],
    createdAt: '2024.10.15',
    category: '개발',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    tags: ['Vitest', 'Testing', 'Frontend'],
    views: 920,
    content: `# Jest에서 Vitest로 마이그레이션하기\n\nVite 기반 프로젝트에서 Vitest를 사용하면 더 빠른 테스트가 가능합니다.`,
  },
  {
    id: '25',
    title: 'EKS 클러스터 운영 노하우',
    authors: ['이인프라', '김데브옵스'],
    createdAt: '2024.10.12',
    category: '인프라',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop',
    tags: ['EKS', 'Kubernetes', 'AWS'],
    views: 1780,
    content: `# EKS 클러스터 운영 노하우\n\nAWS EKS를 운영하면서 얻은 경험과 팁을 공유합니다.`,
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};

export const getArticlesByCategory = (category: string): Article[] => {
  if (category === '전체') return articles;
  return articles.filter((article) => article.category === category);
};

export const getArticlesPaginated = (
  category: string,
  page: number,
  perPage: number
): { articles: Article[]; totalPages: number; totalCount: number } => {
  const filtered = getArticlesByCategory(category);
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    articles: filtered.slice(start, end),
    totalPages,
    totalCount,
  };
};

export const getPopularArticles = (count: number = 5): Article[] => {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, count);
};

export const getAllTags = (): { tag: string; count: number }[] => {
  const tagCount: Record<string, number> = {};
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};
