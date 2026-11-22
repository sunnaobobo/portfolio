'use client';

import clsx from 'clsx';
import { useState } from 'react';

import {
  CheckCircleIcon,
  CodeIcon,
  CpuIcon,
  DatabaseIcon,
  InsightIcon,
} from '@/components/Icons';
import { SectionButton } from '@/components/sections/SectionButton';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';
import AppWindow from '@/components/wireframes/AppWindow';

const platformProjects = [
  {
    name: '泰山易停 & 小停泊车平台',
    role: '全栈开发',
    scale: '200+ 停车场 · 200 万注册用户 · 日均订单 5 万+',
    stack: [
      'Spring Cloud Alibaba',
      'Nacos',
      'Redis',
      'RabbitMQ',
      'Netty',
      'MySQL',
      'ElasticSearch',
      'InfluxDB',
      'WebSocket',
      'Spring AI + MCP',
    ],
    summary:
      '面向城市级停车业务数字化转型打造的综合管理平台，涵盖路外停车、路内停车、汽车充电和电动车充电四大子系统，支撑停车场管理、订单流转、异构硬件接入与运营数据分析。',
    highlights: [
      '采用线程池 + Canal 监听 MySQL Binlog 实现增量实时同步，保障高并发下 ElasticSearch 与 MySQL 订单数据一致性。',
      '基于 Spring AI 与 MCP 协议集成 Qwen3 大模型打造智能停车助手，支持余位、营收与导航路线自然语言问答。',
      '使用 Netty 构建多协议接入网关（TCP / UDP / MQTT），并发承载数千台车位相机、地磁、车位锁等异构硬件。',
      '主导路内停车子系统自动计费链路，并基于 RabbitMQ 延迟交换机实现订单支付超时自动闭环治理。',
    ],
  },
  {
    name: '泰山易行（共享电单车运营平台）',
    role: '全栈开发',
    scale: '2000+ 共享电单车 · 在线率 >95% · 日均百万级日志',
    stack: [
      'Spring Cloud Alibaba',
      'DDD 领域驱动',
      'Netty',
      'Kafka',
      'ElasticSearch',
      'Minio',
      '高德 SDK',
      'SLS + OSS',
      'Kubernetes',
    ],
    summary:
      '基于领域驱动设计（DDD）架构建设的城市共享电单车调度与运营平台，支持多品牌中控设备统一接入、实时监管数据上报与全流程线上运维。',
    highlights: [
      '维护并优化多品牌电单车设备网关，支持两大品牌 2000+ 辆车统一管理与平滑切换，日均车辆在线率稳定超 95%。',
      '建设市级监管平台实时同步链路，日均上报车辆轨迹与订单数据超 5 万条，确保政企数据合规对齐。',
      '负责平台日志采集模块，支撑每日百万级设备、运维与操作日志自动归集分析，线上问题定位时效提升 50%。',
      '落地小安中控协议增量能力与打卡、清洁、摆车运维工单体系（日均处理 500+ 单），批量二维码工具累计生成 5 万+ 车码。',
    ],
  },
  {
    name: '泰发展智慧园区',
    role: '全栈开发',
    scale: '100+ 物联终端 · 1000+ 人次就餐统计 · 高峰 500+ 起/h 预约',
    stack: [
      'Spring Boot',
      'Redis',
      'MySQL',
      'Netty',
      'Socket.IO',
      '微信小程序',
    ],
    summary:
      '面向企业园区智能化运营的一体化平台，打通餐厨管理、来访停车预约与全园区物联网设备监控大屏，提升园区资源调度效率。',
    highlights: [
      '统一归集监控除门禁外 100+ 物联终端实时运行状态并驱动可视化大屏，日常设备巡检与运维效率提升 30%。',
      '对接人脸识别消费机与餐厨模块，支撑 1000+ 人次日常就餐数据多维分析、员工投票选菜及周/月报表自动导出。',
      '协同接入 20 路后厨实时监控视频流大屏展示，强化园区食品安全与后厨透明化监管。',
      '梳理并优化来访车辆预约与车位状态同步流程，支撑高峰期每小时 500+ 起车位预约，车位使用率同比提升 20%。',
    ],
  },
];

