import rehypePrismPlus from 'rehype-prism-plus';

import withCodeAttributes from './withCodeAttributes';
import withInlineHighlights from './withInlineHighlights';

import type { Preset } from 'unified';

const preset: Preset = {
  plugins: [rehypePrismPlus, withInlineHighlights, withCodeAttributes],
};

export default preset;
