import { THEMES, SPECIES_OPTIONS, PRONOUN_OPTIONS, FAVORITE_OPTIONS, PHOTO_FRAMES } from "../constants/themes.js";
import PhotoUploader from "./PhotoUploader.jsx";
import ThemePicker from "./ThemePicker.jsx";
import ColorPicker from "./ColorPicker.jsx";
import SymbolPicker from "./SymbolPicker.jsx";
import DecorationPicker from "./DecorationPicker.jsx";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-cream/80 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-cream text-inkblack placeholder:text-inkblack/40 border-2 border-black/10 focus:border-pink outline-none text-sm";

export default function IDCardForm({ data, onChange, onUpload, onRemovePhoto, uploading, errors = {} }) {
  const set = (field, value) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-5">
      <Field label="GIVEN NAME *">
        <input
          className={inputClass}
          value={data.given_name}
          maxLength={100}
          placeholder="Ibon"
          onChange={(e) => set("given_name", e.target.value)}
        />
        {errors.given_name && <p className="text-red-300 text-xs mt-1">{errors.given_name}</p>}
      </Field>

      <Field label="NICKNAME">
        <input className={inputClass} value={data.nickname} placeholder="Cat-1" onChange={(e) => set("nickname", e.target.value)} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="AGE">
          <input className={inputClass} value={data.age} placeholder="1 year" onChange={(e) => set("age", e.target.value)} />
        </Field>
        <Field label="BIRTHDAY">
          <input type="date" className={inputClass} value={data.birthday || ""} onChange={(e) => set("birthday", e.target.value)} />
        </Field>
      </div>

      <Field label="PRONOUNS">
        <select className={inputClass} value={data.pronouns} onChange={(e) => set("pronouns", e.target.value)}>
          <option value="">Select...</option>
          {PRONOUN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>

      <Field label="SPECIES / IDENTITY">
        <select className={inputClass} value={data.species} onChange={(e) => set("species", e.target.value)}>
          <option value="">Select...</option>
          {SPECIES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <Field label="FAVORITE THINGS (comma separated)">
        <input
          className={inputClass}
          value={data.favorite_things}
          placeholder="Matcha, cats, sleeping"
          onChange={(e) => set("favorite_things", e.target.value)}
        />
        <div className="flex gap-1 flex-wrap mt-1">
          {FAVORITE_OPTIONS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => set("favorite_things", data.favorite_things ? `${data.favorite_things}, ${f}` : f)}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-cream hover:bg-white/20"
            >
              + {f}
            </button>
          ))}
        </div>
      </Field>

      <Field label={`SHORT BIO (${(data.short_bio || "").length}/150)`}>
        <textarea
          className={inputClass}
          rows={2}
          maxLength={150}
          value={data.short_bio}
          placeholder="Professional napper and part-time main character."
          onChange={(e) => set("short_bio", e.target.value)}
        />
      </Field>

      <PhotoUploader imageUrl={data.image_url} onUpload={onUpload} onRemove={onRemovePhoto} uploading={uploading} />

      <Field label="PHOTO FRAME">
        <div className="flex gap-2 flex-wrap">
          {PHOTO_FRAMES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => set("photo_frame", f)}
              className={`px-3 py-1 rounded-full text-xs capitalize border-2 ${
                data.photo_frame === f ? "bg-pink border-cream" : "bg-transparent border-cream/40 text-cream"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Field>

      <ThemePicker
        value={data.theme}
        onChange={(key, theme) =>
          onChange({
            ...data,
            theme: key,
            primary_color: theme.primary,
            secondary_color: theme.secondary,
            accent_color: theme.accent,
          })
        }
      />

      <ColorPicker
        primary={data.primary_color}
        secondary={data.secondary_color}
        accent={data.accent_color}
        onChange={set}
      />

      <SymbolPicker value={data.personal_symbol} onChange={(s) => set("personal_symbol", s)} />

      <DecorationPicker value={data.decoration} onChange={(d) => set("decoration", d)} />
    </div>
  );
}
