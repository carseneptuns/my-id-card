import { SYMBOLS } from "../constants/themes.js";

export default function SymbolPicker({ value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-cream/80 mb-2">PERSONAL SYMBOL</label>
      <div className="flex flex-wrap gap-2">
        {SYMBOLS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-transform hover:scale-110 ${
              value === s ? "bg-pink border-cream scale-110" : "bg-cream border-black/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
