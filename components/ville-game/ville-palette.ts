/**
 * Palette hybride SisAyiti × grille tactique (Civ1).
 * Contrastes calibrés : fond sombre + aplats saturés + contours #1a1408.
 */
export const VILLE_PALETTE = {
  outline: "#1a1408",
  outlineLight: "#f8fafc",
  fogBg: "#1e293b",
  fogPattern: "#334155",
  fogMark: "#fbbf24",
  grassBase: "#2d5a3d",
  terrain: {
    rock: { fill: "#3d7a52", light: "#6ee7a0", accent: "#14532d", label: "#ecfdf5" },
    soft: { fill: "#ca8a04", light: "#fde047", accent: "#854d0e", label: "#fffbeb" },
    clay: { fill: "#c2410c", light: "#fdba74", accent: "#7c2d12", label: "#fff7ed" },
  },
  building: {
    school: { main: "#1a5e9a", roof: "#38bdf8", door: "#0c4a6e", highlight: "#bae6fd" },
    house: { main: "#0f766e", roof: "#5eead4", door: "#134e4a", window: "#fef9c3" },
    hospital: { wall: "#ffffff", cross: "#dc2626", stroke: "#991b1b", badge: "#16a34a" },
    rescue: { main: "#ea580c", roof: "#fdba74", cross: "#ffffff" },
  },
  status: {
    damaged: { border: "#f59e0b", bg: "#78350f", icon: "#fde68a" },
    collapsed: { border: "#ef4444", bg: "#450a0a", icon: "#fecaca" },
    repair: { bg: "#0d9488", fg: "#ffffff" },
    select: { ring: "#fbbf24", glow: "rgba(46, 139, 192, 0.55)" },
  },
  badge: {
    pill: "rgba(15, 23, 42, 0.88)",
    text: "#f8fafc",
  },
} as const
