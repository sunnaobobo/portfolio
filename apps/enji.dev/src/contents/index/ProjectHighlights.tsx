import clsx from 'clsx';
import Link from 'next/link';

import { ChevronRightIcon } from '@/components/Icons';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

const featuredProjects = [
  {
    slug: 'fliggy-policy-parse-agent',
    role: 'AI 全栈开发',
    title: '机票政策解析 AI 自动化（飞猪）',
    summary:
      '从 0 到 1 建设基于 ReAct 的政策解析 Agent Harness、任务级沙箱与字段级规则自进化闭环，打通“解析—验价—投放”自动化链路。',
    metrics: ['140+ 份/日自动解析', '准确率 76.4% → 92.1%', '单文件 2h → 5min'],
    stack: [
      'PandoraBoot',
      'Spring AI Alibaba',
      'MCP',
      'Python Sandbox',
      'Tair',
    ],
  },
  {
    slug: 'fliggy-policy-delivery-platform',
    role: 'AI 全栈开发',
    title: '机票投放一体化项目（飞猪）',
    summary:
      '建设“收—投—跟—评—追”线上化管理体系，设计“正则提取 + Groovy 转换”可配置引擎与航线分片流式导出方案。',
    metrics: ['投放时效 72h+ → 3h', '解析正确率 80%+', '高组合流式防 OOM'],
    stack: ['Flowable', 'MetaQ', 'Groovy', 'TDDL', 'Schedulex'],
  },
  {
    slug: 'taishan-smart-parking',
    role: '全栈开发',
    title: '泰山易停 & 小停泊车平台',
    summary:
      '面向城市级停车数字化转型的综合管理平台，涵盖路外停车、路内停车与充换电四大子系统，集成 Qwen3 + MCP 智能停车助手。',
    metrics: ['接入 200+ 停车场', '200 万注册用户', '日均 5 万笔订单'],
    stack: [
      'Spring Cloud Alibaba',
      'Netty',
      'Canal + ES',
      'RabbitMQ',
      'Spring AI',
    ],
  },
  {
    slug: 'taishan-shared-ebike',
    role: '全栈开发',
    title: '泰山易行共享电单车平台',
    summary:
      '基于 DDD 领域驱动架构打造的城市共享电单车运营平台，负责多品牌中控设备网关、百万级日志归集分析与线上运维调度。',
    metrics: ['2000+ 车辆在线 >95%', '日均 5 万+ 监管上报', '排障提效 50%'],
    stack: ['DDD', 'Netty', 'Kafka', 'ElasticSearch', 'SLS + K8S'],
  },
];

function ProjectHighlights() {
  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title="扎根真实核心业务的全栈代表作。"
          caption="精选项目"
          description="涵盖在线旅游核心业务 AI 自动化、全流程工作流平台与百万用户级城市智慧交通系统。"
          button={{
            title: '浏览全部项目列表',
            href: '/projects',
          }}
        />
      </header>
      <SectionContent>
        <div
          className={clsx(
            '-mt-8 grid grid-cols-1 gap-6',
            'md:grid-cols-2 lg:gap-6'
          )}
        >
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={clsx(
                'group flex flex-col justify-between rounded-2xl border border-divider-light bg-white p-6 transition duration-200',
                'hover:border-accent-400',
                'dark:border-divider-dark dark:bg-slate-900 dark:hover:border-accent-500'
              )}
            >
              <div>
                <div
                  className={clsx(
                    'mb-3 flex items-center justify-between gap-2 text-xs'
                  )}
                >
                  <span
                    className={clsx(
                      'font-semibold text-accent-600',
                      'dark:text-accent-400'
                    )}
                  >
                    {project.role}
                  </span>
                  <span
                    className={clsx(
                      'inline-flex items-center gap-1 font-medium text-slate-500 transition group-hover:text-accent-600',
                      'dark:text-slate-400 dark:group-hover:text-accent-400'
                    )}
                  >
                    查看详情
                    <ChevronRightIcon className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
                <h3
                  className={clsx(
                    'mb-2.5 text-xl font-extrabold text-slate-800 transition-colors group-hover:text-accent-600',
                    'dark:text-slate-100 dark:group-hover:text-accent-400'
                  )}
                >
                  {project.title}
                </h3>
                <p
                  className={clsx(
                    'mb-4 text-sm leading-relaxed text-slate-600',
                    'dark:text-slate-400'
                  )}
                >
                  {project.summary}
                </p>
                <div className={clsx('mb-5 flex flex-wrap gap-2')}>
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className={clsx(
                        'rounded-md bg-accent-600/[0.08] px-2.5 py-1 font-mono text-xs font-semibold text-accent-700',
                        'dark:bg-accent-400/10 dark:text-accent-300'
                      )}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={clsx(
                  'flex flex-wrap gap-1.5 border-t border-divider-light pt-4',
                  'dark:border-divider-dark'
                )}
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={clsx(
                      'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600',
                      'dark:bg-slate-800 dark:text-slate-400'
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </SectionContent>
    </>
  );
}

export default ProjectHighlights;
