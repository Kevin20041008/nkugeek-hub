export const labRepository = "https://github.com/Kevin20041008/nkugeek-hub";
export const courseSlug = "python-engineering";
export const coursePath = "/learn/" + courseSlug;
export const courseSource = labRepository + "/tree/main/public/labs/" + courseSlug;

export interface LabLesson {
  slug: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  goals: string[];
  prerequisites: string[];
  concepts: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  sourceFiles: string[];
  testFiles: string[];
  run: string;
  test: string;
  expected: string;
  testCount: number;
  checks: string[];
  errors: { symptom: string; fix: string }[];
  issue: { number: number | null; title: string; acceptance: string[] };
  references: { title: string; url: string }[];
}

export const labLessons: LabLesson[] = [
  {
    slug: "data-validation",
    number: "01",
    title: "数据建模与输入校验",
    description: "把一行原始记录变成有明确类型和约束的学习记录。",
    duration: "45 分钟",
    goals: ["配置独立 Python 环境，运行第一个实验。", "用 dataclass 表达日期、项目和投入时间。", "为缺失字段和非法输入定义稳定的错误行为。"],
    prerequisites: ["能使用变量、函数和字典。", "知道字符串与整数的区别。无需 CSV 或测试框架经验。"],
    concepts: [
      { title: "先约定输入，再实现函数", body: "输入字典的三个值都来自文本：date 使用 YYYY-MM-DD，project 去除首尾空格后不能为空，minutes 只接受大于零的十进制整数。把这份约定写进测试，函数就有可验证的边界。" },
      { title: "解析与展示分离", body: "parse_row 只返回 Session，失败时抛出 ValueError，不直接打印。后续 CSV 读取器和命令行可以复用它，并决定怎样向使用者解释错误。frozen=True 防止解析完成的记录被意外修改。" },
    ],
    steps: [
      { title: "运行基线", body: "解压完整课程包，在包含 lab01.py 的目录创建虚拟环境。执行本页运行命令，确认输出日期、项目和 45 min。" },
      { title: "逐层阅读校验", body: "依次定位 required、date.fromisoformat、strip 和 minutes 转换。尝试把示例的 minutes 改为 -1，观察 ValueError，再恢复示例。" },
      { title: "完成独立练习", body: "在本地草稿里重新实现 parse_row，再和完整实现对照。不要只改期望结果来让测试通过；解释为什么 20260928 和 1.5 都应该被拒绝。" },
    ],
    sourceFiles: ["lab01.py"],
    testFiles: ["test_lab01.py"],
    run: "lab01.py",
    test: "-m unittest test_lab01 -v",
    expected: "2026-09-28 | python | 45 min",
    testCount: 6,
    checks: ["已在 Python 3.11+ 环境运行 lab01.py。", "6 个测试全部通过，能解释正例和异常断言。", "能独立写出一条新的非法日期测试。"],
    errors: [
      { symptom: "python 或 py 命令不存在", fix: "安装 Python 3.11+ 后重新打开终端。Windows 用 py -3，macOS / Linux 用 python3；先检查版本。" },
      { symptom: "ModuleNotFoundError: lab01", fix: "进入包含全部实验文件的 python-engineering 目录，再执行测试命令。不要在仓库根目录运行单模块测试。" },
      { symptom: "ValueError: minutes must be a positive integer", fix: "检查是否输入了 0、负数、小数或文字。这个错误代表约定正在生效，不应把异常全部吞掉。" },
    ],
    issue: { number: 1, title: "为输入校验补充边界测试", acceptance: ["新增有效闰日与无效闰日测试。", "新增非 ASCII 数字输入测试，保持当前输入约定。", "原有测试全部通过，PR 说明每个新增边界。"] },
    references: [
      { title: "Python · 虚拟环境", url: "https://docs.python.org/3/library/venv.html" },
      { title: "Python · dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" },
    ],
  },
  {
    slug: "csv-pipeline",
    number: "02",
    title: "CSV 读取与数据汇总",
    description: "把逐行解析组合成可定位错误、可重复运行的数据管线。",
    duration: "50 分钟",
    goals: ["使用标准库正确处理 CSV、引号与 UTF-8 BOM。", "让错误包含具体行号，避免静默丢弃坏数据。", "按项目汇总时间，输出顺序稳定的报告。"],
    prerequisites: ["完成实验 01，理解 Session 和 ValueError。", "能遍历列表并更新字典。"],
    concepts: [
      { title: "让 CSV 库负责解析格式", body: "字段可能被引号包围，也可能含有逗号；split(',') 无法正确处理。DictReader 负责解析，parse_row 负责业务校验。utf-8-sig 同时接受普通 UTF-8 和带 BOM 的文件。" },
      { title: "稳定输出便于比较", body: "summarize 不修改输入列表，并按项目名排序。相同记录即使顺序不同，汇总结果也相同。重复记录代表多次学习，会重复累计；空数据必须保留表头。" },
    ],
    steps: [
      { title: "检查输入契约", body: "打开 sessions.csv，确认表头严格等于 date,project,minutes。先手算 python 的两次 45 分钟，以及整体 150 分钟。" },
      { title: "拆开两个职责", body: "阅读 load_sessions 的文件上下文与错误行号，再阅读 summarize 的字典累计。先验证数据再计算汇总，坏行出现时整次处理失败。" },
      { title: "验证错误路径", body: "复制一份 CSV，把第三行分钟改成 -5。临时把脚本 sample 指向副本并运行，确认错误指出 line 3。随后还原代码并执行测试。" },
    ],
    sourceFiles: ["lab02.py", "sessions.csv"],
    testFiles: ["test_lab02.py"],
    run: "lab02.py",
    test: "-m unittest test_lab02 -v",
    expected: '{\n  "session_count": 4,\n  "total_minutes": 150,\n  "projects": {\n    "git": 30,\n    "python": 90,\n    "web": 30\n  }\n}',
    testCount: 8,
    checks: ["手工计算结果与 JSON 一致。", "8 个测试全部通过，包括空数据、BOM 和带逗号的字段。", "能让错误输入报告正确行号。"],
    errors: [
      { symptom: "header must be: date,project,minutes", fix: "表头区分大小写、顺序和空格。使用课程样例的原始表头，分隔符为英文逗号。" },
      { symptom: "UnicodeDecodeError", fix: "将文件另存为 UTF-8 CSV。utf-8-sig 不负责将 GBK 或其他编码自动转换成 UTF-8。" },
      { symptom: "line 2: unexpected extra columns", fix: "检查是否多了分隔符；项目名本身包含逗号时，需要用双引号包住整个字段。" },
    ],
    issue: { number: 2, title: "增加按日期汇总函数", acceptance: ["新增 summarize_by_day，按 YYYY-MM-DD 升序返回每日分钟数。", "覆盖同一天多条记录、跨天和空列表。", "保留现有 summarize 的输出格式，补充样例与测试。"] },
    references: [{ title: "Python · CSV", url: "https://docs.python.org/3/library/csv.html" }],
  },
  {
    slug: "command-line",
    number: "03",
    title: "命令行工具与文件输出",
    description: "让数据管线成为别人拿到就能用的命令行工具。",
    duration: "55 分钟",
    goals: ["使用 argparse 接收文件和输出参数。", "区分 stdout、stderr 与进程退出码。", "通过子进程测试真实命令行行为。"],
    prerequisites: ["完成实验 02，能解释 load_sessions 和 summarize。", "知道相对路径取决于终端当前目录。"],
    concepts: [
      { title: "把 CLI 当成一个接口", body: "正常 JSON 写入 stdout，错误写入 stderr，成功退出码为 0，失败为 2。其他程序就能判断这次执行是否成功，而不是从文字猜测。--help 由 argparse 提供。" },
      { title: "先验证，再写文件", body: "代码会先读完并验证输入，再写报告。无效数据不能覆盖已有报告；--output 不允许与输入使用同一路径。成功输出会覆盖现有报告，本实验不处理硬链接别名和并发写入。" },
    ],
    steps: [
      { title: "运行命令行入口", body: "运行 lab03.py sessions.csv，然后加上 --help 查看参数。main 返回整数，由 sys.exit 转成进程退出码。" },
      { title: "导出真实报告", body: "在运行命令末尾追加 --output report.json。打开生成的文件，与 expected.json 对照；成功写文件时终端没有 JSON 输出是正常的。" },
      { title: "演练失败情况", body: "将输入改为 missing.csv。观察终端的 error:，再在 PowerShell 查看 $LASTEXITCODE，或在 Bash 查看 $?，确认值为 2。" },
    ],
    sourceFiles: ["lab03.py", "expected.json"],
    testFiles: ["test_lab03.py"],
    run: "lab03.py sessions.csv",
    test: "-m unittest test_lab03 -v",
    expected: '{\n  "session_count": 4,\n  "total_minutes": 150,\n  "projects": {\n    "git": 30,\n    "python": 90,\n    "web": 30\n  }\n}',
    testCount: 6,
    checks: ["已将报告保存为 report.json。", "6 个子进程测试全部通过。", "错误输入退出码为 2，已有报告不被改写。"],
    errors: [
      { symptom: "error: No such file or directory", fix: "检查终端当前目录。路径有空格时用引号包围；输出报告的父目录也必须已经存在。" },
      { symptom: "output must not overwrite the input", fix: "CSV 和 JSON 应使用不同文件名，不要把 sessions.csv 传给 --output。" },
      { symptom: "Windows 子进程的中文错误无法解码", fix: "测试通过 -X utf8 启动子进程，并按 UTF-8 读取输出。仅指定父进程的解码格式并不能改变子进程编码。" },
    ],
    issue: { number: 3, title: "为命令行增加项目筛选参数", acceptance: ["新增可选 --project 参数，在汇总前按项目名精确筛选。", "没有匹配记录时返回成功的零值报告。", "覆盖匹配、不匹配和不传参数的 CLI 测试，并更新 --help。"] },
    references: [{ title: "Python · argparse", url: "https://docs.python.org/3/library/argparse.html" }],
  },
  {
    slug: "regression-and-pr",
    number: "04",
    title: "回归测试与第一次贡献",
    description: "让每一次修改都保留证据，把实验成果整理成可评审的 PR。",
    duration: "40 分钟",
    goals: ["区分单元测试、命令行集成测试与回归测试。", "用固定样例和不变量保护公共接口。", "运行完整测试并按 Issue 范围提交贡献。"],
    prerequisites: ["完成前三个实验，能运行最终 CLI。", "了解 Git commit、Fork 和 Pull Request 的基本含义。"],
    concepts: [
      { title: "回归测试保护已经做对的事情", body: "expected.json 保存基线契约；测试比较解析后的 JSON，不依赖缩进。顺序不变性和项目总和检查验证的是性质，能捕捉样例之外的逻辑回退。" },
      { title: "小范围修改更容易验证", body: "先运行全部测试得到基线，再为新需求增加失败测试，实现改动后重跑。课程中的本地完成勾选是学习记录，不是自动测试成绩，也不会在 GitHub 自动认领任务。" },
    ],
    steps: [
      { title: "建立测试基线", body: "运行 discover 命令，应看到 Ran 24 tests 和 OK。test_regression 额外覆盖基线输出、打乱顺序、总和与不修改输入。" },
      { title: "验证测试真的会失败", body: "临时把 summarize 的 total_minutes 加 1，再运行测试并观察失败。还原这个改动，确认全部测试恢复通过。" },
      { title: "提交一次明确的改进", body: "Fork 仓库并创建分支，在本页 Issue 说明方案。修改 public/labs/python-engineering 中的文件，提交 PR 并引用 Issue；附上 Python 版本、执行命令和实际测试结果。" },
    ],
    sourceFiles: ["test_regression.py", "expected.json"],
    testFiles: ["test_lab01.py", "test_lab02.py", "test_lab03.py"],
    run: "lab03.py sessions.csv --output report.json",
    test: '-m unittest discover -s . -p "test_*.py" -v',
    expected: "写入 report.json；成功时 stdout 为空。\n全部测试：Ran 24 tests ... OK\n运行耗时因设备而异。",
    testCount: 24,
    checks: ["全部 24 个测试通过。", "已验证人为引入错误能让测试失败，并恢复代码。", "已整理包含运行环境和验证结果的贡献说明。"],
    errors: [
      { symptom: "Ran 0 tests", fix: "确认在课程目录执行命令，且完整下载了 test_*.py。文件名和测试函数名都必须保留 test 前缀。" },
      { symptom: "本地通过，CI 没通过", fix: "比较 Python 版本、编码和文件路径大小写。测试不要依赖桌面绝对路径、系统语言或上次运行留下的 report.json。" },
      { symptom: "PR 包含 .venv 或 __pycache__", fix: "这些是本地环境产物，仓库已将它们加入忽略规则。检查提交范围，只提交源码、测试和必要文档。" },
    ],
    issue: { number: 4, title: "补充命令行可移植性回归测试", acceptance: ["增加输入路径包含空格的子进程测试。", "增加从另一个工作目录通过绝对路径调用 CLI 的测试。", "只在临时目录产生文件，测试适用于 Windows 与 Linux。"] },
    references: [{ title: "Python · unittest", url: "https://docs.python.org/3/library/unittest.html" }],
  },
];

export const plannedCourses = [
  { title: "Web 全栈开发", topic: "从 HTTP、接口契约到可部署的协作应用", prerequisite: "JavaScript 基础" },
  { title: "PyTorch 入门", topic: "张量、训练循环、验证集与可重复实验", prerequisite: "Python 基础" },
  { title: "Linux / Git 环境配置", topic: "命令行、开发环境与团队版本协作", prerequisite: "零基础" },
];
