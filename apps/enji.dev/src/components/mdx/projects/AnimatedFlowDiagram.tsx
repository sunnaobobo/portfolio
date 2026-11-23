'use client';

import clsx from 'clsx';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useId, useState, useSyncExternalStore } from 'react';

export type FlowTone = 'accent' | 'sky' | 'emerald' | 'amber';

export type FlowNodeIcon =
  | 'hardware'
  | 'gateway'
  | 'database'
  | 'queue'
  | 'search'
  | 'ai'
  | 'cloud'
  | 'dashboard'
  | 'mobile'
  | 'shield'
  | 'canteen'
  | 'bike'
  | 'parking'
  | 'lock';

export interface FlowZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FlowNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  icon: FlowNodeIcon;
  tone: FlowTone;
  detailTitle?: string;
  detailDescription: string;
  detailTags: Array<string>;
  detailMetric?: string;
}

export interface FlowEdge {
  id: string;
  path: string;
  tone: FlowTone;
  label?: string;
  labelX?: number;
  labelY?: number;
  labelWidth?: number;
  duration?: string;
  packets?: number;
}

export interface FlowScenario {
  id: string;
  indexLabel: string;
  tabLabel: string;
  summaryTitle: string;
  summary: string;
  tone: FlowTone;
  metricBadge?: string;
  tags: Array<string>;
  activeNodeIds: Array<string>;
  activeEdgeIds: Array<string>;
}

export interface AnimatedFlowDiagramProps {
  title: string;
  subtitle: string;
  viewBoxWidth?: number;
  viewBoxHeight: number;
  zones: Array<FlowZone>;
  nodes: Array<FlowNode>;
  edges: Array<FlowEdge>;
  scenarios: Array<FlowScenario>;
}

const emptySubscribe = () => () => {};

const toneStyles: Record<
  FlowTone,
  {
    edgeStroke: string;
    edgeGlow: string;
    packetFill: string;
    nodeBorderActive: string;
    iconBg: string;
    iconText: string;
    pillBg: string;
    pillText: string;
    dotBg: string;
    arrowColor: string;
  }
> = {
  accent: {
    edgeStroke: 'stroke-accent-500 dark:stroke-accent-400',
    edgeGlow: 'stroke-accent-500/20 dark:stroke-accent-400/20',
    packetFill: 'fill-accent-500 dark:fill-accent-300',
    nodeBorderActive: 'stroke-accent-500 dark:stroke-accent-400',
    iconBg: 'fill-accent-600/10 dark:fill-accent-400/15',
    iconText: 'text-accent-600 dark:text-accent-400',
    pillBg: 'bg-accent-600/[0.08] dark:bg-accent-400/15',
    pillText: 'text-accent-700 dark:text-accent-300',
    dotBg: 'bg-accent-500 dark:bg-accent-400',
    arrowColor: 'text-accent-500 dark:text-accent-400',
  },
  sky: {
    edgeStroke: 'stroke-sky-500 dark:stroke-sky-400',
    edgeGlow: 'stroke-sky-500/20 dark:stroke-sky-400/20',
    packetFill: 'fill-sky-500 dark:fill-sky-300',
    nodeBorderActive: 'stroke-sky-500 dark:stroke-sky-400',
    iconBg: 'fill-sky-500/10 dark:fill-sky-400/15',
    iconText: 'text-sky-600 dark:text-sky-400',
    pillBg: 'bg-sky-500/10 dark:bg-sky-400/15',
    pillText: 'text-sky-700 dark:text-sky-300',
    dotBg: 'bg-sky-500 dark:bg-sky-400',
    arrowColor: 'text-sky-500 dark:text-sky-400',
  },
  emerald: {
    edgeStroke: 'stroke-emerald-500 dark:stroke-emerald-400',
    edgeGlow: 'stroke-emerald-500/20 dark:stroke-emerald-400/20',
    packetFill: 'fill-emerald-500 dark:fill-emerald-300',
    nodeBorderActive: 'stroke-emerald-500 dark:stroke-emerald-400',
    iconBg: 'fill-emerald-500/10 dark:fill-emerald-400/15',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    pillBg: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    pillText: 'text-emerald-700 dark:text-emerald-300',
    dotBg: 'bg-emerald-500 dark:bg-emerald-400',
    arrowColor: 'text-emerald-500 dark:text-emerald-400',
  },
  amber: {
    edgeStroke: 'stroke-amber-500 dark:stroke-amber-400',
    edgeGlow: 'stroke-amber-500/20 dark:stroke-amber-400/20',
    packetFill: 'fill-amber-500 dark:fill-amber-300',
    nodeBorderActive: 'stroke-amber-500 dark:stroke-amber-400',
    iconBg: 'fill-amber-500/10 dark:fill-amber-400/15',
    iconText: 'text-amber-600 dark:text-amber-400',
    pillBg: 'bg-amber-500/10 dark:bg-amber-400/15',
    pillText: 'text-amber-700 dark:text-amber-300',
    dotBg: 'bg-amber-500 dark:bg-amber-400',
    arrowColor: 'text-amber-500 dark:text-amber-400',
  },
};

