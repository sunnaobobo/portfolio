import { getBaseUrl, getParams } from '@/helpers/url';

import type { TPageOgImage } from '@/types';

export const getPageOgImageUrl = ({
  caption,
  title,
  description,
}: TPageOgImage) => {
  const params = getParams({ caption, title, description });

  return {
    default: params
      ? `${getBaseUrl()}/api/og-page?${params}`
      : `${getBaseUrl()}/api/og-page`,
  };
};
