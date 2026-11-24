import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IDCard from "./IDCard.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { downloadCardAsImage } from "../utils/downloadCard.js";

export default function CardModal({ card, onClose, onDelete }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!card) return null;

  const handleDownload = () => {
    const node = cardRef.current?.getExportNode?.();
    downloadCardAsImage(node, `${card.given_name || "my-id-card"}.png`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/70 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-forest rounded-3xl border-4 border-cream/20 shadow-card max-w-lg w-full p-6 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-cream/70 hover:text-cream">
            <FaTimes />
          </button>

          <IDCard ref={cardRef} data={card} cardNumber={card.card_number} />

          <div className="flex flex-wrap gap-2 justify-center mt-5">
            <button
              onClick={() => navigate(`/edit/${card.id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-mint border-2 border-inkblack font-heading text-sm hover:brightness-95"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-softpink border-2 border-inkblack font-heading text-sm hover:brightness-95"
            >
              <FaDownload /> Download
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-300 border-2 border-inkblack font-heading text-sm hover:brightness-95"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </motion.div>
      </motion.div>

      <DeleteModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(card.id);
        }}
      />
    </AnimatePresence>
  );
}
