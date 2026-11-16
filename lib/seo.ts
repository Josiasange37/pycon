import type { Metadata } from 'next';
import { SITE } from './site';

const SITE_ORIGIN = 'https://cm.pycon.org';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataInput): Metadata {
  const resolvedTitle = absoluteTitle ? title : `${title} · ${SITE.name} ${SITE.year}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: resolvedTitle,
      description,
      url: new URL(path, SITE_ORIGIN).toString(),
    },
  };
}
