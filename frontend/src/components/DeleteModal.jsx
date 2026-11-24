import { motion, AnimatePresence } from "framer-motion";

export default function DeleteModal({ open, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-3xl border-4 border-inkblack shadow-card max-w-sm w-full p-6 text-center"
          >
            <p className="font-heading text-xl font-bold mb-2">Delete this identity?</p>
            <p className="text-sm text-inkblack/70 mb-6">
              Once it's gone, this little version of you will disappear forever.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-full border-2 border-inkblack font-heading text-sm hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-full bg-red-400 border-2 border-inkblack font-heading text-sm text-white hover:bg-red-500"
              >
                Delete Anyway
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
