import { visit } from 'unist-util-visit';

const withCodeAttributes = () => (tree: any) => {
  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'pre') {
      const attributes: Record<string, string | number> = {};

      const firstNode = node.children?.[0];

      if (firstNode && firstNode.tagName === 'code') {
        const linesCount = firstNode.children?.length ?? 0;
        if (linesCount) {
          attributes.lines = linesCount;
        }

        const classNames = Array.isArray(node.properties?.className)
          ? node.properties.className
          : [];
        const lang = String(classNames[0] ?? '').replace('language-', '');
        if (lang) {
          attributes.language = lang;
        }

        const meta = String(firstNode.data?.meta || '');
        const metas = meta.match(/[^{}]+(?=})/g) || [];

        metas.forEach((attr: string) => {
          if (attr.includes(':')) {
            const [key, val] = attr.split(':');
            if (key && typeof val !== 'undefined') {
              attributes[key] = val;
            }
          }
        });

        node.properties = node.properties || {};
        Object.keys(attributes).forEach((key) => {
          node.properties[`data-${key}`] = attributes[key];
        });
      }
    }
  });
};

export default withCodeAttributes;
