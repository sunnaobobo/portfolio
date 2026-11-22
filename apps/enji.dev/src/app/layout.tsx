import clsx from 'clsx';
import {
  JetBrains_Mono as JetBrainsMono,
  Noto_Sans_SC as NotoSansSC,
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

const notoSansSC = NotoSansSC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: '孙靖 · AI 全栈开发工程师',
    template: '%s — 孙靖',
  },
  description:
    '孙靖（Sun Jing）的个人网站与技术博客，聚焦 AI 智能体（Agent）工程化、Spring 分布式架构与现代全栈开发实践。',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={clsx(
        jetbrainsMono.variable,
        plusJakartaSans.variable,
        notoSansSC.variable
      )}
    >
      <body>
        <div id="skip-navigation" />
        <Provider>
          <div id="__root">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
