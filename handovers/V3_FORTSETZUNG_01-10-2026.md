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

## Layer 1 system recomposition

- Baseline for this pass: branch `work`, commit `de8241cf075f87bae70e5ba2a4f25a8b55714fe9`. Existing accepted legal, sitemap and closing-footer work was retained.
- All Layer 1 system artwork now has a zero-width reveal in the white entry frames. Its first reveal begins after the black Connect copy and entry note; the same drawing then reverses cleanly with scroll.
- The system uses two independent, high-density curved line families with an open centre. The left family contains Proposition → Positioning → Expansion; the right contains Operations → Delivery → Commercial Architecture. No cross-family relationship was added.
- “One Operating System” is a single central title. The introduction and explanation remain outside the CTA; the eight subtopics enter in the immediately following scroll phase. The chapter rail and its reserved width are released only during this system moment.
- Scroll extent before this pass was approximately 7.7 viewport heights on desktop and 7.0 on mobile (previous timeline/hold constants). It is now approximately 4.2 viewport heights on desktop and 4.4 on mobile. Exact perceived wheel/touch gestures remain device-dependent.
- Required deployed-browser QA remains: 970×510, 1280×720, 1440×900 and mobile; forward/reverse scrub; `#system` direct load/reload/history; keyboard, touch, contrast and reduced motion.

## Final reference-led System moment

- Baseline for this pass: branch `work`, commit `04c80e36279c331b5ce6a14986534f50179ff123`.
- This pass supersedes the earlier two-arc Layer 1 composition. It uses one continuous field of 42 closed, asymmetrically distorted vector contours around a large open centre; there is no perpetual motion.
- The six direct controls follow the approved left/right order and combine a black code pill, name and persistent plus. Their knockout surfaces keep every label clear of the line field. The relationship highlight groups remain A–Positioning–B and C–Delivery–D only.
- The central serif title, verbatim system sentence and the two-line Explore CTA are grouped in the open centre. Layer 1 generates no subtopic controls; the complete Explore view remains the only Layer 1 route to all eight subtopics and all fourteen system pages.
- Mobile uses the same vector field but independently reflows all live text and controls rather than scaling desktop typography. Reduced Motion reveals the complete static state.
- The previously documented shortened journey remains approximately 4.2 viewport heights on desktop and 4.4 on mobile.

## Spatial refinement of the System moment

- Baseline for this pass: branch `work`, commit `98eae78737acd3fe8c4ec010733cfd178ef1685d`.
- The common contour field now varies angular twist, local fan width, radius and fold displacement along every curve. This creates controlled crossings and changing density without adding a second figure or continuous idle motion.
- All six navigation plates use the same 330 × 78 desktop box and 202 × 66 mobile box, identical padding and a one-pixel outline. Their paths continue behind a white knockout rather than terminating at a label edge.
- The approved system sentence is now “I connect proposition, expansion, operations and commercial architecture so the business can operate as one.” No other copy changed.
- “One” is the italic accent; “Operating System” uses the stronger upright serif voice. The wider CTA retains both lines inside one button.
- The shortened Connect → System → Proof timeline, full Explore navigation, accepted footer and absence of Layer 1 subtopic lists remain unchanged.

## Central opening and reveal correction

- Baseline for this pass: branch `work`, commit `409967177996f53a04760823f4a3f77cc388fba8`.
- Removed the central text knockout that rendered as a hard-edged white rectangle. The explanation now has a transparent background; an angle-localised contour expansion creates the clear reading area and brings the closed paths back together below the CTA.
- The authorised sentence is set as two explicit desktop lines: “I connect proposition, expansion, operations & commercial architecture” / “so the business can operate as one.” Narrow screens may wrap further.
- Explanation and CTA now enter with a short overlap in timing, while their absolute positions are reserved from initial layout. Existing target plates, Explore navigation, shortened journey and footer remain unchanged.

## Final System explanation copy

- Baseline for this copy-only pass: branch `work`, commit `187a071eb3bad665dbb8a16d5abcd887630ac157`.
- The System explanation is now “I connect these dimensions” / “so the business can operate as one.” with an explicit desktop break after “dimensions”. No visual, animation, navigation or footer code changed in this pass.

