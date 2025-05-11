'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/game-context';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useResetTimer } from '@/hooks/use-reset-timer';
import { Employee } from '@/types/types';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

const NearMissCard = ({ lastGuess }: { lastGuess: Employee }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-[520px] w-full mx-auto mt-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🤔</span>
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Almost there!</h3>
      </div>
      <p className="text-sm text-yellow-700 dark:text-yellow-300">
        {lastGuess.name} matches all the attributes, but they&apos;re not today&apos;s employee.
        You&apos;re very close!
      </p>
    </motion.div>
  );
};

export const WinningCard = () => {
  const { numberOfTries, secretEmployee, showWinningCard, guessedEmployees } = useGame();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // Use our custom hook
  const timeUntilReset = useResetTimer();

  // Check if the last guess matches all attributes but isn't the correct employee
  const lastGuess = guessedEmployees[guessedEmployees.length - 1];
  const isNearMiss =
    lastGuess &&
    !showWinningCard &&
    lastGuess.zone === secretEmployee.zone &&
    lastGuess.affiliation === secretEmployee.affiliation &&
    lastGuess.age === secretEmployee.age &&
    lastGuess.gender === secretEmployee.gender &&
    lastGuess.id !== secretEmployee.id;

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
        const duration = 500;

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

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [showWinningCard]);

  // Format time with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, '0');

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
              className="group relative rounded-lg max-w-[520px] w-full mx-auto mt-6"
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
                    duration: 0.3,
                    delay: 0.3,
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
                    transition={{ delay: 0.5 }}
                    className="md:text-xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200"
                  >
                    Congratulations!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
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
                    transition={{ delay: 0.7 }}
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    You got it in{' '}
                    <span className="font-semibold">
                      {numberOfTries} {numberOfTries === 1 ? 'try' : 'tries'}
                    </span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="border-neutral-200 dark:border-neutral-800"
                  >
                    <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Next employee in:
                    </p>
                    <div className="flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-200">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-mono font-semibold">
                          {formatTime(timeUntilReset.hours)}
                        </span>
                      </div>
                      <span className="text-lg font-mono">:</span>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-mono font-semibold">
                          {formatTime(timeUntilReset.minutes)}
                        </span>
                      </div>
                      <span className="text-lg font-mono">:</span>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-mono font-semibold">
                          {formatTime(timeUntilReset.seconds)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </>
      )}
      {isNearMiss && <NearMissCard lastGuess={lastGuess} />}
    </AnimatePresence>
  );
};
