# LDT INC — V3 Fortsetzung / Bewerbungsrelease

Stand: 1 October 2026

## Repository baseline

- Requested working branch: `deploy/experience-lab-v1` (the supplied checkout was named `work`; it was renamed without resetting or discarding work).
- Starting commit: `84b8fd6339bcb69a231d407f8a8c344a93e93fbe`.
- No Git remote and no `.vercel/project.json` were present in the supplied checkout. No Vercel token/CLI was available. The existing project assignment therefore could not be independently inspected or changed.
- The reported preview is `https://ldt-inc-git-deploy-experience-lab-v1-ldt-inc.vercel.app/`. Network policy returned HTTP 403 at the CONNECT proxy, so the live deployment could not be opened, redeployed or browser-QA'd from this environment.

## Previous production and rollback

- The previous public site is preserved in `another-perspective/`, introduced by repository commit `1364cd77159f9a5308c909415f9ba9ed67a04f7f` from previous-site commit `4a9c542cbaebd444560bd4fdc0ba5e9430d63185`.
- Its canonical route is `/another-perspective/`; all visual assets and relative navigation remain under that directory. Vercel Insights loaders were removed from the archive, and its legacy legal pages now contain no placeholders and point to the current site-wide notices.
- No evidence of a pre-existing live `/another-perspective/` mapping could be obtained because external HTTP access was blocked. Do not claim that route is already deployed until checked on the Vercel preview.
- Current production (`https://ldt-inc.com/`) could not be captured over the blocked network. The repository history is therefore the recoverable source snapshot, not a verified byte-for-byte capture of production.
- Rollback after a future domain switch: in Vercel, reassign `ldt-inc.com` to the last known production deployment (record its deployment ID before release), or redeploy commit `4a9c542cbaebd444560bd4fdc0ba5e9430d63185`. Do not modify United Domains DNS/MX records for email. If only the new candidate fails, promote the recorded prior deployment rather than editing DNS.

## Release-candidate changes

- Replaced public Imprint and Privacy placeholders with the supplied confirmed identity, exact supplied address, W-IdNr, contact, copyright, GDPR rights and a factual technical description.
- The Privacy notice describes Vercel hosting without asserting an unverified account contract, DPA scope, fixed log retention or exact processing location. It describes United Domains email infrastructure without inventing its account configuration.
- Source audit: main-site fonts and animation libraries are local; interactive navigation uses `sessionStorage`; no HTML forms/iframes were found; LinkedIn is a plain outbound link. The archived site loads Google Fonts. Explicit Vercel Insights scripts were removed. Hosting-level logs remain provider-controlled.
- Added the black closing footer while retaining the system navigation. Added Contact, Sitemap and Workshops links plus full copyright wording.
- Added `/sitemap/` with Layer 1, Explore, all 14 deep dives, secondary views, Workshops, Contact and Legal. Its only new internal link to the prior site is “Another Perspective.”
- Contact `mailto:connect@ldt-inc.com` is present on the main site and Workshops. Only href presence was checked; delivery was not tested.

## Release blockers / required owner confirmation

1. **Imprint contact:** confirm an additional rapid, direct contact method that is actually reachable. It is intentionally not invented in this candidate.
2. **Address:** confirm the requested spelling `Branachstrasse 19, 12167 Berlin` before production publication.
3. **Vercel account:** identify the contracting entity, plan, applicable DPA, configured log availability/retention, processing locations and transfer safeguards for this exact project/account.
4. **United Domains email:** confirm the exact email product, processor terms, retention/backup behavior and any processing outside the EEA.
5. **Deployment audit:** deploy to the existing Vercel project and inspect requests, cookies, storage and response headers on the real preview. Confirm whether Vercel injects preview-only feedback/tooling and exclude that from the production description.
6. **Production evidence:** record the current production deployment URL/ID and verify the archive route before domain reassignment.
7. **Legal review:** owner/legal counsel must approve the publication text. This implementation is not legal advice.

## Preview QA still required

Run browser QA on the deployed candidate at 970×510, 1280×720, 1440×900 and representative mobile sizes. Cover Layer 1 through Contact; Index and Explore; every deep-dive direct hash, reload, Back/Forward; Workshops, Sitemap, Legal and Another Perspective; keyboard order/focus; reduced motion; contrast and overlaps. Capture desktop and mobile screenshots for Contact, footer, Sitemap, both legal pages and Another Perspective. A local structural audit is not a substitute for this visual pass.

## Production release procedure (only after explicit approval)

1. Attach this repository/branch to the **existing** Vercel project; do not create another project.
2. Record project/org IDs and current production deployment ID/URL. Confirm domain and redirect configuration, but make no changes yet.
3. Deploy this commit as a preview and complete the browser/network QA above.
4. Resolve every blocker and commit any correction; obtain explicit final approval.
5. In the approved production-only commit, remove the global `X-Robots-Tag: noindex, nofollow` rule and page-level noindex meta directives for the new public pages; retain noindex for `/another-perspective/` only if that remains the owner's choice. Recheck headers before promotion.
6. Promote that exact tested deployment to production or reassign `ldt-inc.com` within the same Vercel project. Do not alter MX records.
7. Smoke-test canonical URLs, legal/contact/footer/sitemap/archive, assets and response headers on the domain.
8. If a release check fails, immediately promote/reassign the recorded previous production deployment. Preserve the failed deployment for diagnosis.

## Screenshot correction pass

- The Layer 1 Turning copy no longer shares its frame with the transition cut line. Connect retires before the Operating System composition begins, using the same reversible scroll timeline.
- Layer 1, Workshops, Sitemap, Imprint and Privacy now use one full-viewport black footer with the required content order, IBM Plex Mono stack, 44 px targets and responsive grouping.
- The Sitemap archive rule now shares the content width of the rows above; its label is bold and its right label aligns to the row edge.
- Browser viewport and deployed-preview QA remain required wherever the environment has no browser, remote, Vercel project metadata or deployment credentials.

## V3 remainder — unchanged

The application release does not replace the V3 remainder: open line design for Explore/System footer; further visual and narrative refinement; all 133 frames against seven contract fields; remaining frame findings and full V3 QA; shared frame-by-frame review and surgical corrections. ADD-01–04, workshop-result drafts and other copy awaiting approval were not silently implemented.
