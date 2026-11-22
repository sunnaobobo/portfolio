'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { CheckCircleIcon } from '@/components/Icons';
import { SectionButton } from '@/components/sections/SectionButton';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

type HarnessStageKey = 'react' | 'sandbox' | 'eval' | 'evolution';

interface HarnessStage {
  key: HarnessStageKey;
  title: string;
  description: string;
  badge: string;
  summary: string;
  mechanisms: Array<string>;
  metricLabel: string;
  metricValue: string;
  metricSubtext: string;
  codeTitle: string;
  codeLines: Array<string>;
}

const stages: Array<HarnessStage> = [
  {
    key: 'react',
    title: 'ReAct 自主决策编排',
    description: '统一上下文、MCP 工具接口与执行反馈，驱动多格式文件自主解析。',
    badge: 'Layer 01 · Runtime',
    summary:
      '围绕任务上下文封装文件读取、标准模板匹配、Python 转换脚本生成及 OSS 上传工具，由模型在“推理—调用—观察反馈”闭环中完成异构航司政策解析。',
    mechanisms: [
      'Spring AI Alibaba + MCP 协议统一工具注册',
      '执行异常堆栈结构化回传，支持单步自我修复',
      '打通“文件解析—验价—投放上线”自动化链路',
    ],
    metricLabel: '单文件平均解析耗时',
    metricValue: '2h → 5min',
    metricSubtext: '日均自动解析 140+ 份多格式航司政策文件',
    codeTitle: 'harness/react-loop.ts',
    codeLines: [
      'context.bindTools([fileReader, templatePicker, pyRunner, ossUploader]);',
      'while (!task.isConverged() && step < MAX_STEPS) {',
      '  const action = await agent.reason(context.snapshot());',
      '  const observation = await sandbox.execute(action);',
      '  context.appendFeedback(action, observation);',
      '}',
    ],
  },
  {
    key: 'sandbox',
    title: '任务级工作区与沙箱',
    description: '隔离并发任务数据目录，约束动态生成脚本的权限与计算资源。',
    badge: 'Layer 02 · Isolation',
    summary:
      '针对大模型动态生成 Python 解析脚本的不确定性，为每个解析任务分配独立工作区与受控执行沙箱，杜绝并发串扰与异常脚本逃逸影响主服务。',
    mechanisms: [
      '任务级独立挂载目录，输入输出文件严格隔离',
      '白名单依赖导入与系统调用拦截，阻断越权访问',
      'CPU / 内存配额与超时熔断保护核心服务稳定性',
    ],
    metricLabel: 'AI 自动解析任务成功率',
    metricValue: '100%',
    metricSubtext: '零起异常脚本拖垮主进程或并发数据污染事故',
    codeTitle: 'sandbox/workspace-policy.yaml',
    codeLines: [
      'workspace: /var/agent-tasks/${taskId}',
      'isolation:',
      '  network: disabled',
      '  fs_mount: read_write_task_only',
      'limits:',
      '  timeout_sec: 90  memory_mb: 512',
    ],
  },
  {
    key: 'eval',
    title: '离线与线上双轨评测',
    description: '离线分层质量门禁拦截退化，线上以运营复核金标持续监控。',
    badge: 'Layer 03 · Evaluation',
    summary:
      '任何模型升级、Prompt 调整或规则变更均需先通过离线分层门禁；线上将运营复核结果沉淀为金标样本，实时追踪全维度产物质量。',
    mechanisms: [
      '离线门禁覆盖产物可用性、类型识别与行数完整性',
      '线上以运营人工复核结果作为真实业务金标对账',
      '细粒度监控字段级准确率与长周期运行稳定性',
    ],
    metricLabel: '端到端文件解析准确率',
    metricValue: '76.4% → 92.1%',
    metricSubtext: '运营角色由繁琐手工录入全面转向高效结果复核',
    codeTitle: 'eval/quality-gate.json',
    codeLines: [
      '{',
      '  "artifact_valid_rate": 1.00,',
      '  "row_completeness": 0.985,',
      '  "field_exact_match": 0.921,',
      '  "gate_decision": "ALLOW_RELEASE"',
      '}',
    ],
  },
  {
    key: 'evolution',
    title: '字段级规则自进化',
    description:
      '从人工复核差异中自动提炼候选规则，经 pass^3 回归门禁版本化发布。',
    badge: 'Layer 04 · Self-Evolution',
    summary:
      '构建“字段反馈—AI 冲突检测与候选生成—回归评测—审核发布”知识闭环：冲突或不可复现样本转人工确认，其余自动通过黄金集/错题集回归验证。',
    mechanisms: [
      '差异拆解至字段级，自动检测与存量规则语义冲突',
      '黄金集 + 错题集回归与 pass^3 稳定性门禁阻断退化',
      '规则版本化管理，全链路支持一键追溯与秒级回滚',
    ],
    metricLabel: '40 家航司规则建设周期',
    metricValue: '15天 → 3天',
    metricSubtext: '候选规则发布通过率 87%，单次适配缩至 30 分钟内',
    codeTitle: 'evolution/rule-pipeline.log',
    codeLines: [
      '[DIFF] 识别字段级修正样本 18 条 -> 冲突检测通过 16 条',
      '[GEN ] 生成候选航司规则 v2.14-rc1（2 条交由人工确认）',
      '[EVAL] 黄金集回归 PASS · 错题集回归 PASS · pass^3 = 87%',
      '[PUB ] 审核通过，已发布规则快照 #20261018-04（可回滚）',
    ],
  },
];

