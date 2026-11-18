import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import {
  JetBrains_Mono as JetBrainsMono,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';

import Provider from '@/providers';

import { getBaseUrl } from '@/helpers/url';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import '@/styles/main.css';

const jetbrainsMono = JetBrainsMono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

const plusJakartaSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Enji Kusnadi · Front-End Developer',
    template: '%s — Enji · Front-End Developer',
  },
  description:
    'An online portfolio featuring a showcase of my projects and some thoughts as a Front-End Developer who loves intuitive, clean and modern UI design.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={clsx(jetbrainsMono.variable, plusJakartaSans.variable)}
    >
      <body>
        <div id="skip-navigation" />
        <Provider>
          <div id="__root">{children}</div>
          <GoogleAnalytics gaId="G-FB9QLDNKNN" />
        </Provider>
      </body>
    </html>
  );
}
