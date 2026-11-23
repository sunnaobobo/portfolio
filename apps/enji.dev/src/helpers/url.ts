export const getBaseUrl = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return 'https://portfolio.sunnao.wtf';
    case 'preview':
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return `http://${process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'}`;
  }
};

export const getParams = (
  obj: Record<string, string | Array<string> | undefined>
) => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length > 0) {
        params.set(key, val.join(','));
      }
    } else if (val) {
      params.set(key, val);
    }
  });

  return params.toString();
};
