import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IDCardForm from "../components/IDCardForm.jsx";
import IDCard from "../components/IDCard.jsx";
import { DEFAULT_CARD } from "../constants/themes.js";
import { cardsApi } from "../services/api.js";
import { useToast } from "../components/Toast.jsx";
import { randomPreviewNumber } from "../utils/cardNumber.js";

export default function CreateCard() {
  const [data, setData] = useState({ ...DEFAULT_CARD });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewNumber] = useState(randomPreviewNumber());
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const showToast = useToast();

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const res = await cardsApi.uploadPhoto(file);
      setData((d) => ({ ...d, image_url: res.data.data.image_url }));
      showToast("Photo uploaded successfully!", "success");
    } catch (e) {
      showToast(e.response?.data?.message || "Oops! Something went wrong.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!data.given_name.trim()) {
      setErrors({ given_name: "Please tell us your name first!" });
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      await cardsApi.create(data);
      showToast("Your little identity has been saved. ★", "success");
      navigate("/my-cards");
    } catch (e) {
      showToast(e.response?.data?.message || "Oops! Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="star-field min-h-[calc(100vh-60px)] px-5 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <div className="bg-black/10 rounded-3xl p-6">
          <h1 className="font-heading text-2xl font-bold text-cream mb-1">Fill Your Identity</h1>
          <p className="text-cream/60 text-sm mb-5">create your own little identity.</p>
          <IDCardForm
            data={data}
            onChange={setData}
            onUpload={handleUpload}
            onRemovePhoto={() => setData((d) => ({ ...d, image_url: "" }))}
            uploading={uploading}
            errors={errors}
          />
        </div>

        <div className="flex flex-col items-center gap-6 lg:sticky lg:top-24 self-start">
          <IDCard ref={cardRef} data={data} cardNumber={previewNumber} />
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-full bg-mint border-4 border-inkblack font-heading font-bold shadow-card hover:brightness-95 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save My ID"}
          </button>
        </div>
      </div>
    </div>
  );
}
