'use client';

import clsx from 'clsx';
import { m, useAnimationControls } from 'framer-motion';
import Image from 'next/image';

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTitle() {
  const controls = useAnimationControls();

  return (
    <div>
      <m.div
        className={clsx(
          'mb-2 flex items-center gap-1.5 text-xl font-medium text-slate-600',
          'md:mb-3 md:gap-2 md:text-2xl',
          'dark:text-slate-400'
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        你好，很高兴认识你
        <m.div
          initial={{
            opacity: 0,
            y: 16,
            rotate: 30,
            transformOrigin: 'right center',
          }}
          animate={controls}
          transition={{
            type: 'spring',
            delay: 0.35,
            bounce: 0.7,
            duration: 0.7,
          }}
        >
          <Image
            className={clsx('w-7 md:w-8')}
            alt="问候手势"
            src="/assets/emojis/love-you-gesture.png"
            width={48}
            height={48}
            onLoad={() => {
              controls.start({
                opacity: 1,
                y: 0,
                rotate: 0,
              });
            }}
            priority
          />
        </m.div>
      </m.div>
      <span className={clsx('text-slate-800', 'dark:text-slate-200')}>
        <m.span
          className={clsx(
            'mb-4 block text-[2.25rem] leading-[1.2] font-extrabold tracking-tight',
            'md:mb-5 md:text-6xl lg:text-[4.25rem]'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.2 }}
        >
          我是{' '}
          <strong className={clsx('text-accent-600', 'dark:text-accent-500')}>
            孙靖
          </strong>
        </m.span>
        <m.h1
          className={clsx(
            'block max-w-xl text-base leading-relaxed text-slate-600',
            'md:text-xl md:leading-relaxed',
            'dark:text-slate-400'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          专注于{' '}
          <strong
            className={clsx('font-bold text-slate-800', 'dark:text-slate-200')}
          >
            AI 智能体工程化与高可用全栈架构
          </strong>{' '}
          的开发者，致力于将大模型能力可控、可评测地融入复杂业务系统。
        </m.h1>
      </span>
    </div>
  );
}

export default HeaderTitle;
