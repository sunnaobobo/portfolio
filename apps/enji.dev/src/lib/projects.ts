import frontMatter from 'front-matter';
import fs from 'fs';
import path from 'path';

import type { TProjectFrontMatter } from '@/types';

const projectsDirectory = path.join(process.cwd(), 'src/app/(main)/projects');

export const getProjectSlugs = () => {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true });

  return entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(projectsDirectory, entry.name, 'page.mdx'))
    )
    .map((entry) => entry.name);
};

export const getProjectFrontMatter = (slug: string): TProjectFrontMatter => {
  const fullPath = path.join(projectsDirectory, slug, 'page.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { attributes } = frontMatter<TProjectFrontMatter>(fileContents);

  return attributes;
};

export const getSortedProjects = () => {
  const slugs = getProjectSlugs();

  const allProjectsData = slugs.map((slug) => {
    const data = getProjectFrontMatter(slug);

    return {
      slug,
      frontMatter: data,
    };
  });

  return allProjectsData.sort(
    ({ frontMatter: { order: a = 99 } }, { frontMatter: { order: b = 99 } }) =>
      a - b
  );
};
