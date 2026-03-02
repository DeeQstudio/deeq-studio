# Kwartier West Cutover Runbook

Goal: move `kwartierwest.be` from the old Kwartier West Vercel account to the centralized DeeQStudio-managed Vercel team with zero content loss and minimal/no downtime.

## Current state

- New centralized GitHub repo exists: `https://github.com/DeKweker/kwartier-west`
- New centralized Vercel project exists: `de-kwekers-projects/kwartier-west`
- New project production URL: `https://kwartier-west.vercel.app`
- Domain add in central team currently blocked:
  - `Not authorized to use kwartierwest.be (403)`
  - `Not authorized to use www.kwartierwest.be (403)`

This means the domain is still claimed by the old Vercel account/project.

## Safe cutover steps

1. In old Kwartier West Vercel account:
- Open old project currently serving `kwartierwest.be`
- Remove domain aliases:
  - `kwartierwest.be`
  - `www.kwartierwest.be`

2. Immediately in centralized Vercel team (`de-kwekers-projects`):
- Add domains to project `kwartier-west`:
  - `kwartierwest.be`
  - `www.kwartierwest.be`

3. Verify domain status:
- `vercel domains inspect kwartierwest.be --scope de-kwekers-projects`
- `vercel domains inspect www.kwartierwest.be --scope de-kwekers-projects`

4. Verify HTTPS routing:
- `https://kwartierwest.be` redirects/serves correctly
- `https://www.kwartierwest.be` serves correctly

5. Post-cutover checks:
- homepage
- artist routes
- contact/booking pages
- static assets (images, css, js)

## DNS and mail safety

- Keep nameservers as-is unless intentionally migrating DNS hosting.
- Keep all mail records untouched (`MX`, SPF, DKIM, DMARC).
- This cutover is domain ownership mapping inside Vercel, not mail migration.

## Rollback (if needed)

1. Remove domains from centralized `kwartier-west` project.
2. Re-add the domains to old project in old account.
3. Confirm old site responds again on both root and www.

