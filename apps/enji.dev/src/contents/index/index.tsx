import clsx from 'clsx';

import { CodeIcon, CpuIcon, SparklesIcon } from '@/components/Icons';

import AgentHarness from '@/contents/index/AgentHarness';
import FeaturedCard from '@/contents/index/FeaturedCard';
import Header from '@/contents/index/Header';
import ProjectHighlights from '@/contents/index/ProjectHighlights';
import Quote from '@/contents/index/Quote';
import SystemArchitecture from '@/contents/index/SystemArchitecture';

function FeaturedCardSection() {
  return (
    <div className={clsx('content-wrapper')}>
      <div
        className={clsx('grid grid-cols-1 gap-4', 'md:grid-cols-3 lg:gap-6')}
      >
        <FeaturedCard
          icon={
            <div
              className={clsx(
                'rounded-full bg-amber-400 p-3',
                'dark:bg-amber-900'
              )}
            >
              <SparklesIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="智能体工程闭环"
          desc="构建基于 ReAct、沙箱隔离与双轨评测门禁的 Agent Harness，让模型推理可控、可回滚、持续自进化。"
        />
        <FeaturedCard
          icon={
            <div
              className={clsx('rounded-full bg-sky-400 p-3', 'dark:bg-sky-900')}
            >
              <CpuIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="高并发分布式架构"
          desc="深耕 Spring 生态、工作流编排与多级缓存消息中间件，稳健承载百万级日志归集与高并发交易订单。"
        />
        <FeaturedCard
          icon={
            <div
              className={clsx(
                'rounded-full bg-pink-400 p-3',
                'dark:bg-pink-900'
              )}
            >
              <CodeIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="端到端全栈交付"
          desc="贯通 Netty 物联多协议网关、后端领域服务与 React / Vue 现代前端界面，独立闭环复杂产品研发。"
        />
      </div>
    </div>
  );
}

function QuoteSection() {
  return (
    <div className={clsx('content-wrapper')}>
      <div className={clsx('flex items-center justify-center py-8')}>
        <Quote />
      </div>
    </div>
  );
}

function IndexContents() {
  return (
    <>
      <Header />
      <div className={clsx('mt-4 mb-16', 'lg:-mt-16 lg:mb-24')}>
        <FeaturedCardSection />
      </div>
      <div className={clsx('mb-16', 'md:mb-24')}>
        <QuoteSection />
      </div>
      <section className={clsx('mb-12', 'lg:mb-24')}>
        <AgentHarness />
      </section>
      <section className={clsx('mb-12', 'lg:mb-24')}>
        <SystemArchitecture />
      </section>
      <section className={clsx('mb-12', 'lg:mb-24')}>
        <ProjectHighlights />
      </section>
    </>
  );
}

export default IndexContents;
