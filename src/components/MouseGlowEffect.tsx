import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const MouseGlowEffect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse coordinates motion values
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth luxury spring physics for delayed Apple-like cursor trailing
  const springConfig = { stiffness: 180, damping: 25, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect coarse touch-only devices (e.g. mobile phones)
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches && window.innerWidth < 768) {
      setIsTouchDevice(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half glow size (450px / 2 = 225px) so glow center strictly tracks cursor
      mouseX.set(e.clientX - 225);
      mouseY.set(e.clientY - 225);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide only on small mobile touch screens
  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.7,
        }}
        transition={{
          opacity: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 0.4, ease: 'easeOut' },
        }}
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none select-none filter blur-2xl opacity-60 dark:opacity-70 transition-opacity duration-300"
      >
        {/* Multi-layered luxury warm gold radial gradient crafted for high visibility in both light & dark themes */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(245, 158, 11, 0.28) 0%,
              rgba(251, 191, 36, 0.20) 25%,
              rgba(253, 224, 71, 0.12) 50%,
              rgba(217, 119, 6, 0.04) 72%,
              transparent 85%
            )`,
          }}
        />
      </motion.div>
    </div>
  );
};
