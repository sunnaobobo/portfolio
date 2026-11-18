import WithNavigationFooter from '@/components/layouts/WithNavigationFooter';

import type { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return <WithNavigationFooter>{children}</WithNavigationFooter>;
}
