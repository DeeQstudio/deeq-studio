# DeeQStudio Platform Blueprint

This file defines the operational baseline for managing all DeeQStudio websites.

## Owner model

- Business owner (operational): DeeQStudio
- Current GitHub owner: `DeeQstudio`
- Current Vercel team: `deeqstudio`

Target when legal setup is finalized:

- GitHub Organization: `deeqstudio`
- Vercel Team: `deeqstudio`

All websites are centrally managed under the current owner/team.

## Website inventory

| Site | Domain(s) | GitHub repo | Vercel project | Status |
|---|---|---|---|---|
| DeeQ Studio | `deeqstudio.com`, `www.deeqstudio.com` | `DeeQstudio/deeq-studio` | `deeq-studio` | Live on centralized setup |
| De Kweker | `kwkr.be`, `www.kwkr.be` | `DeeQstudio/dekweker-website` | `dekweker-website` | Live on centralized setup |
| Kwartier West | `kwartierwest.be`, `www.kwartierwest.be` | `DeeQstudio/kwartier-west` | `kwartier-west` | Live on centralized setup |
| Appartement Hilde | `appartement-hilde.vercel.app` | `DeeQstudio/penthouse-hilde` | `appartement-hilde` | Live on centralized setup |

## Standard architecture (per website)

- 1 GitHub repo per website
- 1 Vercel project per website
- 1 production domain group per website
- Mail DNS remains at registrar/mail provider (MX/SPF/DKIM untouched)

Do not merge multiple client websites into one Vercel project.

## GitHub baseline

- Default branch: `main`
- Branch protection:
  - Require pull request before merge
  - Require at least 1 review
  - Block force pushes on `main`
- CODEOWNERS in each repo
- `.gitignore` blocks local QA artifacts (`_screens`, browser profiles, `.vercel`)

## Vercel baseline

- Team scope hosts all production projects
- PRs deploy to preview URLs
- `main` deploys to production
- `.vercelignore` excludes local artifacts and non-deploy docs
- Domain aliases attached only after project validation

## DNS baseline

- Keep registrar nameservers unless a full DNS migration is intentional
- Update only web records for website cutovers (`A`/`CNAME`)
- Keep mail records unchanged:
  - `MX`
  - SPF (`TXT`)
  - DKIM (`TXT`/`CNAME`)
  - DMARC (`TXT`)

## Safety and rollback

- Never delete old project before new project is verified
- Keep old Git remote as `legacy` until migration is accepted
- Rollback path:
  - Re-attach domain to previous project
  - Redeploy previous known-good commit
