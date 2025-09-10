// src/components/BottomSheet.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import Fab from './ui/Fab';

export default function BottomSheet({ place, onClose, onExplore }) {
  const [{ y }, api] = useSpring(() => ({ y: 100 }));

  const bind = useDrag(
    ({ active, movement: [, my], direction: [, dy], velocity }) => {
      if (!active && (velocity > 0.3 || (dy > 0 && my > 100))) {
        onClose();
        return;
      }
      api.start({ y: active ? my : 0, immediate: active });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 pointer-events-none"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <animated.div
            {...bind()}
            style={{ transform: y.to((v) => `translateY(${v}px)`), touchAction: 'none' }}
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-[24px] shadow-sheet p-4 max-h-[70vh] overflow-y-auto pointer-events-auto flex flex-col animate-sheet-up"
          >
            <div className="flex justify-center mb-3">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              {place.media.heroImage && (
                <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={place.media.heroImage}
                    alt={`Thumbnail for ${place.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-textPrimary truncate">{place.name}</h3>
                <p className="text-sm text-textSecondary line-clamp-2">{place.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex-shrink-0 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close bottom sheet"
              >
                <IoClose size={20} />
              </button>
            </div>

            <Fab
              label="View Details"
              icon="arrow_forward"
              className="self-stretch mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onExplore();
              }}
            />
          </animated.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
