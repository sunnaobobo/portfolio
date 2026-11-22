import clsx from 'clsx';

import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

const practices = [
  {
    tag: '工作流与消息驱动',
    title: '长链路业务异步编排',
    problem:
      '多渠道政策人工流转存在进度不可追踪、长任务阻塞线程与到期缺乏预警等痛点。',
    solution:
      '引入 Flowable 编排解析、验舱验价、审核与投放节点，结合 MetaQ 异步复用原有领域能力，平滑融合人工 SOP 与自动化流水线。',
    outcome: '平均投放时效 72h+ → 3h 内',
  },
  {
    tag: '内存与高组合计算治理',
    title: '分片增量计算与流式落盘',
    problem:
      '单程转往返场景下航线组合呈笛卡尔积膨胀，全量驻留内存极易触发 JVM OOM。',
    solution:
      '设计航线分片与增量计算策略控制单批数据规模，采用 Apache POI SXSSFWorkbook 滑动窗口将结果流式刷写磁盘。',
    outcome: '彻底消除大文件高组合 OOM',
  },
  {
    tag: '异构同步与多协议接入',
    title: '实时检索与千台物联终端并发',
    problem:
      '百万用户级停车平台兼具多维实时检索压力，且需对接多品牌异构硬件协议。',
    solution:
      '基于 Canal 监听 MySQL Binlog 配合线程池异步写入保障 ES 实时一致；基于 Netty 统一承载 TCP / UDP / MQTT 多协议网关。',
    outcome: '支撑日均 5 万单与数千终端在线',
  },
];

function SystemArchitecture() {
  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title="面向真实生产瓶颈的架构设计与调优。"
          caption="分布式与高并发底座"
          description="不盲目堆砌复杂概念，针对长流程阻塞、高组合内存溢出与异构终端并发给出可观测、可回滚的工程方案。"
        />
      </header>
      <SectionContent>
        <div
          className={clsx(
            '-mt-8 grid grid-cols-1 gap-6',
            'lg:grid-cols-3 lg:gap-6'
          )}
        >
          {practices.map((item) => (
            <div
              key={item.title}
              className={clsx(
                'flex flex-col justify-between rounded-2xl border border-divider-light bg-white p-6',
                'dark:border-divider-dark dark:bg-slate-900'
              )}
            >
              <div>
                <div
                  className={clsx(
                    'mb-3 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600',
                    'dark:bg-slate-800 dark:text-slate-300'
                  )}
                >
                  {item.tag}
                </div>
                <h3
                  className={clsx(
                    'mb-3 text-lg font-extrabold text-slate-800',
                    'dark:text-slate-200'
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={clsx(
                    'mb-3 text-sm leading-relaxed text-slate-600',
                    'dark:text-slate-400'
                  )}
                >
                  <strong
                    className={clsx(
                      'font-semibold text-slate-700',
                      'dark:text-slate-300'
                    )}
                  >
                    场景挑战：
                  </strong>
                  {item.problem}
                </p>
                <p
                  className={clsx(
                    'mb-5 text-sm leading-relaxed text-slate-600',
                    'dark:text-slate-400'
                  )}
                >
                  <strong
                    className={clsx(
                      'font-semibold text-slate-700',
                      'dark:text-slate-300'
                    )}
                  >
                    工程解法：
                  </strong>
                  {item.solution}
                </p>
              </div>
              <div
                className={clsx(
                  'border-t border-divider-light pt-3.5 font-mono text-xs font-bold text-accent-600',
                  'dark:border-divider-dark dark:text-accent-400'
                )}
              >
                成效：{item.outcome}
              </div>
            </div>
          ))}
        </div>
      </SectionContent>
    </>
  );
}

export default SystemArchitecture;
