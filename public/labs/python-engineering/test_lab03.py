import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def run_cli(*args):
    return subprocess.run(
        [sys.executable, "-X", "utf8", str(ROOT / "lab03.py"), *map(str, args)],
        capture_output=True, text=True, encoding="utf-8",
    )


class CliTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)

    def test_stdout_json(self):
        result = run_cli(ROOT / "sessions.csv")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)["total_minutes"], 150)
        self.assertEqual(result.stderr, "")

    def test_output_file(self):
        output = self.directory / "report.json"
        result = run_cli(ROOT / "sessions.csv", "--output", output)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(output.read_text(encoding="utf-8"))["session_count"], 4)
        self.assertEqual(result.stdout, "")

    def test_missing_input(self):
        result = run_cli(self.directory / "missing.csv")
        self.assertEqual(result.returncode, 2)
        self.assertIn("error:", result.stderr)
        self.assertNotIn("Traceback", result.stderr)

    def test_invalid_input_preserves_existing_report(self):
        source = self.directory / "invalid.csv"
        source.write_text("date,project,minutes\n2026-09-28,python,-1\n", encoding="utf-8")
        output = self.directory / "report.json"
        output.write_text("keep me", encoding="utf-8")
        result = run_cli(source, "--output", output)
        self.assertEqual(result.returncode, 2)
        self.assertEqual(output.read_text(encoding="utf-8"), "keep me")

    def test_cannot_overwrite_source(self):
        source = self.directory / "input.csv"
        content = (ROOT / "sessions.csv").read_text(encoding="utf-8")
        source.write_text(content, encoding="utf-8")
        result = run_cli(source, "--output", source)
        self.assertEqual(result.returncode, 2)
        self.assertEqual(source.read_text(encoding="utf-8"), content)

    def test_help(self):
        result = run_cli("--help")
        self.assertEqual(result.returncode, 0)
        self.assertIn("--output", result.stdout)


if __name__ == "__main__":
    unittest.main()
