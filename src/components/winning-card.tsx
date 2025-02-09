'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/game-context';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export const WinningCard = () => {
  const { numberOfTries, secretEmployee, showWinningCard } = useGame();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set window size for confetti
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (showWinningCard) {
      // Smooth scroll with easing
      const scrollToTop = () => {
        const start = window.pageYOffset;
        const startTime = performance.now();
        const duration = 1000; // 1 second duration

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const eased = easeOutCubic(progress);
          window.scrollTo(0, start * (1 - eased));

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      };

      scrollToTop();
    }

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, [showWinningCard]);

  return (
    <AnimatePresence>
      {showWinningCard && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={1000}
            gravity={0.25}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              duration: 0.1,
              ease: [0.19, 1.0, 0.22, 1.0], // Ease out expo
              delay: 0.1, // Slight delay to let the scroll complete
            }}
            className="w-full"
          >
            <Tilt
              rotationFactor={6}
              isReverse
              style={{
                transformOrigin: 'center center',
              }}
              springOptions={{
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
              className="group relative rounded-lg  max-w-[520px] w-full mx-auto mt-6"
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
                <Spotlight
                  className="from-green-600 via-green-500 to-green-400 blur-3xl dark:from-green-200 dark:via-green-300 dark:to-green-400"
                  size={200}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4,
                  }}
                  className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-4 md:p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5,
                    }}
                    className="flex justify-center mb-2"
                  >
                    <span className="text-4xl">🎉</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="md:text-xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200"
                  >
                    Congratulations!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-base/6 text-neutral-700 dark:text-neutral-200"
                  >
                    You found today&#39;s employee:{' '}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {secretEmployee.name}
                    </span>
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    You got it in{' '}
                    <span className="font-semibold">
                      {numberOfTries} {numberOfTries === 1 ? 'try' : 'tries'}
                    </span>
                  </motion.p>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
