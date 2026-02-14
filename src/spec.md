# Specification

## Summary
**Goal:** Build a serious business-simulator game foundation where players can design smart devices, research technologies, compete in a simulated market, progress an upgradable 3D office, invest money, and sync saves via Internet Identity.

**Planned changes:**
- Create the core game shell UI with navigation: Dashboard, Device Studio, Research, Competitors/Market, Office, Investments, and Cloud Saves.
- Implement Device Studio to create/edit/save device blueprints for smartphones, tablets, watches, and smart-glasses with selectable characteristics and design variants.
- Add a Research system with a generated dataset of 3000+ technologies, including search/filter, prerequisites, time/cost, and visible effects on stats.
- Add New Game flow with difficulty selection (Normal, Challenging) and persist/apply parameter changes per save.
- Implement competitor simulation where AI companies research, develop, and release products over time, with a visible market feed/log.
- Add product release loop: launch from a blueprint with pricing and at least one additional launch parameter, then simulate sales/earnings over time.
- Create an in-game smartphone OS simulation UI (home, launcher, settings) with at least two interactive built-in apps and per-save persistence.
- Implement Office progression (20 levels) with upgrade costs and a Three.js/React Three Fiber 3D office viewer that changes across levels (initially at least 5 visual milestones) plus basic camera controls.
- Add Investments actions (buy company, marketing campaign, paid employee search) that affect simulated variables and are logged per save.
- Implement cloud synchronization using Internet Identity, including save slot create/rename/load/delete and cross-device persistence.
- Apply a coherent visual theme suitable for an economic-strategy/business-simulator game (avoid blue/purple as the dominant palette) across all screens.

**User-visible outcome:** Players can start a new game with a chosen difficulty, navigate all major sections, create and manage device blueprints, browse and research a large tech list with effects, release products to generate sales over time, watch competitors act in the market, upgrade and view a changing 3D office, make investment actions with visible impacts, use a simple in-game phone OS UI, and sign in to manage cloud save slots.