## Layer 1 link repair and Explore rebuild

- Baseline: branch `work`, commit `8f2058218359605c95ca3ea93067f2d36502cbe3`.
- The six Layer 1 controls used `data-ddim` / `data-dreal`, but the delegated journey selector listened only for the older `data-dim` / `data-real` attributes. The selector now supports both forms and continues through the existing `showDeep` router.
- Explore keeps the source model as authority: A Proposition → A.1 Advantage; A + B Positioning; B Expansion → B.1 Markets; C Operations → C.1 People, C.2 Technology, C.3 Decisions; C + D Delivery; D Commercial Architecture → D.1 Revenue, D.2 Customers, D.3 Partnerships.
- Explore is rebuilt as a wide three-column desktop system with a central responsive contour field and six real navigation cards; mobile stacks the same six groups vertically. All approved descriptions remain model-driven and left aligned.
- The current target receives exactly one semantic `aria-current` and a separate “YOU ARE HERE” status pill beneath its name. The same marker generator continues to serve Explore and the Deep Dive footer.

## Layer 1 Explore preselection amendment

- Baseline: branch `work`, commit `b5fa57ec05380ae704302450c4fd75330f9acbe3`.
- All six Layer 1 plates now use the existing `data-open="approach"` layer action. Their dimension/connector identity is carried separately as a temporary Explore selection, so the Deep Dive router does not run on the same click.
- Explore outlines the selected canonical card, highlights its related contour zone and scrolls it into view when necessary. This selection never creates `aria-current` or a “YOU ARE HERE” pill; those remain reserved for a Deep Dive that was actually opened.
- The 14 Explore destinations retain their existing direct Deep Dive routing. Layer 1 design, copy and footer are unchanged.

## Explore illustration and legibility refinement

- Baseline: branch `work`, commit `6a561232fa52f5324e358df14a1e40cc233c77fc`.
- The accepted long, scrollable Explore card structure remains unchanged. Its central illustration is now a tall, asymmetric woven line field with alternating fans, pinches and crossings instead of a horizontally scaled closed loop.
- The SVG spans the card field and calculates six short connector paths from the central motif to the actual card edges after layout, keeping the endpoints attached when the layout resizes. The SVG remains pointer-transparent.
- Common card heights and calmer header metrics keep Positioning and Delivery readable on desktop. Narrow layouts restore natural name wrapping and prioritise the card content over the illustration.
- Full deployed-preview visual, interaction and viewport QA remains required before production approval.

## Explore black-field correction

- Baseline: branch `work`, commit `d7ae833aeb062b7f72bf1c8a9b9bb75a6c4f3794`.
- Explore now uses the established site black throughout the overlay and sticky navigation. Its heading, entry note, navigation and SVG lines are white; the six content cards remain white with black type and the approved fixed code-pill colours.
- A final Explore-scoped style layer neutralises the older vertical connector rules. Positioning and Delivery now use the same horizontal code/name/plus header and full-width explanation layout as the four dimensions.
- Desktop columns share the width required by Commercial Architecture, while card heights follow their content. The layout switches to a natural single-column sequence before those widths can collide; mobile names may wrap without scaling the whole view.
- Connector endpoints are calculated from the same outside contour function used to draw the organic field, so the short curves stop at its edge instead of piercing the interior.
- Layer 1, all fourteen Explore destinations, semantic current-location handling, the accepted footer and the production boundary remain unchanged.

## Explore line-field ending and release footer

- Baseline: branch `work`, commit `e18c467c59765244e0979d261d49098e46fbda5e`.
- The Explore-only `04.1` identifier now has an explicit black fill, thin white fully rounded outline and balanced padding; system-navigation pills are unchanged.
- Individual contour paths now begin and end at staggered off-frame positions, removing the shared flat caps while retaining the woven fans, crossings and depth. Short card connectors still terminate at the calculated outside contour.
- After the last card and SVG field, a generous black pause leads to the accepted shared release-footer structure. Its legal, Workshops and Sitemap links retain their existing destinations; Contact uses the existing chapter navigation so the overlay closes correctly.
- No Deep Dive footer/navigation redesign, merge or production action is included.

## Explore, Layer-2 shell and Layer-1 polish

