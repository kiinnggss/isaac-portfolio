export interface PortfolioTheme {
  id: string;
  name: string;
  tagline: string;
  isDark: boolean;
  bg: string;
  surface: string;
  surfaceAlt: string;
  heroBg: string;
  heroInk: string;
  ink: string;
  muted: string;
  border: string;
  shadow: string;
  accent: string;
  secondary: string;
  consoleBg: string;
  consoleInk: string;
}

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  {
    id: "coral-studio",
    name: "Coral Studio",
    tagline: "Editorial vermilion & warm cream",
    isDark: false,
    bg: "#FFF4D6",
    surface: "#FFFFFF",
    surfaceAlt: "#FFE7B3",
    heroBg: "#F25C48",
    heroInk: "#FFFFFF",
    ink: "#18181B",
    muted: "#4B5563",
    border: "#18181B",
    shadow: "#18181B",
    accent: "#F25C48",
    secondary: "#FBBF24",
    consoleBg: "#18181B",
    consoleInk: "#FFFDF5",
  },
  {
    id: "paw-butter",
    name: "Butter & Terracotta",
    tagline: "Playful Memphis cream & apricot",
    isDark: false,
    bg: "#FCEEC7",
    surface: "#FFFDF5",
    surfaceAlt: "#FDE1A9",
    heroBg: "#E89558",
    heroInk: "#1C1917",
    ink: "#1C1917",
    muted: "#57534E",
    border: "#1C1917",
    shadow: "#1C1917",
    accent: "#D94E5A",
    secondary: "#38BDF8",
    consoleBg: "#1C1917",
    consoleInk: "#FFFDF5",
  },
  {
    id: "orange-mechanic",
    name: "Orange Mechanic",
    tagline: "Dark workshop & amber telemetry",
    isDark: true,
    bg: "#111315",
    surface: "#1B1E23",
    surfaceAlt: "#232830",
    heroBg: "#181B20",
    heroInk: "#F8FAFC",
    ink: "#F8FAFC",
    muted: "#94A3B8",
    border: "#323842",
    shadow: "#050607",
    accent: "#F59E0B",
    secondary: "#FB923C",
    consoleBg: "#0A0C0E",
    consoleInk: "#F8FAFC",
  },
  {
    id: "purple-disco",
    name: "Purple Disco",
    tagline: "Midnight violet & neon lilac",
    isDark: true,
    bg: "#100D1B",
    surface: "#1B1530",
    surfaceAlt: "#251D40",
    heroBg: "#18122B",
    heroInk: "#F5F3FF",
    ink: "#F5F3FF",
    muted: "#A59EC9",
    border: "#3D3166",
    shadow: "#07050D",
    accent: "#8B5CF6",
    secondary: "#C084FC",
    consoleBg: "#090712",
    consoleInk: "#F5F3FF",
  },
  {
    id: "blue-powder",
    name: "Blue Powder",
    tagline: "Deep slate & arctic cyan",
    isDark: true,
    bg: "#0D151A",
    surface: "#142028",
    surfaceAlt: "#1B2B35",
    heroBg: "#111C23",
    heroInk: "#F0F9FF",
    ink: "#F0F9FF",
    muted: "#94B0BE",
    border: "#2A4352",
    shadow: "#05090C",
    accent: "#38BDF8",
    secondary: "#22D3EE",
    consoleBg: "#080E12",
    consoleInk: "#F0F9FF",
  },
  {
    id: "matcha-paper",
    name: "Matcha Paper",
    tagline: "Daylight sage & forest ink",
    isDark: false,
    bg: "#EDF4ED",
    surface: "#FFFFFF",
    surfaceAlt: "#DCEAD9",
    heroBg: "#1B4332",
    heroInk: "#FFFFFF",
    ink: "#132219",
    muted: "#4A5D52",
    border: "#132219",
    shadow: "#132219",
    accent: "#2D6A4F",
    secondary: "#D97706",
    consoleBg: "#132219",
    consoleInk: "#ECFDF5",
  },
];

export const ACCENT_SWATCHES = [
  "#F25C48",
  "#D94E5A",
  "#F59E0B",
  "#B2F96F",
  "#8B5CF6",
  "#38BDF8",
  "#2D6A4F",
  "#EC4899",
];

export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex.trim());
}

export function getContrastText(hex: string): string {
  if (!isValidHex(hex)) return "#FFFFFF";
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  return L > 0.42 ? "#111315" : "#FFFFFF";
}

export function getThemeById(id: string): PortfolioTheme {
  return PORTFOLIO_THEMES.find((t) => t.id === id) || PORTFOLIO_THEMES[0];
}
