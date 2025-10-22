# Notes

Markdown notes with a CLI tool.

## Structure

```
/
├── notes/
│   ├── misc/                    # One-off notes
│   └── topic-name/              # Multi-note topics
│       ├── attachments/         # Images/media
│       └── YYYY-MM-DD-*.md      # Dated notes
└── cli/                         # CLI tool
```

## Usage

```bash
pnpm note
```

**Note:** Requires Cursor CLI (`cursor` command) for auto-opening files.
