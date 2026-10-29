export interface ColorScheme {
  bg: string;
  border: string;
  text: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const THEME_COLOR_SCHEMES: Record<string, ColorScheme> = {
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    text: 'text-teal-700',
    iconText: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-100',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    iconText: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    iconText: 'text-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-100',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
    iconText: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-100',
  },
  sky: {
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
    iconText: 'text-sky-600',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    badgeBorder: 'border-sky-100',
  },
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-700',
    iconText: 'text-slate-600',
    badgeBg: 'bg-slate-50',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-100',
  },
};

export function getColorScheme(color: string): ColorScheme {
  return THEME_COLOR_SCHEMES[color] || THEME_COLOR_SCHEMES.slate;
}
