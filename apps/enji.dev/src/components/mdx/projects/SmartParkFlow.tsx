'use client';

import AnimatedFlowDiagram from '@/components/mdx/projects/AnimatedFlowDiagram';

import type {
  FlowEdge,
  FlowNode,
  FlowScenario,
  FlowZone,
} from '@/components/mdx/projects/AnimatedFlowDiagram';

const zones: Array<FlowZone> = [
  {
    id: 'z1',
    label: '01 · 园区终端与入口',
    x: 10,
    y: 12,
    width: 160,
    height: 328,
  },
  {
    id: 'z2',
    label: '02 · 接入与并发引擎',
    x: 224,
    y: 12,
    width: 160,
    height: 328,
  },
  {
    id: 'z3',
    label: '03 · 核心业务与媒体',
    x: 438,
    y: 12,
    width: 160,
    height: 328,
  },
  {
    id: 'z4',
    label: '04 · 大屏与经营决策',
    x: 652,
    y: 12,
    width: 158,
    height: 328,
  },
];

const nodes: Array<FlowNode> = [
  // Row 1: IoT Monitoring & Digital Twin
  {
    id: 'park-iot',
    x: 16,
    y: 48,
    width: 148,
    height: 64,
    title: '100+ 物联终端',
    subtitle: '传感·能耗·车位硬件',
    icon: 'hardware',
    tone: 'sky',
    detailTitle: '园区百级异构物联网终端统一接入源',
    detailDescription:
      '聚合园区内除门禁系统外的 100+ 台多类型物联网终端，涵盖安防监控点位、水电能耗采集器、环境传感及地磁/道闸车位终端，彻底打破子系统数据孤岛。',
    detailTags: ['100+ 物联设备', '水电能耗', '安防传感', '车位终端'],
    detailMetric: '统一归集 100+ 终端',
  },
  {
    id: 'park-netty',
    x: 230,
    y: 48,
    width: 148,
    height: 64,
    title: 'Netty 采集接入层',
    subtitle: '长连接·离线告警',
    icon: 'gateway',
    tone: 'sky',
    detailTitle: 'Netty 园区设备长连接与心跳监测层',
    detailDescription:
      '维护园区各类智能硬件长连接通道，实时解析设备运行心跳与异常报文，自动识别离线设备并即时生成告警事件，替代人工逐楼巡检。',
    detailTags: ['Netty', '心跳状态监测', '异常离线告警'],
    detailMetric: '设备运维提效 30%',
  },
  {
    id: 'iot-engine',
    x: 444,
    y: 48,
    width: 148,
    height: 64,
    title: '状态归集与推送',
    subtitle: 'Socket.IO 实时推',
    icon: 'cloud',
    tone: 'sky',
    detailTitle: '实时状态聚合与 Socket.IO 全双工推送引擎',
    detailDescription:
      '基于 Spring Boot + Redis 汇总各楼宇设备在线率、车位余量与能耗曲线，通过 Socket.IO 毫秒级主动推送至大屏前端，免除高负载定时轮询。',
    detailTags: ['Spring Boot', 'Redis', 'Socket.IO', '全双工推送'],
    detailMetric: '状态毫秒级触达大屏',
  },
  {
    id: 'twin-screen',
    x: 658,
    y: 48,
    width: 146,
    height: 64,
    title: '3D 数字孪生大屏',
    subtitle: '园区概览·安防·能耗',
    icon: 'dashboard',
    tone: 'sky',
    detailTitle: '“泰山发展投资智慧园区”三维态势指挥大屏',
    detailDescription:
      '以园区 3D 模型为核心承载空间态势感知，一屏实时展示安防监控在线状态、水电能耗趋势、当日来访车辆与实时车位使用率。',
    detailTags: ['3D 数字孪生', '园区概览', '安防态势', '能耗监测'],
  },

  // Row 2: Smart Canteen & Transparent Kitchen
  {
    id: 'canteen-in',
    x: 16,
    y: 148,
    width: 148,
    height: 64,
    title: '小程序 & 刷脸机',
    subtitle: '核验·投票·就餐刷脸',
    icon: 'canteen',
    tone: 'emerald',
    detailTitle: '员工小程序身份核验 + 人脸识别消费机',
    detailDescription:
      '打通园区小程序快捷登录、员工手机号绑定核验与菜品互动投票，同步经 Netty 实时归集食堂人脸识别消费机刷脸就餐记录，服务 1000+ 人次日常就餐。',
    detailTags: ['微信小程序', '手机号核验', '人脸识别消费机', '投票选菜'],
    detailMetric: '1000+ 人次日常就餐',
  },
  {
    id: 'canteen-svc',
    x: 230,
    y: 148,
    width: 148,
    height: 64,
    title: '智慧餐厨核算',
    subtitle: 'MySQL 账务与菜谱',
    icon: 'database',
    tone: 'emerald',
    detailTitle: '餐厨消费核算与动态菜单生成服务',
    detailDescription:
      '基于员工每日餐评与投票数据辅助排菜备餐减少浪费，并在 MySQL 中沉淀个人/部门就餐消费流水，自动汇总生成可一键导出的周度与月度核算报表。',
    detailTags: ['MySQL', '本月餐评', '周/月核算报表', '精准备餐'],
  },
  {
    id: 'kitchen-cam',
    x: 444,
    y: 148,
    width: 148,
    height: 64,
    title: '20 路后厨视频流',
    subtitle: '明厨亮灶实时轮巡',
    icon: 'shield',
    tone: 'emerald',
    detailTitle: '后厨 20 路监控视频流统一接入与轮巡',
    detailDescription:
      '餐厨可视化大屏每日实时接入并分屏轮巡展示 20 路后厨操作间、洗消区与备餐区监控视频流，助力园区食品安全透明化与后厨精细化监管。',
    detailTags: ['20 路视频流', '分屏轮巡', '明厨亮灶', '食安监管'],
    detailMetric: '20 路后厨透明监管',
  },
  {
    id: 'canteen-board',
    x: 658,
    y: 148,
    width: 146,
    height: 64,
    title: '餐厨大屏 & 报表',
    subtitle: '食安监管·一键导出',
    icon: 'dashboard',
    tone: 'emerald',
    detailTitle: '智慧餐厨透明大屏与自动经营报表',
    detailDescription:
      '向管理层与员工直观展示后厨实况、就餐人次高峰分布与菜品满意度排行，支持按周期自动导出精细化后勤餐饮成本核算报表。',
    detailTags: ['餐厨可视化大屏', '就餐热度统计', '自动报表导出'],
  },

  // Row 3: Peak Visitor Parking Reservation
  {
    id: 'visitor-mp',
    x: 16,
    y: 248,
    width: 148,
    height: 64,
    title: '访客车位预约端',
    subtitle: '高峰 500+ 请求/h',
    icon: 'mobile',
    tone: 'accent',
    detailTitle: '来访车辆线上登记与车位预约小程序',
    detailDescription:
      '来访客人及内部接待人员通过园区小程序提前填报车牌与来访时段发起车位预约，结合园区导航与智能寻车功能消除入园拥堵与寻位耗时。',
    detailTags: ['访客预约', '预约审批', '园区导航', '智能寻车'],
    detailMetric: '高峰 500+ 次/小时',
  },
  {
    id: 'redis-lock',
    x: 230,
    y: 248,
    width: 148,
    height: 64,
    title: 'Redis 原子锁',
    subtitle: '时段配额防并发超卖',
    icon: 'lock',
    tone: 'accent',
    detailTitle: '基于 Redis 原子锁与时段配额的并发治理',
    detailDescription:
      '针对早高峰集中预约瞬间并发峰值，通过 Redis 原子锁与分时段车位配额扣减机制保障锁位严格互斥，避免重复超卖同时维持极低接口响应延迟。',
    detailTags: ['Redis 原子锁', '时段配额控制', '防并发超卖'],
    detailMetric: '早高峰高并发稳态',
  },
  {
    id: 'spot-sync',
    x: 444,
    y: 248,
    width: 148,
    height: 64,
    title: '车位动态联动',
    subtitle: '入离场自动状态释放',
    icon: 'parking',
    tone: 'accent',
    detailTitle: '预约单与现场道闸/车位终端状态联动',
    detailDescription:
      '审批通过后自动下发白名单至道闸放行；实时感知车辆入位与离场事件，针对爽约超时或提前离场车辆自动释放车位回池，最大化车位周转率。',
    detailTags: ['道闸联动放行', '动态释放回池', '周转优化'],
    detailMetric: '车位利用率 +20%',
  },
  {
    id: 'ops-report',
    x: 658,
    y: 248,
    width: 146,
    height: 64,
    title: '全域经营分析',
    subtitle: '物联·餐厨·停车报表',
    icon: 'cloud',
    tone: 'accent',
    detailTitle: '园区全域数字化经营数据一键导出',
    detailDescription:
      '汇聚物联设备健康、智慧餐厨核算与园区车位周转三大核心域经营指标，为物业与管理层提供一键式周期经营分析报表与决策支撑。',
    detailTags: ['全域数据融合', '一键报表导出', '管理决策支持'],
  },
];