- Baseline: branch `work`, commit `adb3f35d34db449bef4b44ddba0083dbe7ed1836`.
- Explore reserves a larger quiet zone between its entry note, line field and first card row. The upper field narrows and swings right before its staggered off-frame ending; the accepted lower ending remains intact.
- Explore highlight duplicates now use a soft elliptical SVG mask whose position and size transition between the six relationship groups. This removes rectangular clip edges while retaining keyboard and pointer orientation.
- Explore and the shared Deep Dive layer keep their framed top row and Back/location row sticky inside the actual overlay scroll container. Both expose `One Operating System`; Deep Dives also retain Explore with current-location transfer.
- The shared release footer has slightly deeper, safe-area-aware vertical padding. Explore retains its additional black closing pause.
- The Layer-1 system contour is compressed organically inside its lower frame instead of being cut at the SVG boundary. The chapter rail uses stable monospaced number slots, smaller labels and unchanged 44px interaction rows.
- No Deep Dive footer redesign, merge or production action is included.

## Surgical navigation and System correction (2 October 2026)

- Baseline: branch `work`, commit `22162c052725b0b238cc2bdace3773773e29dae7`.
- Implementation commit: `52026c7a42abb5d4ca5b04f98854567de33f0953`.
- Global overlay-header decision: Explore shows only Index at the established right position. Every Deep Dive shows `Explore | Index`; the redundant `One Operating System` header link is removed. The local Back/location row remains sticky beneath that framed header.
- The chapter rail now hides after a deliberate downward scroll and returns promptly on upward scroll. Keyboard focus forces it visible; its eight interaction rows remain at least 44px high.
- Shared footer padding now places the link row lower with a smaller safe-area-aware closing pad; the redundant outer bottom pad on Layer 1 is removed.
- The Layer-1 contour is moderately enlarged around a wider title opening. Its lower geometry is compressed into an organic tail, with only a targeted 38px continuation allowed from the active System stage.
- Current-location state is reset when Explore is entered without Deep-Dive context. Exact Deep-Dive changes still call the shared marker; a subtopic no longer additionally activates its parent dimension in the footer navigation. The status remains semantic `aria-current="page"` and uses one reserved dark-grey `YOU ARE HERE` pill.
- Required deployed-preview interaction and visual QA remains open in this execution environment; no merge or production action is included.

## Final surgical clarification: line field and frozen navigation

- Baseline: branch `work`, commit `fa4aeed202bdbaee50e71357437f1747fe7dd667`.
- The Layer-1 chapter rail no longer hides on downward scroll. It remains available throughout Layer 1, with zero inter-row gap and 44px rows, and is hidden only on the landing and in the Operating-System frame.
- The frozen shell now applies to every overlay, not only Explore and Deep Dives. Page-level Back/title bars (`.subbar`) are likewise sticky below the global header on Workshops, Sitemap and Legal pages.
- The Layer-1 System contour softly compresses any extreme left/right/top coordinates back inside the SVG instead of clipping them. Its highlight now uses the same soft elliptical gradient-mask principle as Explore rather than a rectangular clip.
- The accepted header order remains unchanged: Explore has Index only; Deep Dives have `Explore | Index`.
- Deployed-preview visual QA remains required; no merge or production action is included.

## Final rail and Explore-location correction

- Baseline: branch `work`, commit `dc1f2d2614bf8886f148c493ca16fa0238066edb`.
- The desktop Layer-1 rail now uses 34px visual rows with no extra gap (44px on coarse pointers). Scroll, hover and keyboard focus restore full visibility; after two seconds without interaction it returns to the existing lightly visible idle treatment. Landing and System exclusions remain unchanged.
- Contextual black/white rail contrast continues to use the existing difference-mode shell: the active pill resolves black-on-white and white-on-black without moving its reserved number slot.
- `YOU ARE HERE` is now rendered only in Explore. The shared marker clears stale state on context-free entry, marks exactly the last opened main or subtopic with semantic `aria-current="page"`, and uses a dark-blue in-flow status pill. The footer System navigation is not restyled in this pass.
- Deployed-preview click and viewport QA remains required; no merge or production action is included.

## Deep-Dive closing System navigation rebuild

