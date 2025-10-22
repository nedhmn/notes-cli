#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { createNote } from './commands/create-note.js';
import { createTopic } from './commands/create-topic.js';

async function main() {
  try {
    console.log('📝 Notes CLI\n');

    const action = await select({
      message: 'What do you want to create?',
      choices: [
        {
          name: 'New note',
          value: 'note',
          description: 'Create a new markdown note in inbox, misc, or a topic folder',
        },
        {
          name: 'New topic folder',
          value: 'topic',
          description: 'Create a new topic folder with attachments/ directory',
        },
      ],
    });

    switch (action) {
      case 'note':
        await createNote();
        break;
      case 'topic':
        await createTopic();
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n✗ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

main();
