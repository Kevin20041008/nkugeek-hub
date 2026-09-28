import unittest
from datetime import date

from lab01 import Session, parse_row


class ParseRowTests(unittest.TestCase):
    def test_valid_row(self):
        self.assertEqual(
            parse_row({"date": "2026-09-28", "project": "python", "minutes": "45"}),
            Session(date(2026, 9, 28), "python", 45),
        )

    def test_surrounding_whitespace(self):
        row = {"date": " 2026-09-28 ", "project": " python ", "minutes": " 15 "}
        self.assertEqual(parse_row(row).project, "python")
        self.assertEqual(parse_row(row).minutes, 15)

    def test_invalid_minutes(self):
        for value in ["0", "-1", "1.5", "", "abc", "+2", "1_000"]:
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, "minutes"):
                parse_row({"date": "2026-09-28", "project": "python", "minutes": value})

    def test_missing_field(self):
        with self.assertRaisesRegex(ValueError, "required fields"):
            parse_row({"date": "2026-09-28", "project": "python"})

    def test_invalid_date(self):
        for value in ["2026-02-30", "20260928", "28/09/2026"]:
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, "date"):
                parse_row({"date": value, "project": "python", "minutes": "30"})

    def test_empty_project(self):
        with self.assertRaisesRegex(ValueError, "project"):
            parse_row({"date": "2026-09-28", "project": "  ", "minutes": "30"})


if __name__ == "__main__":
    unittest.main()