- Baseline: branch `work`, commit `329f827fa1803400ec7273fd938e9c26d7d79456`.
- The shared Deep-Dive closing navigation is rebuilt as a black section with a white `Navigation` / `One Operating System` header, a spatial white line field, six equal white system cards, and a separate filigree lower line motif. The accepted release footer now follows it directly.
- Desktop uses six columns while narrower layouts switch to three and then one. All fourteen existing targets remain model-driven: six main/connector pages and eight correctly assigned subtopics.
- Current location no longer inserts `YOU ARE HERE` text or an extra row. Explore and the Deep-Dive closing navigation mark only the current entry's existing code pill with `#0F766E`, white type and semantic `aria-current="page"`; a subtopic does not mark its parent.
- Context-free Explore still clears its own current marker. Returning from a Deep Dive reuses the exact shared state and updates it after every page change.
- Deployed-preview click, responsive and visual QA remains required; no merge or production action is included.

## Compact Deep-Dive navigation and folding shell

- Baseline: branch `work`, commit `9ac13ed01597bef319ade23ff4c3ebefb41b153f`.
- The closing System navigation is compacted into one desktop overview: six columns remain through 970px, card heights are content-led but aligned, and the line field now runs continuously behind the card gaps instead of occupying separate illustration bands. Mobile remains a natural one-column scroll.
- Proposition, Expansion, Operations and Commercial Architecture remain white cards. Positioning and Delivery are black with white outlines. Codes, names, plus controls and the eight canonical subtopics retain their routes and hierarchy.
- The exact current code pill remains the sole visible location signal in both this navigation and Explore (`#0F766E`, white type, semantic `aria-current="page"`).
- Overlay global/local header rows fold upward after two seconds of rest without changing document flow. Scroll, upward movement, pointer movement near the top, hover and keyboard focus reopen them; Reduced Motion retains the same state logic without transition.
- The accepted release footer follows immediately after the compact navigation. Deployed-preview interaction and visual QA remains required; no merge or production action is included.

## Universal Deep-Dive location and folding-shell repair

- Baseline: branch `work`, commit `fa13a52e41787f812ee77291c4afcd2789e0cf4f`.
- The shared marker now applies a dedicated current-code class to the exact existing code pill in both Explore and the Deep-Dive closing navigation. This resolves the connector-card cascade that kept Positioning and Delivery black, while retaining `aria-current="page"`, the approved teal `#0F766E`, and the rule that a subtopic never marks its parent.
- The shared overlay shell still folds after two seconds. Programmatic pointer-open focus on Back no longer holds it open indefinitely; genuine keyboard focus and pointer hover do. Scrolling, keyboard navigation, pointer movement near the top, and a top-edge pointer/touch target reopen the shell without changing document flow.
- The accepted closing-navigation composition, Layer-1 chapter rail, copy, and release footer are unchanged. Deployed-preview browser QA remains required; no merge or production action is included.

## Layer-1 Connect statement and chapter-rail correction

- Baseline: branch `work`, commit `94d07eee16229900377d23c5f93883c495bce4ad`.
- The approved Connect entry sentence is now a centred, substantially larger Boska statement. Its position and size remain fixed while its scroll-bound colour progresses from readable grey to full white; Reduced Motion presents the complete white state immediately.
- The `03` pill and `Connect` title remain visible through the complete reading moment. Their handover now starts only when the statement leaves and still completes before the Operating-System labels appear; the System-only rail exclusion begins at that same boundary.
- The desktop chapter rail uses eight contiguous 44px interaction rows: approximately one-third tighter than the previously observed spacing while retaining the existing type sizes, contrast-by-background behaviour, two-second idle treatment, and Landing/System exclusions.
- The accepted System navigation, Explore composition, location marker, Deep-Dive folding shell, and release footer are unchanged. Deployed-preview browser QA remains required; no merge or production action is included.

## V3 remainder — unchanged

The application release does not replace the V3 remainder: open line design for Explore/System footer; further visual and narrative refinement; all 133 frames against seven contract fields; remaining frame findings and full V3 QA; shared frame-by-frame review and surgical corrections. ADD-01–04, workshop-result drafts and other copy awaiting approval were not silently implemented.
