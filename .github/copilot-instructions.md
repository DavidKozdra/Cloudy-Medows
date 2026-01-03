# Copilot Instructions for Cloudy Meadows

## Project Overview
Cloudy Meadows is a p5.js-based urban vertical farming game. The codebase is object-oriented, with a custom inheritance hierarchy for entities, items, tiles, and NPCs. All scripts are loaded via HTML script tags, with no module system. The game logic is distributed across large monolithic files and many global variables.

## Key Architectural Patterns
- **Entities**: All game actors (Player, NPC, Robot, etc.) inherit from base classes in `public/classes/tile_classes/`. See `player.js`, `npc.js`, `robot.js` for examples.
- **Items & Tiles**: Definitions are in `config/items.js` and `config/tiles.js`. Items and tiles are referenced by numeric IDs throughout the codebase.
- **Levels**: Level data is hardcoded in `preload.js` (to be modularized per `plan.md`).
- **Global State**: Most game state (player, levels, time, etc.) is managed via global variables in `sketch.js` and `preload.js`.
- **Asset Loading**: All images and sounds are loaded in `preload.js` using p5.js functions.
- **Local Storage**: Game progress is saved using `localDataStorage-3.0.0.min.js`.

## Developer Workflows
- **Run/Debug**: Open `public/index.html` in a browser. No build step required.
- **Add Classes**: Place new entity/item/tile classes in `public/classes/` or `public/classes/tile_classes/` and add script tags in `index.html`.
- **Add Assets**: Place images in `public/images/` and sounds in `public/audio/`. Reference them in `preload.js`.
- **Configuration**: Update item/tile definitions in `config/items.js` and `config/tiles.js`.

## Project-Specific Conventions
- **No ES Modules**: All code is global-scope JavaScript. Use script tags for new files.
- **Inheritance**: Use class-based inheritance for all entities. Always call `super()` in constructors.
- **Numeric IDs**: Items and tiles are referenced by index (see `ITEM_DEFINITIONS` and `TILE_DEFINITIONS`).
- **Menus/UI**: UI state is managed by toggling DOM element visibility and pointer events (see `miscfunctions.js`).
- **Event Dispatch**: Custom events (e.g., `moneyGained`) are dispatched for UI updates.

## Integration Points
- **p5.js**: Main game loop and rendering.
- **localDataStorage**: For saving/loading game state.
- **Sound**: Uses p5.sound and custom `Sound.js` class.

## Refactoring Plan (see `plan.md`)
- Modularize `preload.js` and move level data to JSON.
- Reduce global variables and code duplication.
- Improve performance by optimizing tile updates.

## Example Patterns
- **Adding a new item**: Add to `config/items.js` and reference by index in code.
- **Creating a new entity**: Extend a base class in `tile_classes/`, add script tag, instantiate in game logic.
- **Saving game state**: Use `localDataStorage('passphrase.life')`.

## Key Files
- `public/sketch.js`: Main game logic and global state.
- `public/preload.js`: Asset loading and level data.
- `public/classes/`: Entity/item/tile class definitions.
- `public/config/`: Item/tile configuration.
- `plan.md`: Refactoring roadmap and architectural notes.

---

For questions about unclear conventions or missing documentation, ask the user for clarification or refer to `plan.md` for future improvements.