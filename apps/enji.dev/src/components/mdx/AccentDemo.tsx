'use client';

import clsx from 'clsx';
import { useState } from 'react';

const DEMO_ACCENT_CSS = `
  [data-accent='red'] {
    --accent-50: rgb(254 242 242);
    --accent-100: rgb(254 226 226);
    --accent-200: rgb(254 202 202);
    --accent-300: rgb(252 165 165);
    --accent-400: rgb(248 113 113);
    --accent-500: rgb(239 68 68);
    --accent-600: rgb(220 38 38);
    --accent-700: rgb(185 28 28);
    --accent-800: rgb(153 27 27);
    --accent-900: rgb(127 29 29);
    --accent-950: rgb(69 10 10);
  }

  [data-accent='orange'] {
    --accent-50: rgb(255 247 237);
    --accent-100: rgb(255 237 213);
    --accent-200: rgb(254 215 170);
    --accent-300: rgb(253 186 116);
    --accent-400: rgb(251 146 60);
    --accent-500: rgb(249 115 22);
    --accent-600: rgb(234 88 12);
    --accent-700: rgb(194 65 12);
    --accent-800: rgb(154 52 18);
    --accent-900: rgb(124 45 18);
    --accent-950: rgb(67 20 7);
  }

  [data-accent='green'] {
    --accent-50: rgb(240 253 244);
    --accent-100: rgb(220 252 231);
    --accent-200: rgb(187 247 208);
    --accent-300: rgb(134 239 172);
    --accent-400: rgb(74 222 128);
    --accent-500: rgb(34 197 94);
    --accent-600: rgb(22 163 74);
    --accent-700: rgb(21 128 61);
    --accent-800: rgb(22 101 52);
    --accent-900: rgb(20 83 45);
    --accent-950: rgb(5 46 22);
  }

  [data-accent='pink'] {
    --accent-50: rgb(253 242 248);
    --accent-100: rgb(252 231 243);
    --accent-200: rgb(251 207 232);
    --accent-300: rgb(249 168 212);
    --accent-400: rgb(244 114 182);
    --accent-500: rgb(236 72 153);
    --accent-600: rgb(219 39 119);
    --accent-700: rgb(190 24 93);
    --accent-800: rgb(157 23 77);
    --accent-900: rgb(131 24 67);
    --accent-950: rgb(80 7 36);
  }
`;

function AccentDemo() {
  const accents = ['violet', 'red', 'blue', 'orange', 'green', 'pink'] as const;

  const [accent, setAccent] = useState<(typeof accents)[number]>('violet');

  const handleClick = () => {
    const newAccent = accents[accents.indexOf(accent) + 1] || accents[0];

    document.documentElement.setAttribute('data-accent', newAccent);
    setAccent(newAccent);
  };

  const getButtonText = (color: (typeof accents)[number]): string => {
    switch (color) {
      case 'violet':
        return `This is perfect 👌`;
      case 'red':
        return `I look brave, don't I? 😡`;
      case 'blue':
        return `This is good 🤩`;
      case 'orange':
        return `Are you serious? 👀`;
      case 'green':
        return `Ah green, not bad 😁`;
      case 'pink':
        return `Okay, bring me back to violet! 😭`;
      default:
        return `Change the accent color!`;
    }
  };

  return (
    <div className={clsx('my-12 flex items-center justify-center')}>
      <style>{DEMO_ACCENT_CSS}</style>
      <button
        type="button"
        className={clsx('button button--solid button--big')}
        onClick={handleClick}
      >
        {getButtonText(accent)}
      </button>
    </div>
  );
}

export default AccentDemo;
