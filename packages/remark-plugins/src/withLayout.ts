import { addContent, addImport, getTableOfContents } from './utils';

const withLayout = () => (tree: any, file: any) => {
  const data = file.data['front-matter'] || {};

  if (Object.keys(data).length === 0) return;

  const { layout, ...frontMatter } = file.data['front-matter'];
  const tableOfContents = getTableOfContents(tree);

  // import front-matter specified layout and App Router metadata helper
  addImport(tree, layout, `@/contents-layouts/${layout}`);
  addImport(tree, '{ buildMdxMetadata }', '@/helpers/metadata');

  // export Next.js App Router metadata
  addContent(
    tree,
    `export const metadata = buildMdxMetadata(${JSON.stringify({
      layout,
      ...frontMatter,
    })});`
  );

  // export MDX layout wrapper
  addContent(
    tree,
    `export default ({ children }) => (
      <${layout}
        frontMatter={${JSON.stringify(frontMatter)}}
        tableOfContents={${JSON.stringify(tableOfContents)}}
      >
        {children}
      </${layout}>
     )`
  );
};

export default withLayout;