function ProjectsContents() {
  const [agentTab, setAgentTab] = useState<'harness' | 'evolution'>('harness');
  const [deliveryTab, setDeliveryTab] = useState<'workflow' | 'streaming'>(
    'workflow'
  );

  return (
    <>
      <section className={clsx('mb-16', 'lg:mb-24')}>
        <SectionTitle
          title="机票政策解析 AI 自动化（飞猪）"
          caption="核心项目 01 · AI 全栈开发"
          description="推动政策解析能力从 0 到 1 建设：以 ReAct Agent Harness、任务级沙箱与字段级规则自进化闭环替代繁重手工录入，打通“文件解析—验价—投放上线”全自动链路。"
        />
        <SectionContent>
          <div className={clsx('flex flex-col gap-6', 'lg:flex-row lg:gap-10')}>
            <div className={clsx('flex gap-2', 'lg:hidden')}>
              <button
                type="button"
                onClick={() => setAgentTab('harness')}
                className={clsx(
                  'flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                  agentTab === 'harness'
                    ? 'border-accent-400 bg-accent-600/10 text-accent-600 dark:border-accent-400 dark:bg-accent-400/15 dark:text-accent-400'
                    : 'border-divider-light bg-white text-slate-600 dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <CpuIcon className={clsx('h-4 w-4')} />
                Harness 与沙箱
              </button>
              <button
                type="button"
                onClick={() => setAgentTab('evolution')}
                className={clsx(
                  'flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                  agentTab === 'evolution'
                    ? 'border-accent-400 bg-accent-600/10 text-accent-600 dark:border-accent-400 dark:bg-accent-400/15 dark:text-accent-400'
                    : 'border-divider-light bg-white text-slate-600 dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <InsightIcon className={clsx('h-4 w-4')} />
                双轨评测与自进化
              </button>
            </div>

            <div
              className={clsx('hidden flex-1 flex-col gap-3 pt-4', 'lg:flex')}
            >
              <SectionButton
                title="ReAct Harness 与任务级沙箱"
                icon={<CpuIcon className={clsx('my-2 h-14 w-14')} />}
                description="统一任务上下文、MCP 工具接口与执行反馈，通过独立任务工作区与权限约束保障动态 Python 脚本安全可控执行。"
                active={agentTab === 'harness'}
                onClick={() => setAgentTab('harness')}
              />
              <SectionButton
                title="双轨评测与航司规则自进化"
                icon={<InsightIcon className={clsx('my-2 h-14 w-14')} />}
                description="离线分层门禁 + 线上复核金标持续监控，结合 pass^3 回归校验实现 40 家航司规则快速迭代与版本化回滚。"
                active={agentTab === 'evolution'}
                onClick={() => setAgentTab('evolution')}
              />
            </div>

            <div className={clsx('w-full', 'lg:w-[580px]')}>
              <div className={clsx('lg:-mt-6')}>
                <AppWindow
                  type="browser"
                  browserTabs={[
                    {
                      icon: <CpuIcon className="h-3.5 w-3.5" />,
                      title: 'agent-harness-arch.md',
                      isActive: agentTab === 'harness',
                    },
                    {
                      icon: <InsightIcon className="h-3.5 w-3.5" />,
                      title: 'eval-and-evolution.json',
                      isActive: agentTab === 'evolution',
                    },
                  ]}
                >
                  {agentTab === 'harness' ? (
                    <div className={clsx('space-y-4 p-5 text-sm')}>
                      <div className={clsx('flex flex-wrap gap-1.5')}>
                        {[
                          'PandoraBoot',
                          'MetaQ',
                          'Spring AI Alibaba',
                          'MCP',
                          'Skill',
                          'Tair',
                        ].map((tag) => (
                          <span
                            key={tag}
                            className={clsx(
                              'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700',
                              'dark:bg-slate-800 dark:text-slate-300'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className={clsx(
                          'space-y-2.5 text-slate-600 dark:text-slate-300'
                        )}
                      >
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            1. 自主决策闭环：
                          </strong>
                          集成文件读写、标准模板选择、Python 脚本执行与 OSS
                          上传等工具，模型根据执行反馈自主完成多格式航司优惠政策理解与标准
                          Excel 转换。
                        </p>
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            2. 可控沙箱隔离：
                          </strong>
                          构建任务级工作区与资源配额机制，隔离并发任务文件读写与脚本权限，杜绝异常生成脚本干扰主服务。
                        </p>
                      </div>
                      <div
                        className={clsx(
                          'grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5',
                          'dark:bg-slate-800/60'
                        )}
                      >
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            日均自动解析规模
                          </div>
                          <div className="mt-0.5 font-mono text-lg font-extrabold text-accent-600 dark:text-accent-400">
                            140+ 份 / 日
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            单文件平均耗时
                          </div>
                          <div className="mt-0.5 font-mono text-lg font-extrabold text-accent-600 dark:text-accent-400">
                            2h → 5min
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={clsx('space-y-4 p-5 text-sm')}>
                      <div
                        className={clsx(
                          'space-y-2.5 text-slate-600 dark:text-slate-300'
                        )}
                      >
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            3. 离线与线上双轨评测：
                          </strong>
                          离线通过分层门禁验证模型、Prompt
                          与规则变更；线上以运营复核为金标，持续监控产物可用性、行数完整性与字段准确率。
                        </p>
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            4. 规则知识闭环自进化：
                          </strong>
                          拆解字段级反馈，自动冲突检测并生成候选规则（冲突转人工确认），经黄金集/错题集与{' '}
                          <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">
                            pass^3
                          </code>{' '}
                          门禁验证后版本化发布，支持可追溯与一键回滚。
                        </p>
                      </div>
                      <div
                        className={clsx(
                          'grid grid-cols-3 gap-2.5 rounded-xl bg-slate-50 p-3.5',
                          'dark:bg-slate-800/60'
                        )}
                      >
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            解析准确率
                          </div>
                          <div className="mt-0.5 font-mono text-base font-extrabold text-accent-600 dark:text-accent-400">
                            76.4%→92.1%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            候选发布通过率
                          </div>
                          <div className="mt-0.5 font-mono text-base font-extrabold text-accent-600 dark:text-accent-400">
                            87%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            40 航司规则周期
                          </div>
                          <div className="mt-0.5 font-mono text-base font-extrabold text-accent-600 dark:text-accent-400">
                            15天 → 3天
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </AppWindow>
              </div>
            </div>
          </div>
        </SectionContent>
      </section>

      <section className={clsx('mb-16', 'lg:mb-24')}>
        <SectionTitle
          title="机票投放一体化项目（飞猪）"
          caption="核心项目 02 · AI 全栈开发"
          description="协同引擎及导购团队建设“收—投—跟—评—追”全流程线上化体系，解决多渠道航司政策进度不可见、大组合计算 OOM 与人工长链路耗时问题。"
        />
        <SectionContent>
          <div className={clsx('flex flex-col gap-6', 'lg:flex-row lg:gap-10')}>
            <div className={clsx('flex gap-2', 'lg:hidden')}>
              <button
                type="button"
                onClick={() => setDeliveryTab('workflow')}
                className={clsx(
                  'flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                  deliveryTab === 'workflow'
                    ? 'border-accent-400 bg-accent-600/10 text-accent-600 dark:border-accent-400 dark:bg-accent-400/15 dark:text-accent-400'
                    : 'border-divider-light bg-white text-slate-600 dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <CodeIcon className={clsx('h-4 w-4')} />
                流程编排与异步投放
              </button>
              <button
                type="button"
                onClick={() => setDeliveryTab('streaming')}
                className={clsx(
                  'flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition',
                  deliveryTab === 'streaming'
                    ? 'border-accent-400 bg-accent-600/10 text-accent-600 dark:border-accent-400 dark:bg-accent-400/15 dark:text-accent-400'
                    : 'border-divider-light bg-white text-slate-600 dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <DatabaseIcon className={clsx('h-4 w-4')} />
                平台化解析与防 OOM
              </button>
            </div>

            <div
              className={clsx('hidden flex-1 flex-col gap-3 pt-4', 'lg:flex')}
            >
              <SectionButton
                title="Flowable 流程编排与 MetaQ 异步投放"
                icon={<CodeIcon className={clsx('my-2 h-14 w-14')} />}
                description="编排解析、验舱验价、审核及投放全节点，在不侵入存量 SOP 核心代码前提下异步串联领域能力。"
                active={deliveryTab === 'workflow'}
                onClick={() => setDeliveryTab('workflow')}
              />
              <SectionButton
                title="Groovy 规则引擎与大数据流式优化"
                icon={<DatabaseIcon className={clsx('my-2 h-14 w-14')} />}
                description="“正则提取 + Groovy 转换”支持异构航司格式快速接入；航线分片增量计算 + SXSSF 流式写盘根治 OOM。"
                active={deliveryTab === 'streaming'}
                onClick={() => setDeliveryTab('streaming')}
              />
            </div>

            <div className={clsx('w-full', 'lg:w-[580px]')}>
              <div className={clsx('lg:-mt-6')}>
                <AppWindow
                  type="browser"
                  browserTabs={[
                    {
                      icon: <CodeIcon className="h-3.5 w-3.5" />,
                      title: 'flowable-pipeline.xml',
                      isActive: deliveryTab === 'workflow',
                    },
                    {
                      icon: <DatabaseIcon className="h-3.5 w-3.5" />,
                      title: 'groovy-sxssf-engine.java',
                      isActive: deliveryTab === 'streaming',
                    },
                  ]}
                >
                  {deliveryTab === 'workflow' ? (
                    <div className={clsx('space-y-4 p-5 text-sm')}>
                      <div className={clsx('flex flex-wrap gap-1.5')}>
                        {[
                          'PandoraBoot',
                          'Flowable',
                          'MetaQ',
                          'Schedulex',
                          'TDDL',
                          'Tair',
                          'MyBatis-Plus',
                        ].map((tag) => (
                          <span
                            key={tag}
                            className={clsx(
                              'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700',
                              'dark:bg-slate-800 dark:text-slate-300'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className={clsx(
                          'space-y-2.5 text-slate-600 dark:text-slate-300'
                        )}
                      >
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            1. 全流程可观测线上化：
                          </strong>
                          引入 Flowable
                          对政策接收、解析、验舱验价、人工审核、投放与到期预警统一编排，实现状态实时追踪与异常闭环。
                        </p>
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            2. 无侵入平滑融合：
                          </strong>
                          抽象复用存量解析、验价、投放领域服务，借助 MetaQ
                          消息驱动异步解耦长耗时节点，避免同步线程阻塞与人工 SOP
                          改造风险。
                        </p>
                      </div>
                      <div
                        className={clsx(
                          'rounded-xl bg-slate-50 p-3.5',
                          'dark:bg-slate-800/60'
                        )}
                      >
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          单份机票政策平均端到端投放时效
                        </div>
                        <div className="mt-0.5 font-mono text-lg font-extrabold text-accent-600 dark:text-accent-400">
                          72 小时+ → 3 小时以内
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={clsx('space-y-4 p-5 text-sm')}>
                      <div
                        className={clsx(
                          'space-y-2.5 text-slate-600 dark:text-slate-300'
                        )}
                      >
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            3. 可配置规则平台化：
                          </strong>
                          针对各航司微信、邮件、钉钉文档差异，设计“正则表达式提取原始字段
                          + Groovy
                          动态脚本清洗转换”架构，支持新增政策模板热接入。
                        </p>
                        <p className={clsx('leading-relaxed')}>
                          <strong className="text-slate-800 dark:text-slate-100">
                            4. 笛卡尔积防 OOM 治理：
                          </strong>
                          针对单程转往返航线组合爆炸，采用航线分片与增量计算限制单批内存占用，配合{' '}
                          <code className="rounded bg-slate-100 px-1 font-mono text-xs dark:bg-slate-800">
                            SXSSFWorkbook
                          </code>{' '}
                          流式刷盘保障大文件生成稳定。
                        </p>
                      </div>
                      <div
                        className={clsx(
                          'grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5',
                          'dark:bg-slate-800/60'
                        )}
                      >
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            平台化解析正确率
                          </div>
                          <div className="mt-0.5 font-mono text-lg font-extrabold text-accent-600 dark:text-accent-400">
                            80%+
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            高组合大文件稳定性
                          </div>
                          <div className="mt-0.5 font-mono text-lg font-extrabold text-accent-600 dark:text-accent-400">
                            流式零 OOM
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </AppWindow>
              </div>
            </div>
          </div>
        </SectionContent>
      </section>

      <section>
        <SectionTitle
          title="城市智慧交通与园区数字化系统"
          caption="全栈与物联网工程实践"
          description="覆盖百万级注册用户智慧停车、共享电单车 DDD 运营调度与企业智慧园区，贯通多协议物联网硬件网关、分布式微服务与多端交互应用。"
        />
        <SectionContent>
          <div className={clsx('-mt-6 flex flex-col gap-6')}>
            {platformProjects.map((project) => (
              <article
                key={project.name}
                className={clsx(
                  'rounded-2xl border border-divider-light bg-white p-6',
                  'md:p-8',
                  'dark:border-divider-dark dark:bg-slate-900'
                )}
              >
                <div
                  className={clsx(
                    'mb-3 flex flex-col justify-between gap-2',
                    'md:flex-row md:items-center'
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        'text-xs font-bold text-accent-600',
                        'dark:text-accent-400'
                      )}
                    >
                      {project.role}
                    </span>
                    <h3
                      className={clsx(
                        'mt-1 text-xl font-extrabold text-slate-800',
                        'md:text-2xl',
                        'dark:text-slate-100'
                      )}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <div
                    className={clsx(
                      'self-start rounded-full bg-accent-600/[0.08] px-3.5 py-1 font-mono text-xs font-semibold text-accent-700',
                      'md:self-center',
                      'dark:bg-accent-400/10 dark:text-accent-300'
                    )}
                  >
                    {project.scale}
                  </div>
                </div>

                <p
                  className={clsx(
                    'mb-5 text-sm leading-relaxed text-slate-600',
                    'dark:text-slate-400'
                  )}
                >
                  {project.summary}
                </p>

                <div
                  className={clsx(
                    'mb-5 grid grid-cols-1 gap-3',
                    'md:grid-cols-2'
                  )}
                >
                  {project.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className={clsx(
                        'flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-700',
                        'dark:bg-slate-800/50 dark:text-slate-300'
                      )}
                    >
                      <CheckCircleIcon
                        className={clsx(
                          'mt-0.5 h-4 w-4 shrink-0 text-accent-600',
                          'dark:text-accent-400'
                        )}
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
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
                        'rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600',
                        'dark:bg-slate-800 dark:text-slate-400'
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionContent>
      </section>
    </>
  );
}

export default ProjectsContents;