function AgentHarness() {
  const [activeStage, setActiveStage] = useState<HarnessStage>(stages[0]);

  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title="把不确定的模型推理，装进确定性的工程闭环。"
          caption="AI 智能体工程实践"
          description="以飞猪机票政策解析 Agent 从 0 到 1 建设为例，通过四层 Harness 架构实现复杂非结构化政策的自主解析、安全执行与持续自进化。"
        />
      </header>
      <SectionContent>
        <div className={clsx('flex flex-col gap-6', 'lg:flex-row lg:gap-10')}>
          <div className={clsx('flex flex-wrap gap-2', 'lg:hidden')}>
            {stages.map((item, i) => {
              const isActive = activeStage.key === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveStage(item)}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition',
                    isActive
                      ? 'border-accent-400 bg-accent-600/10 text-accent-600 dark:border-accent-400 dark:bg-accent-400/15 dark:text-accent-400'
                      : 'border-divider-light bg-white text-slate-600 dark:border-divider-dark dark:bg-slate-900 dark:text-slate-300'
                  )}
                >
                  <span className={clsx('font-mono text-xs opacity-70')}>
                    0{i + 1}
                  </span>
                  {item.title}
                </button>
              );
            })}
          </div>
          <div
            className={clsx('-mt-8 hidden flex-1 flex-col gap-3', 'lg:flex')}
          >
            {stages.map((item, i) => (
              <SectionButton
                key={item.key}
                title={item.title}
                description={item.description}
                icon={i + 1}
                active={activeStage.key === item.key}
                onClick={() => setActiveStage(item)}
              />
            ))}
          </div>
          <div className={clsx('flex flex-1 items-stretch', 'lg:-mt-8')}>
            <div
              className={clsx(
                'flex w-full flex-col justify-between rounded-2xl border border-divider-light bg-white p-6',
                'md:p-7',
                'dark:border-divider-dark dark:bg-slate-900'
              )}
            >
              <div>
                <div
                  className={clsx(
                    'mb-4 flex flex-wrap items-center justify-between gap-2'
                  )}
                >
                  <span
                    className={clsx(
                      'rounded-full bg-accent-600/10 px-3 py-1 font-mono text-xs font-bold text-accent-600',
                      'dark:bg-accent-400/15 dark:text-accent-400'
                    )}
                  >
                    {activeStage.badge}
                  </span>
                  <span
                    className={clsx(
                      'font-mono text-xs text-slate-500',
                      'dark:text-slate-400'
                    )}
                  >
                    Spring AI Alibaba · MCP · Skill
                  </span>
                </div>
                <h3
                  className={clsx(
                    'mb-2.5 text-xl font-extrabold text-slate-800',
                    'dark:text-slate-100'
                  )}
                >
                  {activeStage.title}
                </h3>
                <p
                  className={clsx(
                    'mb-5 text-sm leading-relaxed text-slate-600',
                    'dark:text-slate-400'
                  )}
                >
                  {activeStage.summary}
                </p>
                <ul className={clsx('mb-6 space-y-2.5')}>
                  {activeStage.mechanisms.map((point) => (
                    <li
                      key={point}
                      className={clsx(
                        'flex items-start gap-2 text-sm text-slate-700',
                        'dark:text-slate-300'
                      )}
                    >
                      <CheckCircleIcon
                        className={clsx(
                          'mt-0.5 h-4 w-4 shrink-0 text-accent-600',
                          'dark:text-accent-400'
                        )}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={clsx('space-y-4')}>
                <div
                  className={clsx(
                    'overflow-hidden rounded-xl border border-divider-light bg-slate-50',
                    'dark:border-divider-dark dark:bg-[#0c1222]'
                  )}
                >
                  <div
                    className={clsx(
                      'border-b border-divider-light px-3.5 py-2 font-mono text-xs text-slate-500',
                      'dark:border-divider-dark dark:text-slate-400'
                    )}
                  >
                    {activeStage.codeTitle}
                  </div>
                  <pre
                    className={clsx(
                      'overflow-x-auto p-3.5 font-mono text-xs leading-6 text-slate-700',
                      'dark:text-slate-300'
                    )}
                  >
                    <code>{activeStage.codeLines.join('\n')}</code>
                  </pre>
                </div>

                <div
                  className={clsx(
                    'flex flex-col justify-between gap-2 rounded-xl bg-slate-100/80 px-4 py-3.5',
                    'sm:flex-row sm:items-center',
                    'dark:bg-slate-800/60'
                  )}
                >
                  <div>
                    <div
                      className={clsx(
                        'text-xs font-medium text-slate-500',
                        'dark:text-slate-400'
                      )}
                    >
                      {activeStage.metricLabel}
                    </div>
                    <div
                      className={clsx(
                        'mt-0.5 text-xs text-slate-600',
                        'dark:text-slate-400'
                      )}
                    >
                      {activeStage.metricSubtext}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'font-mono text-xl font-extrabold text-accent-600',
                      'sm:text-right',
                      'dark:text-accent-400'
                    )}
                  >
                    {activeStage.metricValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default AgentHarness;
