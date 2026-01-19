#!/bin/bash
# Ralph autonomous loop runner
# Usage: ./scripts/ralph/ralph.sh [max_iterations]

MAX_ITERATIONS=${1:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🤖 Starting Ralph with max $MAX_ITERATIONS iterations..."
echo "   Parent task: $(cat "$SCRIPT_DIR/parent-task-id.txt" 2>/dev/null || echo 'not set')"
echo ""

npx tsx "$SCRIPT_DIR/ralph.ts" "$MAX_ITERATIONS"
