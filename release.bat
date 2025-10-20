@echo off
mkdir dists
git archive --format zip --output dists\LPS-SIMS-SPE.zip --worktree-attributes --verbose -9 HEAD
pause