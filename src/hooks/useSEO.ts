import { useEffect } from 'react';

export interface SEOOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function useSEO(options: SEOOptions) {
  const {
    title,
    description,
    canonicalPath,
    ogType = 'website',
    ogImage,
    noIndex = false,
    structuredData,
  } = options;

  useEffect(() => {
    const baseUrl = window.location.origin;
    const path = canonicalPath || window.location.pathname;
    const canonical = `${baseUrl}${path}`;
    const lang = document.documentElement.lang || 'en';

    // Update document title
    const fullTitle = title.includes('Ahmed Magdy Anwar')
      ? title
      : `${title} | Ahmed Magdy Anwar`;
    document.title = fullTitle;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.setAttribute('content', description);

    // Update robots
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      'content',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Update OG tags
    const ogTags: { property: string; content: string }[] = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description || '' },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical },
      { property: 'og:locale', content: lang === 'ar' ? 'ar_EG' : 'en_US' },
    ];

    if (ogImage) {
      ogTags.push({ property: 'og:image', content: ogImage });
    }

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Update Twitter tags
    const twitterTags: { name: string; content: string }[] = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description || '' },
    ];

    if (ogImage) {
      twitterTags.push({ name: 'twitter:image', content: ogImage });
    }

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Update Last-Modified
    let lastMod = document.querySelector('meta[name="last-modified"]') as HTMLMetaElement | null;
    if (!lastMod) {
      lastMod = document.createElement('meta');
      lastMod.setAttribute('name', 'last-modified');
      document.head.appendChild(lastMod);
    }
    lastMod.setAttribute('content', new Date().toISOString().split('T')[0]);

    // Update language meta
    let metaLang = document.querySelector('meta[name="language"]') as HTMLMetaElement | null;
    if (!metaLang) {
      metaLang = document.createElement('meta');
      metaLang.setAttribute('name', 'language');
      document.head.appendChild(metaLang);
    }
    metaLang.setAttribute('content', lang === 'ar' ? 'Arabic' : 'English');

    // Add/Update structured data
    const existingScripts = document.querySelectorAll('script[id^="seo-structured-data"]');
    existingScripts.forEach((s) => s.remove());

    if (structuredData) {
      const schemas = Array.isArray(structuredData)
        ? structuredData
        : [structuredData];
      schemas.forEach((schema, index) => {
        const script = document.createElement('script');
        script.id = `seo-structured-data-${index}`;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          ...schema,
        });
        document.head.appendChild(script);
      });
    }

    // Update hreflang links
    const hreflangs = [
      { lang: 'en', href: `${baseUrl}${path}` },
      { lang: 'ar', href: `${baseUrl}${path}` },
      { lang: 'x-default', href: `${baseUrl}${path}` },
    ];

    hreflangs.forEach(({ lang: hrefLang, href }) => {
      let link = document.querySelector(
        `link[rel="alternate"][hreflang="${hrefLang}"]`
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hrefLang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    });

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[id^="seo-structured-data"]');
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, ogType, ogImage, noIndex, structuredData]);
}