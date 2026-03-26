#!/usr/bin/env python3
"""
Extract the 10 Living Constitution files from CLAUDE_MD_REFACTOR.md.

Splits on --- + # File N: boundaries. Each segment's body is the outer
```markdown ... ``` block: content between the first ```markdown line and the
last line that is exactly ``` (handles nested inner ``` fences).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path


def strip_complete_file_tree(text: str) -> str:
    idx = text.find("# Complete File Tree")
    if idx != -1:
        return text[:idx].rstrip()
    return text.rstrip()


def extract_outer_markdown_body(segment_after_header: str) -> str | None:
    lines = segment_after_header.splitlines()
    start = None
    for i, line in enumerate(lines):
        if line.strip() == "```markdown":
            start = i + 1
            break
    if start is None:
        return None
    end = None
    for i in range(len(lines) - 1, start - 1, -1):
        if lines[i].strip() == "```":
            end = i
            break
    if end is None or end <= start:
        return None
    return "\n".join(lines[start:end]).rstrip("\n")


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    src = root / "CLAUDE_MD_REFACTOR.md"
    if not src.is_file() or src.stat().st_size == 0:
        print(f"error: {src} missing or empty — save the refactor spec to disk.", file=sys.stderr)
        return 1

    text = strip_complete_file_tree(src.read_text(encoding="utf-8"))
    raw_parts = re.split(r"(?m)^---\s*$\s*\n\s*# File \d+:\s*", text)
    segments: list[str] = [raw_parts[0]] + list(raw_parts[1:])

    written = 0
    for seg in segments:
        seg = seg.strip()
        if not seg:
            continue
        first_line, _, rest = seg.partition("\n")
        m = re.match(r"^# File \d+:\s*(.+?)\s*$", first_line)
        if m:
            rel = m.group(1).split(" (")[0].strip()
            body = rest
        else:
            rel = first_line.split(" (")[0].strip()
            body = rest.lstrip("\n")

        inner = extract_outer_markdown_body(body)
        if inner is None:
            print(f"skip {rel}: could not extract ```markdown body", file=sys.stderr)
            continue
        out = root / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(inner + "\n", encoding="utf-8")
        print(f"wrote {out.relative_to(root)} ({len(inner)} bytes)")
        written += 1

    if written != 10:
        print(f"warning: expected 10 files, wrote {written}", file=sys.stderr)
    return 0 if written == 10 else 1


if __name__ == "__main__":
    raise SystemExit(main())
