import { z } from 'zod';

import { getFrontMatter } from './utils';

const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

const BaseFrontMatter = z.object({
  title: z.string().max(110),
  description: z.string().max(120),
  caption: z.string().default(''),
  layout: z.string().default('Post'),
});

const PostFrontMatter = z.object({
  date: z.string().regex(dateRegex, 'Date format MUST be YYYY-MM-DD'),
  lang: z.enum(['id', 'en', 'zh']),
  tags: z.array(z.string()).min(2).max(5),
  category: z.string(),
});

const ProjectFrontMatter = z.object({
  githubUrl: z.url().optional(),
  npmUrl: z.url().optional(),
  type: z.enum(['package']).default('package'),
});

const validate = <T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> => {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(JSON.stringify(err.issues, null, 2), { cause: err });
    }

    throw err;
  }
};

const withFrontMatter = () => (_tree: any, file: any) => {
  const data = getFrontMatter(String(file.value));

  if (Object.keys(data).length === 0) return;

  const base = validate(BaseFrontMatter, data);

  let frontMatter: Record<string, any>;

  switch (base.layout) {
    case 'Post': {
      const post = validate(PostFrontMatter, data);
      frontMatter = { ...base, ...post };
      break;
    }
    case 'Project': {
      const project = validate(ProjectFrontMatter, data);
      frontMatter = { ...base, ...project };
      break;
    }
    default: {
      frontMatter = base;
      break;
    }
  }

  file.data['front-matter'] = frontMatter;
};

export default withFrontMatter;
