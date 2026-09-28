# Geek Lab · Python 工程实践

用四个实验完成一个学习记录分析工具：CSV 输入，校验、汇总，JSON 输出。
需要 Python 3.11 或更新版本，只使用标准库。无需 Node.js、数据库或额外 pip 安装。

课程：https://kevin20041008.github.io/nkugeek-hub/learn/python-engineering/
仓库：https://github.com/Kevin20041008/nkugeek-hub

## 准备

下载课程 ZIP 后解压，进入含有 lab01.py 的 python-engineering 目录。
也可以克隆仓库，然后进入 public/labs/python-engineering。
以下所有命令都在这个目录运行。

Windows PowerShell：

    py -3 --version
    py -3 -m venv .venv
    .\.venv\Scripts\python.exe lab01.py

macOS / Linux：

    python3 --version
    python3 -m venv .venv
    ./.venv/bin/python lab01.py

本教程直接调用虚拟环境解释器，不需要激活脚本。
Linux 若缺少 venv，请按所用发行版安装 Python venv 支持后重试。
下文用 python 表示上述虚拟环境解释器路径。

## 实验顺序

1. 数据建模与校验：阅读 lab01.py，运行 python -m unittest test_lab01 -v。
2. CSV 数据管线：阅读 lab02.py，运行 python -m unittest test_lab02 -v。
3. 命令行与 JSON：阅读 lab03.py，运行 python -m unittest test_lab03 -v。
4. 回归测试与贡献：阅读 test_regression.py，运行全部测试。

运行最终项目：

    python lab03.py sessions.csv
    python lab03.py sessions.csv --output report.json

预期输出参见 expected.json：4 条记录、150 分钟，git 30 / python 90 / web 30。
这是一组教学样例数据。

运行全部测试：

    python -m unittest discover -s . -p "test_*.py" -v

目前包含 24 个测试方法。测试只写临时目录，不修改样例数据。

## 数据约定

- CSV 第一行为 date,project,minutes，顺序固定；使用 UTF-8（允许 BOM）。
- 日期为有效的 YYYY-MM-DD；项目名非空；分钟为正整数。
- 重复记录按多次学习累计；项目按名称排序。
- 空数据文件必须保留表头，结果为零。
- 错误输入返回退出码 2，错误信息写入 stderr。
- --output 的父目录必须已经存在；成功时会覆盖已有报告。
- 输出不可与输入使用同一路径；教程不涵盖硬链接别名或并发写入。

## 常见问题

- 找不到 Python：先安装 Python 3.11+，重新打开终端；Windows 尝试 py -3。
- 找不到 lab01：确认终端所在目录包含全部 .py 文件，不要只下载一个后续实验。
- 找不到 sessions.csv：确认当前目录，或传入文件的绝对路径。
- 出现 header must be：检查表头和英文逗号；不要手动用 split 解析 CSV。
- 中文显示异常：确认 CSV 编码为 UTF-8，并用支持 UTF-8 的终端查看。
- 测试为 0：在课程目录运行上面的 discover 命令，检查 test_*.py 是否齐全。

## 提交贡献

课程每个实验末尾链接一个开放 Issue。先在 Issue 中说明认领意向与实现方案。
Fork 仓库，在分支修改 public/labs/python-engineering 中的源文件并运行全部测试。
PR 包含：关联 Issue、变化说明、运行命令和实际输出。
完成本地练习不等于认领 Issue，也不代表 PR 已被合并。
