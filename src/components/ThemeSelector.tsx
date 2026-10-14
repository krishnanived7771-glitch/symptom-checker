import React from 'react';
import { THEMES, ThemeConfig, ThemeId } from '../utils/theme';
import { Palette, Check, Eye } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onThemeChange: (themeId: ThemeId) => void;
  textScale: 'normal' | 'large' | 'xlarge';
  onTextScaleChange: (scale: 'normal' | 'large' | 'xlarge') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  textScale,
  onTextScaleChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
          <Palette className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Visual Theme &amp; Accessibility
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            WCAG AA/AAA compliant high-contrast color palettes
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {/* Theme presets buttons */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg gap-1 border border-slate-200/70 dark:border-slate-700">
          {(Object.keys(THEMES) as ThemeId[]).map((id) => {
            const theme = THEMES[id];
            const isSelected = currentTheme.id === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onThemeChange(id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && <Check className="w-3 h-3 text-sky-600" aria-hidden="true" />}
                <span>{theme.name.split(' ')[0]}</span>
                <span className="hidden md:inline text-[10px] opacity-75">
                  ({theme.badge})
                </span>
              </button>
            );
          })}
        </div>

        {/* Text scale toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200/70 dark:border-slate-700">
          <span className="px-1.5 text-[11px] text-slate-500 flex items-center gap-1">
            <Eye className="w-3 h-3" /> Text:
          </span>
          <button
            type="button"
            onClick={() => onTextScaleChange('normal')}
            className={`px-2 py-0.5 text-xs font-medium rounded ${
              textScale === 'normal'
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
            title="Standard Text Size"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => onTextScaleChange('large')}
            className={`px-2 py-0.5 text-sm font-medium rounded ${
              textScale === 'large'
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
            title="Large Text Size"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => onTextScaleChange('xlarge')}
            className={`px-2 py-0.5 text-base font-medium rounded ${
              textScale === 'xlarge'
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
            title="Extra Large Text Size"
          >
            A++
          </button>
        </div>
      </div>
    </div>
  );
};
