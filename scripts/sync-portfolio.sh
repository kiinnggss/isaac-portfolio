#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "==> 1. Regenerating resume PDF from projects..."
python3 scripts/update-resume.py

echo "==> 2. Exporting static website for GitHub Pages..."
npm run build:export

echo "==> 3. Committing and pushing updates..."
git add lib/projects-data.ts public/Gbodimowo_Isaac_Resume.pdf out/ || git add .
COMMIT_MSG="${1:-feat(portfolio): sync portfolio and resume with new project}"
git commit -m "$COMMIT_MSG" || echo "No git changes to commit"
git push origin main

echo "==> Synchronization complete! Live deployment updating at:"
echo "    https://kiinnggss.github.io/isaac-portfolio/"
