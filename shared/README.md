# SisAyiti — Shared (platform-agnostic)

Code in this folder has **no dependency** on Next.js, MapLibre, or browser-only APIs.
It is the foundation for a future React Native app sharing the same backend.

## Language codes

| Context | Code | Meaning |
|---------|------|---------|
| UI (`Lang`) | `fr` | French |
| UI | `kr` | Haitian Creole (AKA) |
| UI | `en` | English |
| UI | `es` | Spanish |
| Map components | `ht` | Haitian Creole locale key (legacy MapLibre strings) |

**Rule:** UI always uses `kr`. Map/legacy modules use `ht`. Convert with `toMapLang(kr) → ht`.

## Exports

- `i18n` — types, `l()`, `pickLabel()`, `pickDesc()`, `toMapLang()`, storage key
- `types` — `ModuleId`, route helpers
- `api-contract` — REST request/response types
- `ville-game` — city builder pure logic
- `labo-simulation` — lab physics pure logic
