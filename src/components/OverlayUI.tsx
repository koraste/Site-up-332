import { motion, AnimatePresence } from 'framer-motion';

interface OverlayUIProps {
  isTransitioning: boolean;
}

function OverlayUI({ isTransitioning }: OverlayUIProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        textAlign: 'center',
        gap: '0.5rem',
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '2.6rem',
          letterSpacing: '0.2em',
          margin: 0,
        }}
      >
        FLORAL ENGINE
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.2 }}
        style={{ margin: 0, fontSize: '1rem', textTransform: 'uppercase' }}
      >
        clique em uma pétala
      </motion.p>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            forming...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OverlayUI;