function renderNodeGlyph(icon: FlowNodeIcon) {
  switch (icon) {
    case 'hardware':
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
          <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
          <path d="M9 1.5v2.5M15 1.5v2.5M9 20v2.5M15 20v2.5M1.5 9h2.5M1.5 15h2.5M20 9h2.5M20 15h2.5" />
        </>
      );
    case 'gateway':
      return (
        <>
          <path d="M5 12h14M12 5l7 7-7 7" />
          <circle cx="5" cy="12" r="2" />
        </>
      );
    case 'database':
      return (
        <>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
          <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
          <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
        </>
      );
    case 'queue':
      return (
        <>
          <rect x="3" y="5" width="18" height="4.5" rx="1.5" />
          <rect x="3" y="14.5" width="18" height="4.5" rx="1.5" />
          <path d="M7 9.5v5M12 9.5v5M17 9.5v5" />
        </>
      );
    case 'search':
      return (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5 5" />
        </>
      );
    case 'ai':
      return (
        <>
          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
          <circle cx="18.5" cy="5" r="1.2" />
        </>
      );
    case 'cloud':
      return (
        <path d="M6.5 18h11a4 4 0 00.7-7.94A5.5 5.5 0 007.4 8.5 4.25 4.25 0 006.5 18z" />
      );
    case 'dashboard':
      return (
        <>
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <path d="M8 20h8M12 17v3M6.5 13l3-3 2.5 2 4.5-4.5" />
        </>
      );
    case 'mobile':
      return (
        <>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 18h3" />
        </>
      );
    case 'shield':
      return (
        <>
          <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.4-7.5 9.5-4.4-1.1-7.5-4.9-7.5-9.5V6L12 3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      );
    case 'canteen':
      return (
        <>
          <path d="M7 3v7a2.5 2.5 0 005 0V3M9.5 3v18M16.5 3v18M16.5 3a3.5 3.5 0 013 3.5V12h-3" />
        </>
      );
    case 'bike':
      return (
        <>
          <circle cx="6" cy="16.5" r="3.2" />
          <circle cx="18" cy="16.5" r="3.2" />
          <path d="M6 16.5l4-7h4.5l3.5 7M10 9.5l-1.5-3h3M14.5 9.5l1-3h2.5" />
        </>
      );
    case 'parking':
      return (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
          <path d="M9.5 16.5V7.5h3.5a2.8 2.8 0 010 5.6H9.5" />
        </>
      );
    case 'lock':
      return (
        <>
          <rect x="5" y="10.5" width="14" height="10" rx="2" />
          <path d="M8 10.5V7.5a4 4 0 018 0v3" />
        </>
      );
    default:
      return null;
  }
}

