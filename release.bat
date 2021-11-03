@echo off
git archive --format zip --output dists\LPS-SIMS-ELL.zip --worktree-attributes --verbose -9 HEAD
pause