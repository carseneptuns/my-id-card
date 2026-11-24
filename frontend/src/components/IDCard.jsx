import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa";
import IDCardFront from "./IDCardFront.jsx";
import IDCardBack from "./IDCardBack.jsx";

// forwardRef exposes getExportNode() so parents can grab a clean, non-rotated
// DOM node for PNG export via html-to-image. We can't export directly from
// the flip container: html-to-image (like html2canvas) doesn't understand
// CSS 3D transforms (rotateY / backface-visibility), so it would rasterize
// both faces stacked and mirrored. Instead we keep two flat, untransformed
// clones off-screen purely for export, and hand back whichever one matches
// the side currently showing.
const IDCard = forwardRef(function IDCard({ data, cardNumber, showFlipButton = true }, ref) {
  const [flipped, setFlipped] = useState(false);
  const frontExportRef = useRef(null);
  const backExportRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getExportNode: () => (flipped ? backExportRef.current : frontExportRef.current),
  }));

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="perspective w-full max-w-[420px] aspect-[1.6/1]">
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 backface-hidden">
            <IDCardFront data={data} />
          </div>
          <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
            <IDCardBack data={data} cardNumber={cardNumber} />
          </div>
        </motion.div>
      </div>

      {/* Off-screen, non-rotated clones — export source only, never shown to the user. */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: -9999, width: 420, pointerEvents: "none" }}
      >
        <div ref={frontExportRef} style={{ width: 420, height: 262.5 }}>
          <IDCardFront data={data} />
        </div>
        <div ref={backExportRef} style={{ width: 420, height: 262.5 }}>
          <IDCardBack data={data} cardNumber={cardNumber} />
        </div>
      </div>

      {showFlipButton && (
        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream border-2 border-inkblack font-heading text-sm font-medium hover:bg-softpink transition-colors"
        >
          <FaSyncAlt /> Flip Card
        </button>
      )}
    </div>
  );
});

export default IDCard;
