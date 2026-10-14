export type ThemeId = 'clinical_sapphire' | 'restorative_eucalyptus' | 'high_contrast' | 'diagnostic_dark';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  description: string;
  // CSS class mappings
  appBg: string;
  headerBg: string;
  headerBorder: string;
  headerTitle: string;
  headerSub: string;
  surfaceCard: string;
  surfaceBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primaryBtn: string;
  primaryBtnDisabled: string;
  accentBadge: string;
  bodyChartBg: string;
  bodyChartFill: string;
  bodyChartFillActive: string;
  bodyChartHover: string;
  bodyChartStroke: string;
  chipBg: string;
  chipText: string;
  chipBorder: string;
  itemHover: string;
  itemActive: string;
  alertBg: string;
  alertBorder: string;
  alertText: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  clinical_sapphire: {
    id: 'clinical_sapphire',
    name: 'Clinical Sapphire & Slate',
    badge: 'Recommended',
    description: 'Calibrated hospital-grade palette with clinical sapphire accents and deep slate typography.',
    appBg: 'bg-slate-50/80',
    headerBg: 'bg-slate-900',
    headerBorder: 'border-slate-800',
    headerTitle: 'text-white',
    headerSub: 'text-slate-300',
    surfaceCard: 'bg-white',
    surfaceBorder: 'border-slate-200',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    primaryBtn: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm',
    primaryBtnDisabled: 'bg-slate-200 text-slate-400 cursor-not-allowed',
    accentBadge: 'bg-sky-50 text-sky-700 border-sky-200',
    bodyChartBg: 'fill-slate-100',
    bodyChartFill: 'fill-sky-100/70',
    bodyChartFillActive: 'fill-sky-600',
    bodyChartHover: 'hover:fill-sky-200',
    bodyChartStroke: 'stroke-white',
    chipBg: 'bg-slate-100',
    chipText: 'text-slate-800',
    chipBorder: 'border-slate-200',
    itemHover: 'hover:bg-slate-50',
    itemActive: 'bg-sky-50/70 border-sky-200',
    alertBg: 'bg-rose-50',
    alertBorder: 'border-rose-300',
    alertText: 'text-rose-950',
  },
  restorative_eucalyptus: {
    id: 'restorative_eucalyptus',
    name: 'Restorative Mint & Spruce',
    badge: 'Modern Healthtech',
    description: 'Clean therapeutic eucalyptus with soothing organic porcelain surfaces and deep pine ink.',
    appBg: 'bg-[#F4F8F5]',
    headerBg: 'bg-[#0E3A2F]',
    headerBorder: 'border-[#1B5244]',
    headerTitle: 'text-white',
    headerSub: 'text-emerald-100/90',
    surfaceCard: 'bg-white',
    surfaceBorder: 'border-[#D9E6DD]',
    textPrimary: 'text-[#122A22]',
    textSecondary: 'text-[#2D4D41]',
    textMuted: 'text-[#527064]',
    primaryBtn: 'bg-[#0E624F] hover:bg-[#0B4F40] text-white shadow-sm',
    primaryBtnDisabled: 'bg-slate-200 text-slate-400 cursor-not-allowed',
    accentBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    bodyChartBg: 'fill-emerald-50',
    bodyChartFill: 'fill-emerald-100',
    bodyChartFillActive: 'fill-[#0E624F]',
    bodyChartHover: 'hover:fill-emerald-200',
    bodyChartStroke: 'stroke-white',
    chipBg: 'bg-emerald-50/80',
    chipText: 'text-[#122A22]',
    chipBorder: 'border-emerald-200',
    itemHover: 'hover:bg-emerald-50/40',
    itemActive: 'bg-emerald-50 border-emerald-300',
    alertBg: 'bg-amber-50',
    alertBorder: 'border-amber-300',
    alertText: 'text-amber-950',
  },
  high_contrast: {
    id: 'high_contrast',
    name: 'High Contrast (WCAG AAA)',
    badge: 'Maximum Legibility',
    description: 'Stark black-and-white foundation with 2px solid boundaries and deep cobalt focus points.',
    appBg: 'bg-white',
    headerBg: 'bg-black',
    headerBorder: 'border-black',
    headerTitle: 'text-white',
    headerSub: 'text-neutral-200',
    surfaceCard: 'bg-white',
    surfaceBorder: 'border-2 border-black',
    textPrimary: 'text-black',
    textSecondary: 'text-neutral-900',
    textMuted: 'text-neutral-700',
    primaryBtn: 'bg-black hover:bg-neutral-800 text-white font-bold border-2 border-black',
    primaryBtnDisabled: 'bg-neutral-100 text-neutral-400 border-2 border-neutral-300 cursor-not-allowed',
    accentBadge: 'bg-neutral-100 text-black border-2 border-black',
    bodyChartBg: 'fill-neutral-200',
    bodyChartFill: 'fill-neutral-100',
    bodyChartFillActive: 'fill-black',
    bodyChartHover: 'hover:fill-neutral-300',
    bodyChartStroke: 'stroke-black',
    chipBg: 'bg-white',
    chipText: 'text-black',
    chipBorder: 'border-2 border-black',
    itemHover: 'hover:bg-neutral-100',
    itemActive: 'bg-neutral-100 border-2 border-black font-semibold',
    alertBg: 'bg-red-100',
    alertBorder: 'border-2 border-red-700',
    alertText: 'text-red-950',
  },
  diagnostic_dark: {
    id: 'diagnostic_dark',
    name: 'Diagnostic Night Mode',
    badge: 'Low Glare',
    description: 'Low-light obsidian background with luminous cyan indicators for evening triage.',
    appBg: 'bg-[#090D16]',
    headerBg: 'bg-[#0F172A]',
    headerBorder: 'border-slate-800',
    headerTitle: 'text-slate-100',
    headerSub: 'text-slate-400',
    surfaceCard: 'bg-[#111827]',
    surfaceBorder: 'border-slate-800',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    primaryBtn: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold',
    primaryBtnDisabled: 'bg-slate-800 text-slate-600 cursor-not-allowed',
    accentBadge: 'bg-sky-950/60 text-sky-300 border-sky-800',
    bodyChartBg: 'fill-slate-800',
    bodyChartFill: 'fill-slate-700',
    bodyChartFillActive: 'fill-sky-400',
    bodyChartHover: 'hover:fill-slate-600',
    bodyChartStroke: 'stroke-[#111827]',
    chipBg: 'bg-slate-800',
    chipText: 'text-slate-200',
    chipBorder: 'border-slate-700',
    itemHover: 'hover:bg-slate-800/60',
    itemActive: 'bg-sky-950/40 border-sky-600/60',
    alertBg: 'bg-rose-950/40',
    alertBorder: 'border-rose-800',
    alertText: 'text-rose-200',
  },
};