function AnimatedFlowDiagram({
  title,
  subtitle,
  viewBoxWidth = 760,
  viewBoxHeight,
  zones,
  nodes,
  edges,
  scenarios,
}: AnimatedFlowDiagramProps) {
  const uniqueId = useId().replace(/:/g, '');
  const [activeScenarioId, setActiveScenarioId] = useState(
    scenarios[0]?.id ?? ''
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const prefersReducedMotion = useReducedMotion();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const shouldAnimate = isMounted && isPlaying && !prefersReducedMotion;

  const activeScenario =
    scenarios.find((item) => item.id === activeScenarioId) ?? scenarios[0];

  const selectedNode = selectedNodeId
    ? (nodes.find((item) => item.id === selectedNodeId) ?? null)
    : null;

  if (!activeScenario) return null;

  const activeNodeSet = new Set(activeScenario.activeNodeIds);
  const activeEdgeSet = new Set(activeScenario.activeEdgeIds);

  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setSelectedNodeId(null);
  };

  const inspectorTone = selectedNode ? selectedNode.tone : activeScenario.tone;
  const inspectorToneStyle = toneStyles[inspectorTone];

  return (
    <div
      className={clsx(
        'my-7 overflow-hidden rounded-2xl border border-divider-light bg-white',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      {/* Top Bar */}
      <div
        className={clsx(
          'flex flex-wrap items-center justify-between gap-3 border-b border-divider-light px-4 py-3.5',
          'sm:px-5',
          'dark:border-divider-dark'
        )}
      >
        <div className={clsx('flex flex-col gap-0.5')}>
          <span
            className={clsx(
              'text-sm font-extrabold text-slate-800',
              'dark:text-slate-100'
            )}
          >
            {title}
          </span>
          <span
            className={clsx('text-xs text-slate-500', 'dark:text-slate-400')}
          >
            {subtitle}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-pressed={isPlaying}
          className={clsx(
            'inline-flex items-center gap-2 rounded-full border border-divider-light bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition',
            'hover:border-accent-400 hover:text-accent-600',
            'dark:border-divider-dark dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-accent-500 dark:hover:text-accent-400'
          )}
        >
          <span
            className={clsx(
              'h-2 w-2 rounded-full transition-colors',
              shouldAnimate
                ? 'animate-pulse bg-emerald-500 dark:bg-emerald-400'
                : 'bg-slate-400 dark:bg-slate-500'
            )}
          />
          <span>{isPlaying ? '数据流演示中' : '已暂停动画'}</span>
        </button>
      </div>

      {/* Interactive Scenario Selector */}
      <div
        role="tablist"
        aria-label={`${title} 链路切换`}
        className={clsx(
          'flex flex-wrap items-center gap-2 border-b border-divider-light bg-slate-50/80 px-4 py-3',
          'sm:px-5',
          'dark:border-divider-dark dark:bg-slate-900/70'
        )}
      >
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;
          const style = toneStyles[scenario.tone];

          return (
            <button
              key={scenario.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectScenario(scenario.id)}
              className={clsx(
                'inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition',
                isActive
                  ? [
                      'border-accent-400 bg-white text-slate-800 shadow-xs',
                      'dark:border-accent-400/80 dark:bg-slate-800 dark:text-slate-100',
                    ]
                  : [
                      'border-transparent bg-transparent text-slate-600',
                      'hover:border-divider-light hover:bg-white/70 hover:text-slate-800',
                      'dark:text-slate-400 dark:hover:border-divider-dark dark:hover:bg-slate-800/50 dark:hover:text-slate-200',
                    ]
              )}
            >
              <span
                className={clsx(
                  'inline-flex h-4.5 min-w-5 items-center justify-center rounded-md px-1 font-mono text-[10px] font-bold',
                  isActive
                    ? [style.pillBg, style.pillText]
                    : 'bg-slate-200/70 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                {scenario.indexLabel}
              </span>
              <span>{scenario.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* SVG Flowchart Stage */}
      <div
        className={clsx(
          'relative overflow-x-auto bg-slate-50/50 px-2 py-3',
          'sm:px-3 sm:py-4',
          'dark:bg-[#0c1222]'
        )}
      >
        <div className={clsx('min-w-[660px]')}>
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className={clsx('block h-auto w-full select-none')}
            role="img"
            aria-label={`${title} — ${activeScenario.tabLabel}`}
          >
            <defs>
              <pattern
                id={`grid-${uniqueId}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  className={clsx('fill-slate-300/60 dark:fill-slate-700/45')}
                />
              </pattern>

              <filter
                id={`packet-glow-${uniqueId}`}
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <marker
                id={`arrow-muted-${uniqueId}`}
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 1.5 L 9 5 L 0 8.5 z"
                  className={clsx('fill-slate-300 dark:fill-slate-700')}
                />
              </marker>

              {(['accent', 'sky', 'emerald', 'amber'] as const).map((tone) => (
                <marker
                  key={tone}
                  id={`arrow-${tone}-${uniqueId}`}
                  viewBox="0 0 10 10"
                  refX="8.5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 1.5 L 9 5 L 0 8.5 z"
                    fill="currentColor"
                    className={toneStyles[tone].arrowColor}
                  />
                </marker>
              ))}
            </defs>

            {/* Subtle Blueprint Dot Grid */}
            <rect
              x="0"
              y="0"
              width={viewBoxWidth}
              height={viewBoxHeight}
              rx="12"
              fill={`url(#grid-${uniqueId})`}
            />

            {/* Layer Zones */}
            {zones.map((zone) => (
              <g key={zone.id}>
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.width}
                  height={zone.height}
                  rx="14"
                  className={clsx(
                    'fill-white/55 stroke-slate-200/90',
                    'dark:fill-slate-900/45 dark:stroke-slate-800/90'
                  )}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={zone.x + 12}
                  y={zone.y + 18}
                  fontSize="10.5"
                  fontWeight="700"
                  className={clsx(
                    'fill-slate-400 font-sans tracking-wide',
                    'dark:fill-slate-500'
                  )}
                >
                  {zone.label}
                </text>
              </g>
            ))}

            {/* Inactive Edges First */}
            {edges
              .filter((edge) => !activeEdgeSet.has(edge.id))
              .map((edge) => (
                <g key={edge.id} opacity={0.42}>
                  <path
                    d={edge.path}
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={`url(#arrow-muted-${uniqueId})`}
                    className={clsx('stroke-slate-300 dark:stroke-slate-700')}
                  />
                </g>
              ))}

            {/* Active Edges with Animated Flow & Glowing Packets */}
            {edges
              .filter((edge) => activeEdgeSet.has(edge.id))
              .map((edge) => {
                const style = toneStyles[edge.tone];
                const duration = edge.duration ?? '2.4s';
                const packetCount = edge.packets ?? 2;
                const durationSeconds = parseFloat(duration) || 2.4;

                return (
                  <g key={`${activeScenario.id}-${edge.id}`}>
                    <path
                      d={edge.path}
                      fill="none"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={style.edgeGlow}
                    />
                    <path
                      d={edge.path}
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd={`url(#arrow-${edge.tone}-${uniqueId})`}
                      className={clsx(
                        style.edgeStroke,
                        shouldAnimate && 'diagram-edge-animated'
                      )}
                    />

                    {shouldAnimate &&
                      Array.from({ length: packetCount }).map((_, idx) => {
                        const beginDelay =
                          idx === 0
                            ? '0s'
                            : `${((durationSeconds / packetCount) * idx).toFixed(2)}s`;

                        return (
                          <circle
                            key={`${edge.id}-pkt-${idx}`}
                            r="3.4"
                            filter={`url(#packet-glow-${uniqueId})`}
                            className={style.packetFill}
                          >
                            <animateMotion
                              dur={duration}
                              repeatCount="indefinite"
                              begin={beginDelay}
                              path={edge.path}
                            />
                          </circle>
                        );
                      })}
                  </g>
                );
              })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isActive = activeNodeSet.has(node.id);
              const isSelected = selectedNodeId === node.id;
              const style = toneStyles[node.tone];

              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.title}：${node.subtitle}`}
                  onClick={() =>
                    setSelectedNodeId((prev) =>
                      prev === node.id ? null : node.id
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedNodeId((prev) =>
                        prev === node.id ? null : node.id
                      );
                    }
                  }}
                  style={{
                    opacity: isActive || isSelected ? 1 : 0.42,
                    transition: 'opacity 220ms ease',
                  }}
                  className={clsx('cursor-pointer outline-hidden')}
                >
                  {/* Selection Halo */}
                  {isSelected && (
                    <rect
                      x={node.x - 3.5}
                      y={node.y - 3.5}
                      width={node.width + 7}
                      height={node.height + 7}
                      rx="14.5"
                      fill="none"
                      strokeWidth="2"
                      className={clsx(style.nodeBorderActive, 'opacity-45')}
                    />
                  )}

                  {/* Card Background */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="11"
                    strokeWidth={isSelected ? '2' : isActive ? '1.5' : '1'}
                    className={clsx(
                      'fill-white transition-colors dark:fill-slate-900',
                      isActive || isSelected
                        ? style.nodeBorderActive
                        : 'stroke-slate-200 dark:stroke-slate-700'
                    )}
                  />

                  {/* Icon Badge */}
                  <rect
                    x={node.x + 9}
                    y={node.y + (node.height - 26) / 2}
                    width="26"
                    height="26"
                    rx="7.5"
                    className={clsx(
                      isActive || isSelected
                        ? style.iconBg
                        : 'fill-slate-100 dark:fill-slate-800'
                    )}
                  />
                  <svg
                    x={node.x + 14.5}
                    y={node.y + (node.height - 15) / 2}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={clsx(
                      isActive || isSelected
                        ? style.iconText
                        : 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {renderNodeGlyph(node.icon)}
                  </svg>

                  {/* Node Title */}
                  <text
                    x={node.x + 42}
                    y={node.y + node.height / 2 - 4}
                    fontSize="11.5"
                    fontWeight="700"
                    className={clsx(
                      'fill-slate-800 font-sans',
                      'dark:fill-slate-100'
                    )}
                  >
                    {node.title}
                  </text>

                  {/* Node Subtitle */}
                  <text
                    x={node.x + 42}
                    y={node.y + node.height / 2 + 12}
                    fontSize="9.5"
                    className={clsx(
                      'fill-slate-500 font-mono',
                      'dark:fill-slate-400'
                    )}
                  >
                    {node.subtitle}
                  </text>

                  {/* Active Live Telemetry Dot */}
                  {isActive && (
                    <g>
                      <circle
                        cx={node.x + node.width - 9}
                        cy={node.y + 9}
                        r="2.6"
                        className={style.packetFill}
                      />
                      {shouldAnimate && (
                        <circle
                          cx={node.x + node.width - 9}
                          cy={node.y + 9}
                          r="2.6"
                          className={clsx(style.packetFill, 'opacity-40')}
                        >
                          <animate
                            attributeName="r"
                            values="2.6;6.5;2.6"
                            dur="2.2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.5;0;0.5"
                            dur="2.2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  )}
                </g>
              );
            })}

            {/* Active Edge Labels Rendered On Top */}
            {edges
              .filter(
                (edge) =>
                  activeEdgeSet.has(edge.id) &&
                  edge.label &&
                  edge.labelX !== undefined &&
                  edge.labelY !== undefined
              )
              .map((edge) => {
                const style = toneStyles[edge.tone];
                const pillWidth =
                  edge.labelWidth ??
                  Math.max(58, (edge.label?.length ?? 4) * 11 + 14);
                const x = (edge.labelX ?? 0) - pillWidth / 2;
                const y = (edge.labelY ?? 0) - 10;

                return (
                  <g key={`label-${edge.id}`} className="pointer-events-none">
                    <rect
                      x={x}
                      y={y}
                      width={pillWidth}
                      height="20"
                      rx="6"
                      strokeWidth="1"
                      className={clsx(
                        'fill-white/95 dark:fill-slate-900/95',
                        style.nodeBorderActive
                      )}
                    />
                    <text
                      x={edge.labelX}
                      y={(edge.labelY ?? 0) + 3.5}
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="600"
                      className={clsx(
                        'font-mono',
                        style.iconText,
                        'fill-current'
                      )}
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Mobile Scroll Cue */}
        <div
          className={clsx(
            'mt-1.5 flex items-center justify-between px-2 text-[11px] text-slate-400',
            'sm:hidden',
            'dark:text-slate-500'
          )}
        >
          <span>左右滑动查看完整架构流向</span>
          <span>点击任意节点查看细节</span>
        </div>
      </div>

      {/* Bottom Interactive Inspector Footer */}
      <div
        className={clsx(
          'border-t border-divider-light bg-white px-4 py-4',
          'sm:px-5',
          'dark:border-divider-dark dark:bg-slate-900'
        )}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={
              selectedNode
                ? `node-${selectedNode.id}`
                : `sc-${activeScenario.id}`
            }
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className={clsx('flex flex-col gap-2.5')}
          >
            <div
              className={clsx(
                'flex flex-wrap items-center justify-between gap-2'
              )}
            >
              <div className={clsx('flex flex-wrap items-center gap-2')}>
                <span
                  className={clsx(
                    'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                    inspectorToneStyle.pillBg,
                    inspectorToneStyle.pillText
                  )}
                >
                  <span
                    className={clsx(
                      'h-1.5 w-1.5 rounded-full',
                      inspectorToneStyle.dotBg
                    )}
                  />
                  {selectedNode
                    ? '节点详情'
                    : `链路 ${activeScenario.indexLabel}`}
                </span>
                <span
                  className={clsx(
                    'text-sm font-bold text-slate-800',
                    'dark:text-slate-100'
                  )}
                >
                  {selectedNode
                    ? selectedNode.detailTitle || selectedNode.title
                    : activeScenario.summaryTitle}
                </span>
              </div>

              <div className={clsx('flex items-center gap-2')}>
                {(selectedNode?.detailMetric || activeScenario.metricBadge) && (
                  <span
                    className={clsx(
                      'rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent-600',
                      'dark:bg-slate-800 dark:text-accent-400'
                    )}
                  >
                    {selectedNode?.detailMetric ?? activeScenario.metricBadge}
                  </span>
                )}
                {selectedNode && (
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(null)}
                    className={clsx(
                      'rounded-md border border-divider-light px-2 py-0.5 text-[11px] font-medium text-slate-500 transition',
                      'hover:border-accent-400 hover:text-accent-600',
                      'dark:border-divider-dark dark:text-slate-400 dark:hover:text-accent-400'
                    )}
                  >
                    返回链路总览
                  </button>
                )}
              </div>
            </div>

            <div
              className={clsx(
                'text-xs leading-relaxed text-slate-600',
                'dark:text-slate-400'
              )}
            >
              {selectedNode
                ? selectedNode.detailDescription
                : activeScenario.summary}
            </div>

            <div
              className={clsx(
                'flex flex-wrap items-center justify-between gap-2 pt-0.5'
              )}
            >
              <div className={clsx('flex flex-wrap items-center gap-1.5')}>
                {(selectedNode
                  ? selectedNode.detailTags
                  : activeScenario.tags
                ).map((tag) => (
                  <span
                    key={tag}
                    className={clsx(
                      'rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600',
                      'dark:bg-slate-800 dark:text-slate-400'
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className={clsx(
                  'hidden text-[11px] text-slate-400',
                  'sm:inline',
                  'dark:text-slate-500'
                )}
              >
                点击架构节点可查看模块职责
              </span>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnimatedFlowDiagram;
