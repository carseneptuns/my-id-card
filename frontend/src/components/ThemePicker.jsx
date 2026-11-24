import { THEMES } from "../constants/themes.js";

export default function ThemePicker({ value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-cream/80 mb-2">CHOOSE YOUR THEME</label>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key, theme)}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-transform hover:scale-105 ${
              value === key ? "border-cream scale-105 ring-2 ring-pink" : "border-black/20"
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 33%, ${theme.secondary} 66%, ${theme.accent} 100%)`,
            }}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
}
