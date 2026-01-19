#!/usr/bin/env npx tsx
/**
 * Ralph - Autonomous task execution loop
 * 
 * Reads parent task ID from parent-task-id.txt, finds ready subtasks,
 * and executes them one by one until complete.
 * 
 * Usage: npx tsx scripts/ralph/ralph.ts [max_iterations]
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PARENT_TASK_FILE = join(__dirname, 'parent-task-id.txt');
const PROGRESS_FILE = join(__dirname, 'progress.txt');

const maxIterations = parseInt(process.argv[2] || '10', 10);

async function main() {
  console.log('🤖 Ralph starting...\n');

  if (!existsSync(PARENT_TASK_FILE)) {
    console.error('❌ No parent-task-id.txt found. Run ralph skill setup first.');
    process.exit(1);
  }

  const parentTaskId = readFileSync(PARENT_TASK_FILE, 'utf-8').trim();
  if (!parentTaskId) {
    console.error('❌ parent-task-id.txt is empty. Run ralph skill setup first.');
    process.exit(1);
  }

  console.log(`📋 Parent task: ${parentTaskId}`);
  console.log(`🔄 Max iterations: ${maxIterations}\n`);

  for (let i = 1; i <= maxIterations; i++) {
    console.log(`\n━━━ Iteration ${i}/${maxIterations} ━━━\n`);
    
    try {
      // Use amp CLI to run the next task
      const result = execSync(
        `amp -x "Load the ralph skill and run the next ready task for parent ${parentTaskId}. Check progress.txt first for context."`,
        { 
          stdio: 'inherit',
          cwd: join(__dirname, '../..'),
          timeout: 600000 // 10 minute timeout per iteration
        }
      );
      
      // Check for completion signal
      const progress = readFileSync(PROGRESS_FILE, 'utf-8');
      if (progress.includes('COMPLETE') || progress.includes('all tasks finished')) {
        console.log('\n✅ Ralph complete - all tasks finished!');
        break;
      }
    } catch (error: any) {
      if (error.status === 0) {
        // Normal exit
        continue;
      }
      console.error(`\n⚠️ Iteration ${i} encountered an error:`, error.message);
      // Continue to next iteration
    }
  }

  console.log('\n🏁 Ralph finished.\n');
}

main().catch(console.error);
