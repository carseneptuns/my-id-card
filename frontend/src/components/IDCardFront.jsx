import { FaStar } from "react-icons/fa";
import { resolveImageUrl } from "../services/api.js";

const frameClass = {
  square: "rounded-md",
  rounded: "rounded-2xl",
  circle: "rounded-full",
  polaroid: "rounded-sm p-1 bg-white",
  sticker: "rounded-3xl border-dashed",
};

const decorationDots = {
  none: [],
  minimal: ["✦", "★"],
  playful: ["✦", "★", "♥", "☁"],
  extra: ["✦", "★", "♥", "☁", "☾", "♠", "☀", "♡"],
};

export default function IDCardFront({ data }) {
  const {
    given_name, nickname, age, species, birthday,
    primary_color, secondary_color, accent_color,
    personal_symbol, photo_frame, image_url, decoration,
  } = data;

  const dots = decorationDots[decoration] || decorationDots.minimal;

  return (
    <div
      className="grain relative w-full h-full rounded-3xl border-4 border-inkblack shadow-card overflow-hidden flex flex-col"
      style={{ backgroundColor: secondary_color }}
    >
      {/* scattered decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40 text-[10px] sm:text-sm z-0">
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: `${(i * 37 + 12) % 85}%`,
              left: `${(i * 53 + 6) % 90}%`,
              color: accent_color,
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* header — fixed height, never wraps */}
      <div
        className="relative z-10 shrink-0 h-[16%] min-h-[26px] px-3 sm:px-5 flex items-center justify-between border-b-4 border-inkblack overflow-hidden"
        style={{ backgroundColor: primary_color }}
      >
        <span className="font-mono text-[6px] xs:text-[7px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          NATIONAL ID CARD
        </span>
        <span className="flex gap-0.5 text-[8px] sm:text-xs shrink-0 ml-1" style={{ color: accent_color }}>
          <FaStar /><FaStar /><FaStar /><FaStar />
        </span>
      </div>

      {/* body — flex-1 with min-h-0 so children are forced to fit, never overflow */}
      <div className="relative z-10 flex-1 min-h-0 flex gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2">
        {/* photo — sized by the row's actual height, not its own aspect ratio */}
        <div
          className={`h-full w-[30%] max-w-[110px] border-2 sm:border-4 border-inkblack overflow-hidden flex items-center justify-center bg-white shrink-0 ${frameClass[photo_frame] || frameClass.square}`}
          style={{ borderColor: accent_color }}
        >
          {image_url ? (
            <img src={resolveImageUrl(image_url)} alt={given_name || "photo"} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-inkblack/50 text-center gap-0.5 px-1">
              <span className="text-base sm:text-xl">✦</span>
              <span className="font-mono text-[5px] sm:text-[8px] leading-tight hidden sm:block">YOUR<br/>PHOTO<br/>HERE</span>
            </div>
          )}
        </div>

        {/* info — min-h-0 + min-w-0 let rows compress instead of pushing the card taller */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col justify-center gap-0.5 sm:gap-1 overflow-hidden">
          <InfoRow label="GIVEN NAME" value={given_name || "Your Name"} big />
          <InfoRow label="NICKNAME" value={nickname || "—"} />
          <InfoRow label="AGE" value={age || "—"} />
          <InfoRow label="SPECIES" value={species || "—"} />
          <InfoRow label="BIRTHDAY" value={birthday || "—"} last />
        </div>
      </div>

      {/* footer — fixed height */}
      <div className="relative z-10 shrink-0 h-[14%] min-h-[22px] flex items-center justify-between px-3 sm:px-5">
        <span className="flex gap-0.5 sm:gap-1 text-[8px] sm:text-xs" style={{ color: accent_color }}>
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </span>
        <span className="text-[10px] sm:text-lg leading-none" style={{ color: accent_color }}>
          [ {personal_symbol || "★"} ]
        </span>
      </div>
    </div>
  );
}

function InfoRow({ label, value, big, last }) {
  return (
    <div className={`min-h-0 leading-tight ${last ? "" : "dashed-line pb-0.5"}`}>
      <div className="font-mono text-[5px] sm:text-[8px] tracking-widest text-inkblack/60 truncate">{label}</div>
      <div
        className={`font-serif italic truncate ${
          big ? "text-[11px] sm:text-lg font-semibold" : "text-[9px] sm:text-sm"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
