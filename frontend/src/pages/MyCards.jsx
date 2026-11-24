import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardGallery from "../components/CardGallery.jsx";
import CardModal from "../components/CardModal.jsx";
import { cardsApi } from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

export default function MyCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const showToast = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await cardsApi.getAll();
      setCards(res.data.data || []);
    } catch (e) {
      showToast(e.response?.data?.message || "Oops! Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await cardsApi.remove(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      setSelected(null);
      showToast("Identity deleted.", "success");
    } catch (e) {
      showToast(e.response?.data?.message || "Oops! Something went wrong.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center text-cream font-mono text-sm">
        Loading your little universe...
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center text-center px-5">
        <div className="text-4xl mb-4">☻</div>
        <h2 className="font-heading text-2xl font-bold text-cream">YOU DON'T HAVE AN IDENTITY YET.</h2>
        <p className="text-cream/60 mt-2">Well... at least not here.</p>
        <Link
          to="/create"
          className="mt-6 px-6 py-3 rounded-full bg-pink text-inkblack font-heading font-bold border-4 border-inkblack shadow-card"
        >
          Create My First ID →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-60px)] py-10">
      <h1 className="font-heading text-3xl font-bold text-cream text-center mb-8">My Collection</h1>
      <CardGallery cards={cards} onSelect={setSelected} />
      <CardModal card={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
    </div>
  );
}
