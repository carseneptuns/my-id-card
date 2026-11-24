import { DECORATIONS } from "../constants/themes.js";

export default function DecorationPicker({ value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-cream/80 mb-2">DECORATION</label>
      <div className="flex gap-2 flex-wrap">
        {DECORATIONS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => onChange(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-heading capitalize border-2 transition-colors ${
              value === d ? "bg-pink border-cream text-inkblack" : "bg-transparent border-cream/40 text-cream"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
