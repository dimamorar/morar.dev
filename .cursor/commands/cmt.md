Run with git_write permission.

1. Run `git status --short` to see changes
2. Run `git add -A` to stage all changes
3. Run `git diff --staged` to review staged changes
4. Generate commit message using Conventional Commits (feat|fix|refactor|build|ci|chore|docs|style|perf|test)
5. Present message and ask: "Commit with this message? (y/n)"
6. If y → run `git commit -m "<message>"`
7. If n → ask for feedback, rewrite message, repeat from step 5