const edges: Array<FlowEdge> = [
  // Scenario 1: IoT -> Netty -> Socket.IO -> 3D Digital Twin
  {
    id: 'e-iot-netty',
    path: 'M 164 80 L 230 80',
    tone: 'sky',
    label: '设备上报',
    labelX: 197,
    labelY: 66,
    labelWidth: 52,
    duration: '1.8s',
    packets: 2,
  },
  {
    id: 'e-netty-engine',
    path: 'M 378 80 L 444 80',
    tone: 'sky',
    label: '状态归集',
    labelX: 411,
    labelY: 66,
    labelWidth: 52,
    duration: '1.8s',
    packets: 2,
  },
  {
    id: 'e-engine-twin',
    path: 'M 592 80 L 658 80',
    tone: 'sky',
    label: 'Socket.IO',
    labelX: 625,
    labelY: 66,
    labelWidth: 58,
    duration: '1.7s',
    packets: 2,
  },

  // Scenario 2: Smart Canteen & 20-channel Kitchen Video
  {
    id: 'e-canteen-svc',
    path: 'M 164 180 L 230 180',
    tone: 'emerald',
    label: '刷脸核验',
    labelX: 197,
    labelY: 166,
    labelWidth: 52,
    duration: '1.9s',
    packets: 2,
  },
  {
    id: 'e-svc-cam',
    path: 'M 378 180 L 444 180',
    tone: 'emerald',
    label: '融合监管',
    labelX: 411,
    labelY: 166,
    labelWidth: 52,
    duration: '1.9s',
    packets: 2,
  },
  {
    id: 'e-cam-board',
    path: 'M 592 180 L 658 180',
    tone: 'emerald',
    label: '20路轮巡',
    labelX: 625,
    labelY: 166,
    labelWidth: 56,
    duration: '1.9s',
    packets: 2,
  },

  // Scenario 3: Visitor Parking -> Redis Lock -> Dynamic Release -> Twin & Report
  {
    id: 'e-visitor-redis',
    path: 'M 164 280 L 230 280',
    tone: 'accent',
    label: '500+/h',
    labelX: 197,
    labelY: 266,
    labelWidth: 50,
    duration: '1.7s',
    packets: 2,
  },
  {
    id: 'e-redis-spot',
    path: 'M 378 280 L 444 280',
    tone: 'accent',
    label: '锁位配额',
    labelX: 411,
    labelY: 266,
    labelWidth: 52,
    duration: '1.8s',
    packets: 2,
  },
  {
    id: 'e-spot-report',
    path: 'M 592 280 L 658 280',
    tone: 'accent',
    label: '全域汇总',
    labelX: 625,
    labelY: 266,
    labelWidth: 52,
    duration: '1.9s',
    packets: 2,
  },
  {
    id: 'e-spot-twin',
    path: 'M 592 264 C 625 264, 625 96, 658 96',
    tone: 'accent',
    label: '余位刷新',
    labelX: 625,
    labelY: 218,
    labelWidth: 52,
    duration: '2.3s',
    packets: 2,
  },
];

