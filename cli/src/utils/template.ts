import { getCurrentDate } from './date.js';

/**
 * Generate markdown template with YAML frontmatter, TOC, and heading
 */
export function generateNoteTemplate(title: string): string {
  const date = getCurrentDate();

  return `---
title: ${title}
date: ${date}
---

## Table of Contents

<!-- TOC -->

- [Overview](#overview)

<!-- /TOC -->

## Overview

`;
}
