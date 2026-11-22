import { Parser } from 'acorn';
import acornJsx from 'acorn-jsx';
import fm from 'front-matter';
import slug from 'slug';

const ParserWithJSX = Parser.extend(acornJsx());

const parse = (content: string) =>
  ParserWithJSX.parse(content, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  });

export const getFrontMatter = (content: string): Record<string, any> =>
  fm<Record<string, any>>(content).attributes;

export const addImport = (tree: any, name: string, location: string) => {
  const value = `import ${name} from '${location}';`;
  tree.children.unshift({
    type: 'mdxjsEsm',
    value,
    data: {
      estree: parse(value),
    },
  });
};

export const addContent = (tree: any, content: string) => {
  tree.children.push({
    type: 'mdxjsEsm',
    value: content,
    data: {
      estree: parse(content),
    },
  });
};

export const slugifyHeading = (text: string) => {
  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || slug(text);
};

export const getTableOfContents = (tree: any) => {
  const contents: Array<{ title: string; slug: string; depth: number }> = [];

  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex += 1) {
    const node = tree.children[nodeIndex];

    if (node.type === 'heading' && [2, 3].includes(node.depth)) {
      const depth = node.depth - 1;
      const title = node.children
        .filter((n: any) => n.type === 'text')
        .map((n: any) => n.value)
        .join('');

      contents.push({
        title,
        slug: slugifyHeading(title),
        depth,
      });
    }
  }

  return contents;
};