const scenarios: Array<FlowScenario> = [
  {
    id: 'iot-realtime',
    indexLabel: '01',
    tabLabel: '百级物联与实时大屏',
    summaryTitle: 'Netty 采集 + Socket.IO 毫秒推送，构建园区 3D 数字孪生底座',
    summary:
      '统一归集园区 100+ 台多类型物联网终端状态，通过 Netty 长连接与异常离线告警引擎汇总至服务端，经 Socket.IO 毫秒级主动推送至三维监控大屏，推动园区日常设备运维效率提升 30%。',
    tone: 'sky',
    metricBadge: '100+ 终端 · 运维提效 30%',
    tags: ['Netty', 'Socket.IO', 'Spring Boot', 'Redis', '3D 数字孪生'],
    activeNodeIds: ['park-iot', 'park-netty', 'iot-engine', 'twin-screen'],
    activeEdgeIds: ['e-iot-netty', 'e-netty-engine', 'e-engine-twin'],
  },
  {
    id: 'smart-canteen',
    indexLabel: '02',
    tabLabel: '智慧餐厨与明厨亮灶',
    summaryTitle: '千人级员工就餐核验核算 + 20 路后厨视频透明化轮巡',
    summary:
      '串联小程序员工登录绑定、互动投票选菜与人脸识别消费机刷脸归集，稳定支撑 1000+ 人次日常就餐登记与周/月报表自动导出；大屏每日实时轮巡 20 路后厨监控视频流，强化食品安全监管。',
    tone: 'emerald',
    metricBadge: '1000+ 人次 · 20 路后厨流',
    tags: ['人脸识别消费机', '小程序核验', 'MySQL 核算', '20 路视频轮巡'],
    activeNodeIds: [
      'canteen-in',
      'canteen-svc',
      'kitchen-cam',
      'canteen-board',
    ],
    activeEdgeIds: ['e-canteen-svc', 'e-svc-cam', 'e-cam-board'],
  },
  {
    id: 'visitor-parking',
    indexLabel: '03',
    tabLabel: '高峰访客预约与车位联动',
    summaryTitle: 'Redis 原子锁扛住高峰 500+/h 预约，车位动态释放利用率 +20%',
    summary:
      '借助 Redis 原子锁与时段配额控制优化来访早高峰并发预约体验，并与现场车位状态及 3D 大屏动态联动，实现离场/超时自动回池释放与全域经营报表一键导出。',
    tone: 'accent',
    metricBadge: '500+/h 并发 · 利用率 +20%',
    tags: ['Redis 原子锁', '时段配额', '车位动态释放', 'Socket.IO 联动'],
    activeNodeIds: [
      'visitor-mp',
      'redis-lock',
      'spot-sync',
      'ops-report',
      'twin-screen',
    ],
    activeEdgeIds: [
      'e-visitor-redis',
      'e-redis-spot',
      'e-spot-report',
      'e-spot-twin',
    ],
  },
];

function SmartParkFlow() {
  return (
    <AnimatedFlowDiagram
      title="泰发展智慧园区 · 物联实时推送与三大业务闭环架构流"
      subtitle="切换查看百级物联终端大屏推送、智慧餐厨明厨亮灶及高峰访客车位预约的完整执行路径"
      viewBoxWidth={820}
      viewBoxHeight={352}
      zones={zones}
      nodes={nodes}
      edges={edges}
      scenarios={scenarios}
    />
  );
}

export default SmartParkFlow;
