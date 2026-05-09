# Auto-Merge Configuration for Cursor Agent Articles

This repository has multiple options for automatically merging pull requests from Cursor agents.

## Quick Start

### For PR #7 (Current Article)
1. Visit https://github.com/levensailor/logicpro-cheatsheets/pull/7
2. Click "Enable auto-merge" button
3. Select "Squash and merge"
4. PR will auto-merge when Vercel checks pass

## Automated Solutions

### Method 1: Auto-merge Cursor Agent PRs (Automatic)

**File**: `.github/workflows/auto-merge-cursor-prs.yml`

- Automatically enables auto-merge for any PR from branches starting with `cursor/`
- Runs when PR is opened or updated
- Merges using squash method when all checks pass
- No manual intervention needed

**Usage**: Just create PRs from `cursor/*` branches (already happening)

### Method 2: Auto-merge with Label (Manual Control)

**File**: `.github/workflows/auto-merge-label.yml`

- Only auto-merges PRs with the `auto-merge` label
- Gives you control over which PRs auto-merge
- Useful when you want to review some PRs manually

**Usage**: 
```bash
# Add label to enable auto-merge
gh pr edit 7 --add-label "auto-merge"

# Remove label to disable
gh pr edit 7 --remove-label "auto-merge"
```

## Repository Settings Configuration

### Enable Auto-Merge Feature
1. Go to Settings → General → Pull Requests
2. Check "Allow auto-merge"
3. Save changes

### Configure Branch Protection (Recommended)
1. Go to Settings → Branches → Branch protection rules
2. Add rule for `main` branch:
   - ✅ Require status checks to pass before merging
   - ✅ Require Vercel checks to pass
   - ✅ Allow auto-merge
   - ⚠️ Do not require approving reviews (if you want full automation)

### Workflow Permissions
1. Go to Settings → Actions → General → Workflow permissions
2. Select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Save

## Manual Commands

If you have the GitHub CLI locally with write access:

```bash
# Enable auto-merge for current PR
gh pr merge --auto --squash 7

# Disable auto-merge
gh pr merge --disable-auto 7

# Merge immediately (skip auto-merge)
gh pr merge --squash 7
```

## Workflow Comparison

| Feature | Cursor Branch Workflow | Label Workflow | Manual Web UI |
|---------|----------------------|----------------|---------------|
| Automation Level | Full | Semi | None |
| Control | Low | High | Full |
| Setup Complexity | None | Low | None |
| Best For | High-volume articles | Selective merging | One-off PRs |

## Current Status

- ✅ Vercel checks configured
- ✅ Workflow files created
- ⚠️ Workflows need to be committed and pushed
- ⚠️ Repository settings may need adjustment (check permissions)
- ⚠️ Branch protection rules should be configured

## Recommended Approach

For automated article publishing:

1. **Commit and push the workflow files** (see commands below)
2. **Enable "Allow auto-merge"** in repository settings
3. **Use the Cursor branch workflow** for hands-off automation
4. **Optional**: Set up branch protection with required checks

## Next Steps

```bash
# Commit workflow files
git add .github/workflows/
git commit -m "feat: Add auto-merge workflows for Cursor agent PRs"
git push

# For current PR, enable manually via web UI or:
gh pr merge --auto --squash 7
```

## Troubleshooting

### Auto-merge not working?
- Check if "Allow auto-merge" is enabled in repo settings
- Verify workflow permissions (read and write)
- Ensure status checks are configured correctly
- Check workflow run logs in Actions tab

### Want to disable for specific PRs?
- Remove `auto-merge` label (label workflow)
- Add `no-merge` label (can add this to workflows)
- Disable auto-merge manually: `gh pr merge --disable-auto <number>`

## Security Note

These workflows automatically merge code from Cursor agent branches. Ensure:
- Cursor agents only run on trusted branches
- Sensitive operations require manual review
- Production deployments have appropriate gates
