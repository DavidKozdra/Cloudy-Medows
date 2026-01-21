# Copilot Instructions for Cloudy Meadows

## Project Overview
Cloudy Meadows is a p5.js-based urban vertical farming game/simulation. The codebase relies heavily on global state (no ES modules) and object-oriented patterns with a custom inheritance hierarchy.

## Big Picture Architecture

### Global State & Management
- **Central Logic (`sketch.js`)**: Manages the game loop (`draw`), global game state (`player`, `time`, `weather`, `levels`), and UI toggles.
- **Initialization (`preload.js`)**: Handles asset loading (`images`, `audio`), and critically, **hardcoded level data initialization** in `newWorld()`.
- **Globals**: Almost everything is global. Classes like `Quest` or `Dialouge` directly reference global variables like `player` or `canvasWidth`.

### Entity Hierarchy
- **Base**: `Entity` (in `entity.js`) is the root for moving objects.
- **Tiles**: Static grid objects handle their own logic. Definitions in `tile_classes/`.
- **Inheritance**: `Player` extends `Entity`. Custom logic often overrides `update()` or `render()`.
- **Configuration**: `config/items.js` and `config/tiles.js` use numeric constants for IDs.

### Quest & Dialogue Systems
- **Quests**: Managed by `Quest` class (`classes/quest.js`).
  - Uses specific goal classes: `TalkingGoal`, `FundingGoal`, `LocationGoal`, etc.
  - **Serialization**: Quests have manual logic to reconstruct themselves from saved data in the `constructor`.
- **Dialogue**: `Dialouge` class (`classes/dialouge.js`) handles conversation trees.
  - Loads data from `dialouge_list.json` (accessed via global `Dialouge_JSON`).
  - Integrates with quests via `TellGoal` checks.

## Developer Workflows

### Running & Debugging
- **Run**: Open `public/index.html` in any browser.
- **Debug**: Use browser dev tools console. Since everything is global, you can inspect `player`, `levels`, or `time` directly in the console.

### Asset & Level Management
- **New Assets**: Add image files to `images/` folder, then `loadImage` them in `preload.js` into a global variable (e.g., `grass_tile_img`).
- **Level Design**: Levels are massive 2D arrays hardcoded in `preload.js` within the `newWorld` function.
  - **Convention**: Edit these arrays directly to change level layouts. Array values correspond to numeric Tile IDs.

## Project-Specific Conventions

### Coding Patterns
- **No Modules**: Do not use `import`/`export`. All files are linked via `<script>` tags in `index.html`.
- **Global Access**: It is standard practice to access `player`, `canvasHeight`, `tileSize`, etc., directly inside class methods.
- **Safety Checks**: Classes often check `if (typeof player !== 'undefined')` to prevent crashes during initialization.
- **Manual "Serialization"**: When saving/loading complex objects (like Quests), code manual reconstruction logic in the constructor rather than relying on automatic JSON parsing.

### UI & Input
- **DOM UI**: Menus (Shop, Settings) are HTML elements toggled via `style.display` and `pointerEvents` in `miscfunctions.js` or `sketch.js`.
- **Input Handling**:
  - `keyPressed()` / `keyReleased()` in `sketch.js` for movement/actions.
  - `window.addEventListener('wheel', ...)` in `sketch.js` for Hotbar scrolling.

### Persistence
- **Local Storage**: Uses `localDataStorage` library.
- **Key**: `'passphrase.life'` is the storage key. saves are handled via `localData.set` and `localData.get`.

## Key Files
- `public/sketch.js`: Main loop, input handling, global variables.
- `public/preload.js`: `preload()` for assets and `newWorld()` for level array definitions.
- `public/classes/quest.js`: Quest logic and goal definitions.
- `public/classes/tile_classes/`: Individual logic for game tiles (shops, chests, plants).
- `public/config/items.js` & `config/tiles.js`: Numeric ID mappings.
