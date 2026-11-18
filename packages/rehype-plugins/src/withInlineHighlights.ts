import { visit } from 'unist-util-visit';

const withInlineHighlights = () => (tree: any) => {
  visit(tree, 'element', (codeElement: any, _index, parent: any) => {
    if (!parent || parent.tagName !== 'pre' || codeElement.tagName !== 'code') {
      return;
    }

    const meta = String(codeElement.data?.meta || '');
    const metas = meta.match(/[^{}]+(?=})/g) || [];

    metas.forEach((attr: string) => {
      if (attr.includes(':')) {
        const [key, val] = attr.split(':');

        if (key.toLowerCase() === 'inlinehighlight' && val) {
          const [keyword, selected = '0', className = undefined] =
            val.split('|');

          const selectedIdx = (selected && selected.split(',')) || [];

          let idx = 0;
          visit(
            codeElement,
            'text',
            (textNode: any, index: number | undefined, parentNode: any) => {
              if (textNode.value === keyword && typeof index === 'number') {
                idx += 1;

                if (
                  selected !== '0' &&
                  selectedIdx.length > 0 &&
                  selectedIdx.indexOf(idx.toString()) === -1
                ) {
                  return;
                }

                parentNode.children[index] = {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['inline-highlight', className].filter(Boolean),
                  },
                  children: [textNode],
                };
              }
            }
          );
        }
      }
    });
  });
};

export default withInlineHighlights;
