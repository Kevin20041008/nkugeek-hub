import tempfile
import unittest
from pathlib import Path

from lab02 import load_sessions, summarize


class CsvTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / "sessions.csv"

    def write(self, content, encoding="utf-8"):
        self.path.write_text(content, encoding=encoding)

    def test_sample_summary(self):
        sample = Path(__file__).with_name("sessions.csv")
        self.assertEqual(summarize(load_sessions(sample)), {
            "session_count": 4,
            "total_minutes": 150,
            "projects": {"git": 30, "python": 90, "web": 30},
        })

    def test_header_only(self):
        self.write("date,project,minutes\n")
        self.assertEqual(summarize(load_sessions(self.path)), {
            "session_count": 0, "total_minutes": 0, "projects": {},
        })

    def test_utf8_bom_and_quoted_comma(self):
        self.write('date,project,minutes\n2026-09-28,"docs, tests",20\n', "utf-8-sig")
        self.assertEqual(load_sessions(self.path)[0].project, "docs, tests")

    def test_wrong_header(self):
        self.write("day,project,minutes\n")
        with self.assertRaisesRegex(ValueError, "header"):
            load_sessions(self.path)

    def test_error_includes_line(self):
        self.write("date,project,minutes\n2026-09-28,python,-5\n")
        with self.assertRaisesRegex(ValueError, "line 2: minutes"):
            load_sessions(self.path)

    def test_extra_column(self):
        self.write("date,project,minutes\n2026-09-28,python,10,extra\n")
        with self.assertRaisesRegex(ValueError, "extra columns"):
            load_sessions(self.path)

    def test_missing_cell(self):
        self.write("date,project,minutes\n2026-09-28,python\n")
        with self.assertRaisesRegex(ValueError, "required fields"):
            load_sessions(self.path)

    def test_unclosed_quote(self):
        self.write('date,project,minutes\n2026-09-28,"python,10\n')
        with self.assertRaisesRegex(ValueError, "line"):
            load_sessions(self.path)


if __name__ == "__main__":
    unittest.main()
