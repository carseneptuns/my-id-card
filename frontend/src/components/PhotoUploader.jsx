import { useRef, useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import { resolveImageUrl } from "../services/api.js";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function PhotoUploader({ imageUrl, onUpload, onRemove, uploading }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    setError("");
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("That photo is too big — 5MB max.");
      return;
    }
    onUpload(file);
  };

  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-cream/80 mb-2">UPLOAD YOUR PHOTO</label>
      <div
        className="w-28 h-36 rounded-xl border-2 border-dashed border-cream/50 bg-white/5 flex items-center justify-center overflow-hidden relative cursor-pointer group"
        onClick={() => inputRef.current?.click()}
      >
        {imageUrl ? (
          <img src={resolveImageUrl(imageUrl)} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-cream/60 text-center px-1 gap-1">
            <FaCamera />
            <span className="font-mono text-[9px] leading-tight">YOUR<br />PHOTO<br />HERE</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-cream text-xs">...</div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div className="flex gap-3 mt-2 text-xs">
        <button type="button" onClick={() => inputRef.current?.click()} className="text-softpink underline">
          {imageUrl ? "Replace" : "Upload"}
        </button>
        {imageUrl && (
          <button type="button" onClick={onRemove} className="text-red-300 underline flex items-center gap-1">
            <FaTrash size={10} /> Remove
          </button>
        )}
      </div>
      {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
    </div>
  );
}
