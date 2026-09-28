"""Lab 04: lock down the public contract before contributing."""

import json
import random
import unittest
from pathlib import Path

from lab02 import load_sessions, summarize
from test_lab03 import run_cli


ROOT = Path(__file__).resolve().parent


class RegressionTests(unittest.TestCase):
    def test_cli_matches_golden_report(self):
        expected = json.loads((ROOT / "expected.json").read_text(encoding="utf-8"))
        result = run_cli(ROOT / "sessions.csv")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout), expected)

    def test_summary_is_order_independent(self):
        sessions = load_sessions(ROOT / "sessions.csv")
        expected = summarize(sessions)
        for seed in range(10):
            shuffled = sessions.copy()
            random.Random(seed).shuffle(shuffled)
            with self.subTest(seed=seed):
                self.assertEqual(summarize(shuffled), expected)

    def test_total_equals_sum_of_projects(self):
        report = summarize(load_sessions(ROOT / "sessions.csv"))
        self.assertEqual(report["total_minutes"], sum(report["projects"].values()))

    def test_summary_does_not_modify_input(self):
        sessions = load_sessions(ROOT / "sessions.csv")
        before = sessions.copy()
        summarize(sessions)
        self.assertEqual(sessions, before)


if __name__ == "__main__":
    unittest.main()
