import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IDCardForm from "../components/IDCardForm.jsx";
import IDCard from "../components/IDCard.jsx";
import { cardsApi } from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await cardsApi.getOne(id);
        setData(res.data.data);
      } catch (e) {
        showToast(
          e.response?.data?.message || "This identity could not be found.",
          "error"
        );
        navigate("/my-cards");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpload = async (file) => {
    setUploading(true);

    try {
      const res = await cardsApi.uploadPhoto(file);

      setData((d) => ({
        ...d,
        image_url: res.data.data.image_url,
      }));

      showToast("Photo uploaded successfully!", "success");
    } catch (e) {
      showToast(
        e.response?.data?.message || "Oops! Something went wrong.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!data.given_name.trim()) {
      setErrors({
        given_name: "Please tell us your name first!",
      });
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      await cardsApi.update(id, data);

      showToast("Identity updated!", "success");
      navigate("/my-cards");
    } catch (e) {
      showToast(
        e.response?.data?.message || "Oops! Something went wrong.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center text-cream font-mono text-sm">
        Loading your little universe...
      </div>
    );
  }

  return (
    <div className="star-field min-h-[calc(100vh-60px)] px-5 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <div className="bg-black/10 rounded-3xl p-6">
          <h1 className="font-heading text-2xl font-bold text-cream mb-1">
            Edit Your Identity
          </h1>

          <p className="text-cream/60 text-sm mb-5">
            tweak anything — it updates live.
          </p>

          <IDCardForm
            data={data}
            onChange={setData}
            onUpload={handleUpload}
            onRemovePhoto={() =>
              setData((d) => ({
                ...d,
                image_url: "",
              }))
            }
            uploading={uploading}
            errors={errors}
          />
        </div>

        <div className="flex flex-col items-center gap-6 lg:sticky lg:top-24 self-start">
          <IDCard data={data} cardNumber={data.card_number} />

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-cards")}
              className="px-5 py-3 rounded-full bg-cream border-4 border-inkblack font-heading font-bold"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-full bg-mint border-4 border-inkblack font-heading font-bold shadow-card hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}