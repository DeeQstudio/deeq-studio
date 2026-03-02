param(
  [string]$OldOwner = "DeKweker",
  [string]$NewOwner = "deeqstudio",
  [string]$Root = "C:\Users\queec\ALLE_WEBSITES\clients"
)

$ErrorActionPreference = "Stop"

Write-Host "== GitHub owner cutover ==" -ForegroundColor Cyan
Write-Host "Old owner: $OldOwner"
Write-Host "New owner: $NewOwner"

$newOwnerRaw = $null
try {
  $newOwnerRaw = gh api "users/$NewOwner" 2>$null
}
catch {
  $newOwnerRaw = $null
}

if (-not $newOwnerRaw) {
  Write-Host "New owner '$NewOwner' is not reachable on GitHub yet. Stop." -ForegroundColor Red
  exit 1
}

$newOwnerObj = $newOwnerRaw | ConvertFrom-Json
Write-Host "New owner exists on GitHub: $($newOwnerObj.login)" -ForegroundColor Green

$repos = @(
  @{ Dir = "deeq-studio"; Repo = "deeq-studio" },
  @{ Dir = "de-kweker"; Repo = "dekweker-website" },
  @{ Dir = "kwartier-west"; Repo = "kwartier-west" },
  @{ Dir = "Appartement-Hilde"; Repo = "penthouse-hilde" }
)

Write-Host "`n== Precheck target repositories ==" -ForegroundColor Cyan
foreach ($r in $repos) {
  $check = $null
  try {
    $check = gh api "repos/$NewOwner/$($r.Repo)" --jq ".full_name" 2>$null
  }
  catch {
    $check = $null
  }
  if (-not $check) {
    Write-Host "Missing target repo: $NewOwner/$($r.Repo). Stop before changing remotes." -ForegroundColor Red
    exit 1
  }
  Write-Host "Found $check" -ForegroundColor Green
}

foreach ($r in $repos) {
  $path = Join-Path $Root $r.Dir
  if (-not (Test-Path (Join-Path $path ".git"))) {
    Write-Host "[$($r.Dir)] skipped (no git repo)" -ForegroundColor Yellow
    continue
  }

  $origin = (git -C $path remote get-url origin).Trim()
  $oldHttps = "https://github.com/$OldOwner/$($r.Repo).git"
  $newHttps = "https://github.com/$NewOwner/$($r.Repo).git"

  if ($origin -ieq $oldHttps) {
    git -C $path remote set-url origin $newHttps
    Write-Host "[$($r.Dir)] origin updated -> $newHttps" -ForegroundColor Green
  }
  elseif ($origin -ieq $newHttps) {
    Write-Host "[$($r.Dir)] origin already set -> $newHttps" -ForegroundColor Green
  }
  else {
    Write-Host "[$($r.Dir)] origin is custom: $origin" -ForegroundColor Yellow
  }
}

Write-Host "`n== Remote verification ==" -ForegroundColor Cyan
foreach ($r in $repos) {
  $path = Join-Path $Root $r.Dir
  if (-not (Test-Path (Join-Path $path ".git"))) { continue }
  Write-Host "[$($r.Dir)]" -ForegroundColor Green
  git -C $path remote -v
}

Write-Host "`n== Connectivity check ==" -ForegroundColor Cyan
foreach ($r in $repos) {
  $path = Join-Path $Root $r.Dir
  if (-not (Test-Path (Join-Path $path ".git"))) { continue }
  Write-Host "[$($r.Dir)] testing origin..." -ForegroundColor Green
  git -C $path ls-remote --heads origin | Select-Object -First 3
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Connectivity failed for [$($r.Dir)]." -ForegroundColor Red
    exit 1
  }
}

Write-Host "`nDone. Local remotes are aligned with new owner." -ForegroundColor Green
