# GitHub Owner Migration (DeKweker -> DeeQstudio)

Goal: move the GitHub owner identity to `DeeQstudio` while keeping all websites live.

Status: completed on 2026-03-02.

## Important

- GitHub owner rename is a web-account action and cannot be finalized via CLI/API.
- Website uptime is not impacted by this step if domains and Vercel projects stay unchanged.
- Existing GitHub URLs usually redirect, but local remotes should still be updated.

## Step 1: rename account in GitHub UI

In GitHub:

1. Open `Settings` (account settings, not repo settings).
2. Go to `Account` -> `Change username`.
3. Change from `DeKweker` to `DeeQstudio` (if available).
4. Confirm warnings and complete rename.

## Step 2: run local owner cutover script

From PowerShell:

```powershell
& "C:\Users\queec\ALLE_WEBSITES\clients\deeq-studio\ops\github-owner-cutover.ps1" `
  -OldOwner "DeKweker" `
  -NewOwner "DeeQstudio"
```

This updates local `origin` remotes for:

- `deeq-studio`
- `de-kweker`
- `kwartier-west`
- `Appartement-Hilde`

## Step 3: verify GitHub repos

```powershell
gh repo list DeeQstudio --limit 100
```

Expected repos:

- `deeq-studio`
- `kwartier-west`
- `dekweker-website`
- `penthouse-hilde`

## Step 4: verify Vercel Git integration

For each local project folder:

```powershell
cmd /c npx --yes vercel git connect https://github.com/DeeQstudio/<repo>.git --scope deeqstudio
```

Projects:

- `deeq-studio` -> `deeq-studio`
- `de-kweker` -> `dekweker-website`
- `kwartier-west` -> `kwartier-west`
- `Appartement-Hilde` -> `penthouse-hilde`

## Step 5: smoke checks

- `https://deeqstudio.com`
- `https://www.kwkr.be`
- `https://www.kwartierwest.be`
