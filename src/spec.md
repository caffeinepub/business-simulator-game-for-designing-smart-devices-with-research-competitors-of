# Specification

## Summary
**Goal:** Add office decor customization (walls and wood flooring) and include windows and a door as part of the Office 3D room shell, with a UI to select and persist these options locally.

**Planned changes:**
- Update `Office3DViewer` to support configurable wall finishes (solid color and wallpaper/pattern options) and multiple distinct wood floor material looks, applied deterministically to scene materials.
- Add window(s) and a door to the office room shell using Three.js primitives/procedural geometry, with placement/sizing that adapts to `officeScenePresets` floor dimensions and participates in lighting/shadows without z-fighting.
- Add an “Office Decor” section on the Office Management page to select wall finish (solid vs wallpaper) and floor wood style, and persist selections via the existing persisted office Zustand store.

**User-visible outcome:** On the Office Management page, the player can choose wall color or wallpaper and a wood floor style; the 3D office scene updates immediately and consistently, shows a door and window(s) at every office level, and the chosen decor persists across reloads.
