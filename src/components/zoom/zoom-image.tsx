'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useZoomGame } from '@/contexts/zoom-game-context';

type Props = {
  imageUrl: string;
  guessesCount: number;
};

// Progressively zooms out the provided image as guesses increase.
// Starts zoomed-in and moves toward scale 1.
export const ZoomImage: React.FC<Props> = ({ imageUrl, guessesCount }) => {
  const { isGameWon } = useZoomGame();
  const baseScale = 10; // more zoomed in initially
  const step = 0.5; // zoom-out per guess
  const computedScale = Math.max(1, baseScale - guessesCount * step);
  const scale = isGameWon ? 1 : computedScale;

  return (
    <div className="w-full max-w-[220px] sm:max-w-[220px] mx-auto aspect-square overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      <motion.img
        src={imageUrl}
        alt="mystery employee"
        className="w-full h-full object-cover"
        initial={false}
        animate={{ scale }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
      />
    </div>
  );
};
