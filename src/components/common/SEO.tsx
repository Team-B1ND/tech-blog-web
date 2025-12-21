import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'B1ND Tech';
const SITE_URL = 'https://tech.b1nd.com';
const DEFAULT_DESCRIPTION = 'B1ND의 기술 블로그 - 우리 팀이 겪은 기술적 도전과 해결 과정을 공유합니다';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    authors?: string[];
    publishedTime?: string;
    tags?: string[];
  };
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  article,
}: SEOProps) => {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.authors?.map((author, index) => (
            <meta key={index} property="article:author" content={author} />
          ))}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD Structured Data */}
      {type === 'article' && article && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: image,
            url: url,
            datePublished: article.publishedTime,
            author: article.authors?.map((name) => ({
              '@type': 'Person',
              name,
            })),
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/favicon.svg`,
              },
            },
          })}
        </script>
      )}
    </Helmet>
  );
};
