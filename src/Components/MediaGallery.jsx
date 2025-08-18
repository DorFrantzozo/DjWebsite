import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MediaCarousel({ items }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="container mx-auto px-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer overflow-hidden rounded-xl bg-white/5 hover:ring-2 hover:ring-white/20"
            onClick={() => setSelected(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt="media"
                className="object-cover w-full h-full aspect-square"
              />
            ) : (
              <video
                src={item.src}
                muted
                className="object-cover w-full h-full aspect-square"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* מודאל להגדלה */}
      {selected && selected.src && (
        <div className="fixed inset-0 z-40 bg-black/80 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-white hover:text-red-400 z-50"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-40 max-h-full w-full max-w-6xl overflow-auto rounded-xl shadow-lg"
          >
            {selected.type === "image" ? (
              <img
                src={selected.src}
                alt="full"
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
              />
            ) : (
              <video
                src={selected.src}
                controls
                autoPlay
                className="w-full h-auto max-h-[90vh] rounded-xl"
              />
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
