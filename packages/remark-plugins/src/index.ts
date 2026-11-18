import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

import withFrontMatter from './withFrontMatter';
import withLayout from './withLayout';
import withStrict from './withStrict';

import type { Preset } from 'unified';

const preset: Preset = {
  plugins: [
    remarkFrontMatter,
    remarkGfm,
    withFrontMatter,
    withStrict,
    withLayout,
  ],
};

export default preset;
