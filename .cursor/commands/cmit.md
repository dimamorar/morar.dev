1. Run `git status` to see changes
2. Run `git add -A` to stage all changes
3. Run `git diff --staged` to review staged changes
4. Generate commit message using Conventional Commits format (feat|fix|refactor|build|ci|chore|docs|style|perf|test)
5. Present message and ask: "Commit with this message? (y/n)"
6. If approved → run `git commit -m "<message>"`
7. If rejected → ask for feedback, rewrite message, repeat from step 5
