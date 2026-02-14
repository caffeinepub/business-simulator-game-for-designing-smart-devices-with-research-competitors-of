# Specification

## Summary
**Goal:** Add a country-based store expansion system that can be built by the player, persists in saves, and provides productivity and product attraction bonuses that affect product release outcomes.

**Planned changes:**
- Extend the saved game model/shared types with a store network (stores tied to countries) and derived productivity/attraction modifiers, with backward-compatible loading and correct Cloud Save + local persistence round-tripping.
- Add a new “Stores” build action in Investments: select a country, show cost, build if affordable, log the investment, and consistently handle duplicate stores per country (disallow or upgrade) with persistence.
- Display store network status and effects in the UI (store count, country list, and current productivity/attraction bonuses) on a primary management surface (Investments and/or Dashboard) with immediate updates after building.
- Apply store-derived modifiers to the Release Product flow and surface the adjustments in the Release Product modal, ensuring deterministic improved outcomes and correct affordability validation using adjusted costs.

**User-visible outcome:** Players can build stores in specific countries from Investments, see their store network and bonuses in the UI, and observe clearly explained productivity/attraction effects improving release results (e.g., lower costs and/or higher sales/rating) while saves correctly preserve all store data.
