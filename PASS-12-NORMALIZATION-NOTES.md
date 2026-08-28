# Pass 12 — motion normalization checkpoint

Baseline: `DEEQ-STUDIO-HERO-VERTICAL-BALANCE-CHECKPOINT`.

This checkpoint does **not** redesign the approved hero. It normalizes the code before Pass 13.

## CSS normalization
- Removed the historical hero repair / choreography patch stack from the cascade.
- Replaced it with one canonical hero section that reproduces the approved vertical-balance values.
- Static anchor wrappers remain the sole owners of hero placement; GSAP only animates the inner layers.
- Safe-area variables now live in the primary `:root` token block instead of a late hardening patch.
- Removed earlier declarations that were unconditionally superseded later by the exact same selector in the same media context. This reduces patch-layer debt without moving winning declarations.
- Responsive hero geometry is defined once per device class: desktop, large tablet, 701–980 portrait tablet/foldable, phone, very narrow phone, and short landscape phone.

## Motion engine normalization
- Preserved the approved DeeQ wordmark → split → DQ → hold choreography and timing.
- Scoped Kweker and Kwartier West motion queries to their own project-world containers.
- Combined duplicate reveal setup without changing reveal timing.
- Removed the global `ScrollTrigger.getAll().kill()` cleanup. The GSAP context now owns and reverts only the triggers created by this engine.
- Refresh timers are now explicitly cancelled/reused on route cleanup and orientation/page restore.

## Gate
This is the proper Pass-12 checkpoint. It must be checked locally before Pass 13 production QA starts.
