'use client';

import clsx from 'clsx';
import { m } from 'framer-motion';

import {
  CpuIcon,
  DatabaseIcon,
  JavaIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  SpringIcon,
  TerminalIcon,
  VSCodeIcon,
  VueIcon,
} from '@/components/Icons';

const animation = {
  hide: { x: -8, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTechStack() {
  return (
    <div>
      <m.p
        className={clsx('mb-2.5 text-sm text-slate-600', 'dark:text-slate-400')}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.6 }}
      >
        日常主力技术栈与工程底座：
      </m.p>
      <m.ul
        className={clsx(
          'flex flex-wrap items-center gap-3.5 text-slate-500',
          'dark:text-slate-500'
        )}
        initial="hide"
        animate="show"
        transition={{ delayChildren: 0.6, staggerChildren: 0.025 }}
      >
        <m.li variants={animation}>
          <div
            title="Java"
            className={clsx('transition duration-200 hover:text-[#ED8B00]')}
          >
            <JavaIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="Python"
            className={clsx('transition duration-200 hover:text-[#3776AB]')}
          >
            <PythonIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="Spring Boot / Spring Cloud / Spring AI"
            className={clsx('transition duration-200 hover:text-[#6DB33F]')}
          >
            <SpringIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="AI Agent / Harness / MCP / RAG"
            className={clsx(
              'transition duration-200 hover:text-accent-600 dark:hover:text-accent-400'
            )}
          >
            <CpuIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="MySQL / ElasticSearch"
            className={clsx('transition duration-200 hover:text-[#00758F]')}
          >
            <DatabaseIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="Redis / Tair"
            className={clsx('transition duration-200 hover:text-[#DC382D]')}
          >
            <RedisIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div className={clsx('h-3 w-[1px] bg-slate-300 dark:bg-slate-700')} />
        </m.li>
        <m.li variants={animation}>
          <div
            title="React / Next.js"
            className={clsx('transition duration-200 hover:text-[#61DAFB]')}
          >
            <ReactIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="Vue.js"
            className={clsx('transition duration-200 hover:text-[#4FC08D]')}
          >
            <VueIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div className={clsx('h-3 w-[1px] bg-slate-300 dark:bg-slate-700')} />
        </m.li>
        <m.li variants={animation}>
          <div
            title="Linux / 容器与线上运维"
            className={clsx(
              'transition duration-200 hover:text-slate-900 dark:hover:text-white'
            )}
          >
            <TerminalIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
        <m.li variants={animation}>
          <div
            title="IDE & 开发工具"
            className={clsx('transition duration-200 hover:text-[#007ACC]')}
          >
            <VSCodeIcon className={clsx('h-6 w-6')} />
          </div>
        </m.li>
      </m.ul>
    </div>
  );
}

export default HeaderTechStack;
