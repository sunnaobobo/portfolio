import { isValidElement } from 'react';
import slug from 'slug';

import { NpmIcon, PnpmIcon, YarnIcon } from '@/components/Icons';
import {
  CssIcon,
  FileIcon,
  HtmlIcon,
  JavaScriptIcon,
  NpmFileIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from '@/components/IconsFile';

import type { ReactElement, ReactNode } from 'react';

export const getNodeText = (children: ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getNodeText).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getNodeText(children.props.children);
  }

  return '';
};

export const getSlug = (children: ReactNode) => {
  const text = getNodeText(children);

  if (!text) return '';

  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || slug(text);
};

export const urlType = (url: string) => {
  if (['/'].includes(url[0])) {
    return 'internal';
  }

  if (['#'].includes(url[0])) {
    return 'hash';
  }

  if (url.indexOf('mailto') === 0) {
    return 'mail';
  }

  return 'external';
};

export const formatLang = (
  lang: string,
  title?: string
): {
  language: string;
  icon: ReactElement;
} => {
  let language = lang;
  let icon = <FileIcon />;

  switch (lang) {
    case 'js':
    case 'javascript':
      language = 'JavaScript';
      icon = <JavaScriptIcon />;
      break;
    case 'ts':
    case 'typescript':
      language = 'TypeScript';
      icon = <TypeScriptIcon />;
      break;
    case 'jsx':
      language = 'JavaScript React';
      icon = <ReactIcon />;
      break;
    case 'tsx':
      language = 'TypeScript React';
      icon = <ReactIcon />;
      break;
    case 'html':
      language = 'HTML';
      icon = <HtmlIcon />;
      break;
    case 'css':
      language = 'CSS';
      icon = <CssIcon />;
      break;
    case 'bash':
    case 'cmd':
      language = 'Terminal';
      break;
    case 'json':
      language = 'JSON';
      break;
    case '':
      language = 'Plain Text';
      break;
    default:
      break;
  }

  switch (title) {
    case 'tailwind.config.js':
      icon = <TailwindIcon />;
      break;
    case 'package.json':
      icon = <NpmFileIcon />;
      break;
    case 'npm':
      icon = <NpmIcon />;
      break;
    case 'pnpm':
      icon = <PnpmIcon />;
      break;
    case 'yarn':
      icon = <YarnIcon />;
      break;
    default:
      break;
  }

  return { language, icon };
};
