# Notes

Markdown notes with a CLI tool.

> [!NOTE]
> Requires VS Code CLI (`code` command) for auto-opening files.

## Installation

```bash
git clone https://github.com/nedhmn/notes-cli.git
cd notes-cli
pnpm install
```

**VSCode Extension:** Install [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) for automatic TOC generation and formatting on save.

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
