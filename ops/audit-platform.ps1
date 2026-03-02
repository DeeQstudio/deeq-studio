param(
  [string]$Root = "C:\Users\queec\ALLE_WEBSITES\clients"
)

$sites = @(
  @{ Name = "deeq-studio";     Domain = "deeqstudio.com" },
  @{ Name = "de-kweker";       Domain = "kwkr.be" },
  @{ Name = "kwartier-west";   Domain = "kwartierwest.be" },
  @{ Name = "Appartement-Hilde"; Domain = "appartement-hilde.vercel.app" }
)

Write-Host "== Git status and remotes ==" -ForegroundColor Cyan
foreach ($s in $sites) {
  $path = Join-Path $Root $s.Name
  if (-not (Test-Path (Join-Path $path ".git"))) {
    Write-Host "`n[$($s.Name)] no git repo" -ForegroundColor Yellow
    continue
  }
  Write-Host "`n[$($s.Name)]" -ForegroundColor Green
  git -C $path status --short --branch
  git -C $path remote -v
}

Write-Host "`n== DNS A records ==" -ForegroundColor Cyan
foreach ($s in $sites) {
  try {
    $a = Resolve-DnsName $s.Domain -Type A -Server 8.8.8.8 -ErrorAction Stop |
      Select-Object -ExpandProperty IPAddress
    Write-Host "[$($s.Domain)] A => $($a -join ', ')" -ForegroundColor Green
  }
  catch {
    Write-Host "[$($s.Domain)] A => lookup failed" -ForegroundColor Yellow
  }
}

Write-Host "`n== Vercel team projects ==" -ForegroundColor Cyan
cmd /c npx --yes vercel projects ls --scope deeqstudio
