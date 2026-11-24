import { motion } from "framer-motion";
import IDCardFront from "./IDCardFront.jsx";

const rotations = ["-2deg", "1deg", "-1deg", "2deg", "-1.5deg", "1.5deg"];

export default function CardGallery({ cards, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
          whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="cursor-pointer aspect-[1.6/1]"
          onClick={() => onSelect(card)}
        >
          <IDCardFront data={card} />
        </motion.div>
      ))}
    </div>
  );
}
