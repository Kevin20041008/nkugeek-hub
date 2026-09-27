export interface MetricEntry {
  label: string;
  value: string;
}

export interface PaperReproductionCard {
  slug: string;
  title: string;
  venue: string;
  status: string;
  focus: string;
  owner: string;
  authors: string;
  experimentCount: number;
  metricSummary: string;
}

export interface PaperDataset {
  id: string;
  name: string;
  url: string;
  license: string;
  split: string;
  notes: string;
}

export interface ReproductionExperiment {
  id: string;
  title: string;
  environment: string;
  seed: string;
  baselineMetric: string;
  currentMetric: string;
  status: string;
  log: string;
  runAt: string;
}

export interface ReproductionIssue {
  id: string;
  title: string;
  severity: string;
  status: string;
  notes: string;
}

export interface ReproductionReport {
  id: string;
  title: string;
  reportUrl: string;
  summary: string;
  status: string;
  createdAt: string;
}

export interface PaperReproductionDetail extends PaperReproductionCard {
  pdfUrl: string;
  codeUrl: string;
  shareAt: string;
  environment: string;
  dataset: string;
  reportUrl: string;
  originalMetrics: MetricEntry[];
  currentMetrics: MetricEntry[];
  datasets: PaperDataset[];
  experiments: ReproductionExperiment[];
  issues: ReproductionIssue[];
  reports: ReproductionReport[];
}

const paperDetails: PaperReproductionDetail[] = [
  {
    slug: "segment-anything",
    title: "Segment Anything",
    venue: "ICCV 2023",
    status: "复现中",
    focus: "Promptable Segmentation、数据引擎、ViT-B 基线和迁移评估。",
    owner: "CV 与多模态组",
    authors: "Alexander Kirillov et al.",
    experimentCount: 1,
    metricSummary: "mIoU 84.7 / 论文 86.0",
    pdfUrl: "https://arxiv.org/abs/2304.02643",
    codeUrl: "https://github.com/facebookresearch/segment-anything",
    shareAt: "2026-10-17",
    environment: "Python 3.11 / PyTorch 2.3 / CUDA 12.1 / ViT-B baseline",
    dataset: "SA-1B 子集 + COCO zero-shot 验证集",
    reportUrl: "https://github.com/NKUGeek/reproduction-lab/reports/sam-week-01.md",
    originalMetrics: [{ label: "mIoU", value: "86.0" }],
    currentMetrics: [{ label: "mIoU", value: "84.7" }],
    datasets: [
      {
        id: "sa1b-subset",
        name: "SA-1B subset",
        url: "https://ai.meta.com/datasets/segment-anything/",
        license: "Research license",
        split: "train 10k / val 1k",
        notes: "第一阶段抽样验证数据管线和 prompt 采样策略。",
      },
    ],
    experiments: [
      {
        id: "vit-b-baseline",
        title: "ViT-B baseline inference",
        environment: "A100 40GB / batch size 8 / mixed precision",
        seed: "42",
        baselineMetric: "论文报告 mIoU 86.0",
        currentMetric: "当前 mIoU 84.7",
        status: "running",
        log: "已跑通预处理、模型加载和 mask 评估脚本，下一步检查输入 resize 和后处理。",
        runAt: "2026-09-26",
      },
    ],
    issues: [
      {
        id: "gpu-memory",
        title: "显存峰值超过课程 GPU 配置",
        severity: "high",
        status: "investigating",
        notes: "需要评估裁剪输入、降低 batch size 或改用 tiled inference。",
      },
    ],
    reports: [
      {
        id: "sam-report-01",
        title: "SAM 复现周报 01",
        reportUrl: "https://github.com/NKUGeek/reproduction-lab/reports/sam-week-01.md",
        summary: "记录环境配置、数据子集、首轮指标和阻塞问题。",
        status: "review",
        createdAt: "2026-09-26",
      },
    ],
  },
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    venue: "NeurIPS 2017",
    status: "模板整理",
    focus: "Transformer 结构、训练配置、指标复现和可复用实验模板。",
    owner: "AI 与大模型组",
    authors: "Ashish Vaswani et al.",
    experimentCount: 0,
    metricSummary: "BLEU 指标待跑",
    pdfUrl: "https://arxiv.org/abs/1706.03762",
    codeUrl: "https://github.com/tensorflow/tensor2tensor",
    shareAt: "2026-10-24",
    environment: "Python / PyTorch / tokenizer baseline 待确认",
    dataset: "WMT14 En-De",
    reportUrl: "",
    originalMetrics: [{ label: "BLEU", value: "27.5" }],
    currentMetrics: [{ label: "BLEU", value: "待复现" }],
    datasets: [],
    experiments: [],
    issues: [],
    reports: [],
  },
  {
    slug: "dqn",
    title: "DQN",
    venue: "Nature 2015",
    status: "日志中",
    focus: "强化学习基线、随机种子、环境版本和训练曲线波动记录。",
    owner: "强化学习小组",
    authors: "Volodymyr Mnih et al.",
    experimentCount: 0,
    metricSummary: "Atari score 待对齐",
    pdfUrl: "https://www.nature.com/articles/nature14236",
    codeUrl: "",
    shareAt: "2026-10-31",
    environment: "Gymnasium / PyTorch / Atari ROM",
    dataset: "Atari 2600 环境",
    reportUrl: "",
    originalMetrics: [{ label: "Human-normalized score", value: "论文指标" }],
    currentMetrics: [{ label: "Human-normalized score", value: "待跑" }],
    datasets: [],
    experiments: [],
    issues: [],
    reports: [],
  },
];

export function getStaticPaperSlugs(): string[] {
  return paperDetails.map((paper) => paper.slug);
}

export async function getPaperReproductionCards(): Promise<PaperReproductionCard[]> {
  return paperDetails.map((paper) => ({
    slug: paper.slug,
    title: paper.title,
    venue: paper.venue,
    status: paper.status,
    focus: paper.focus,
    owner: paper.owner,
    authors: paper.authors,
    experimentCount: paper.experimentCount,
    metricSummary: paper.metricSummary,
  }));
}

export async function getPaperReproductionDetail(slug: string): Promise<PaperReproductionDetail> {
  return paperDetails.find((paper) => paper.slug === slug) ?? paperDetails[0];
}
