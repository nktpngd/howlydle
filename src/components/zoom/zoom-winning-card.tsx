'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';
import { useZoomGame } from '@/contexts/zoom-game-context';
import { useResetTimer } from '@/hooks/use-reset-timer';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export const ZoomWinningCard = () => {
  const { numberOfTries, secretEmployee, showWinningCard } = useZoomGame();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const timeUntilReset = useResetTimer();

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {showWinningCard && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={800}
            gravity={0.25}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Tilt
              rotationFactor={6}
              isReverse
              className="group relative rounded-lg max-w-[520px] w-full mx-auto mt-6"
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
                <Spotlight
                  className="from-green-600 via-green-500 to-green-400 blur-3xl dark:from-green-200 dark:via-green-300 dark:to-green-400"
                  size={200}
                />
                <div className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-4 md:p-8 text-center">
                  <div className="text-4xl">🎉</div>
                  <h2 className="md:text-xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
                    Nice!
                  </h2>
                  <p className="text-base/6 text-neutral-700 dark:text-neutral-200">
                    You found today&#39;s employee:{' '}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {secretEmployee.name}
                    </span>
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    You got it in{' '}
                    <span className="font-semibold">
                      {numberOfTries} {numberOfTries === 1 ? 'try' : 'tries'}
                    </span>
                  </p>
                  <div className="border-neutral-200 dark:border-neutral-800">
                    <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Next employee in:
                    </p>
                    <div className="flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-200">
                      <span className="text-lg font-mono font-semibold">
                        {formatTime(timeUntilReset.hours)}
                      </span>
                      <span className="text-lg font-mono">:</span>
                      <span className="text-lg font-mono font-semibold">
                        {formatTime(timeUntilReset.minutes)}
                      </span>
                      <span className="text-lg font-mono">:</span>
                      <span className="text-lg font-mono font-semibold">
                        {formatTime(timeUntilReset.seconds)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
