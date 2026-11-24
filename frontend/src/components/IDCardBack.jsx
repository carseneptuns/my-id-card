export default function IDCardBack({ data, cardNumber }) {
  const {
    given_name, short_bio, favorite_things,
    secondary_color, primary_color, accent_color,
  } = data;

  const favorites = (favorite_things || "")
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  const barcodeBars = Array.from({ length: 30 }, (_, i) => ((i * 7) % 5) + 2);

  return (
    <div
      className="grain relative w-full h-full rounded-3xl border-4 border-inkblack shadow-card overflow-hidden flex flex-col"
      style={{ backgroundColor: secondary_color }}
    >
      <div
        className="shrink-0 h-[16%] min-h-[26px] px-3 sm:px-5 flex items-center border-b-4 border-inkblack overflow-hidden"
        style={{ backgroundColor: primary_color }}
      >
        <span className="font-mono text-[5px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          FOR FUN ONLY · NOT AN OFFICIAL DOCUMENT
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-between px-3 sm:px-5 py-2 sm:py-3 gap-1 sm:gap-2 overflow-hidden">
        <div className="min-h-0 overflow-hidden">
          <p className="font-script text-lg sm:text-3xl leading-none mb-1 sm:mb-2 truncate" style={{ color: accent_color }}>
            {given_name || "Your Name"}
          </p>
          <div className="dashed-line pb-0.5 sm:pb-1 mb-1 sm:mb-2">
            <div className="font-mono text-[5px] sm:text-[8px] tracking-widest text-inkblack/60">SHORT BIO</div>
            <p className="text-[9px] sm:text-sm font-serif italic line-clamp-2">
              {short_bio || "A tiny card for a very big personality."}
            </p>
          </div>

          {favorites.length > 0 && (
            <div>
              <div className="font-mono text-[5px] sm:text-[8px] tracking-widest text-inkblack/60 mb-0.5 sm:mb-1">FAVORITE THINGS</div>
              <ul className="text-[9px] sm:text-sm space-y-0 sm:space-y-0.5 truncate">
                {favorites.slice(0, 3).map((f, i) => (
                  <li key={i} className="truncate">✦ {f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="shrink-0">
          <div className="flex items-end gap-[1px] sm:gap-[2px] h-4 sm:h-8 mb-0.5 sm:mb-1">
            {barcodeBars.map((h, i) => (
              <div key={i} className="bg-inkblack" style={{ width: `${h % 3 === 0 ? 2 : 1}px`, height: `${(h + 8)}px` }} />
            ))}
          </div>
          <div className="flex items-center justify-between font-mono text-[6px] sm:text-[10px] tracking-widest">
            <span>CARD NUMBER</span>
            <span className="font-bold">{cardNumber || "•••-•••-••••"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
