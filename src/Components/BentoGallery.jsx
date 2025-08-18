import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const BentoGallery = ({ items }) => {
  const [selected, setSelected] = useState(null);

  const imageItems = items.filter((item) => item.type === "image");
  const videoItems = items.filter((item) => item.type === "video");

  const groups = [];
  for (let i = 0; i < imageItems.length; i += 4) {
    const images = imageItems.slice(i, i + 4);
    const video = videoItems[Math.floor(i / 4)] || null;
    groups.push({ images, video });
  }

  return (
    <section className="container mx-auto px-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Featured</h2>

      {groups.map((group, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-5 gap-4   mb-16"
        >
          {index % 2 === 0 ? (
            <>
              {/* Images left */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 md:col-span-2 h-full">
                {group.images.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer overflow-hidden rounded-xl bg-white/5 hover:ring-2 hover:ring-white/20 h-full"
                    onClick={() => setSelected(item)}
                  >
                    <img
                      src={item.src}
                      alt="media"
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Video right */}
              {group.video && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="md:col-span-3 w-full h-full overflow-hidden rounded-xl bg-white/5 hover:ring-2 hover:ring-white/20 cursor-pointer"
                  onClick={() => setSelected(group.video)}
                >
                  <video
                    src={group.video.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover aspect-video md:aspect-auto"
                  />
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Video left (reverse) */}
              {group.video && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="md:col-span-3 w-full h-full overflow-hidden rounded-xl bg-white/5 hover:ring-2 hover:ring-white/20 cursor-pointer order-last md:order-first"
                  onClick={() => setSelected(group.video)}
                >
                  <video
                    src={group.video.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover aspect-video md:aspect-auto"
                  />
                </motion.div>
              )}

              {/* Images right (reverse) */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 md:col-span-2 h-full">
                {group.images.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer overflow-hidden rounded-xl bg-white/5 hover:ring-2 hover:ring-white/20 h-full"
                    onClick={() => setSelected(item)}
                  >
                    <img
                      src={item.src}
                      alt="media"
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Viewer Modal */}
      {selected && selected.src && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
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
};

export default BentoGallery;
