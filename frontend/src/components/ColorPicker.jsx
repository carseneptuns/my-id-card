const SWATCHES = ["#F2A6D1", "#A8D8EA", "#9AD7C0", "#C9B6E4", "#E88989", "#FFE38F", "#F4E8D1", "#FFFBE6", "#A9E2D7", "#9E3C87"];

function Swatch({ label, value, onChange }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-widest text-cream/70 mb-1">{label}</div>
      <div className="flex gap-1.5 flex-wrap">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`w-6 h-6 rounded-full border-2 ${value === c ? "border-cream scale-110" : "border-black/20"} transition-transform`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ColorPicker({ primary, secondary, accent, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block font-mono text-xs tracking-widest text-cream/80">CUSTOMIZE COLORS</label>
      <Swatch label="PRIMARY" value={primary} onChange={(c) => onChange("primary_color", c)} />
      <Swatch label="SECONDARY" value={secondary} onChange={(c) => onChange("secondary_color", c)} />
      <Swatch label="ACCENT" value={accent} onChange={(c) => onChange("accent_color", c)} />
    </div>
  );
}
