import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IDCardFront from "../components/IDCardFront.jsx";
import { DEFAULT_CARD } from "../constants/themes.js";

const sample = {
  ...DEFAULT_CARD,
  given_name: "Ibon",
  nickname: "Cat-1",
  age: "1 year",
  species: "Cat",
  birthday: "July 25, 2026",
  personal_symbol: "★",
};

export default function Home() {
  return (
    <div className="star-field relative min-h-[calc(100vh-60px)] overflow-hidden flex flex-col items-center justify-center text-center px-5 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-4xl sm:text-6xl font-bold text-cream leading-tight"
      >
        WHO ARE
        <br />
        YOU TODAY?
      </motion.h1>
      <p className="text-softpink font-serif italic text-lg sm:text-xl mt-4 max-w-md">
        A tiny card for your very big personality.
      </p>

      <Link to="/create">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 px-7 py-3 rounded-full bg-pink text-inkblack font-heading font-bold border-4 border-inkblack shadow-card"
        >
          Create My ID →
        </motion.button>
      </Link>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mt-14 w-full max-w-[420px] aspect-[1.6/1]"
      >
        <IDCardFront data={sample} />
      </motion.div>

      <p className="text-cream/50 text-xs font-mono mt-8 max-w-sm">
        create your own little identity. · for fun only, not an official document
      </p>
    </div>
  );
}
