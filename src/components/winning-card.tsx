'use client';

import React from 'react';
import { useGame } from '@/contexts/game-context';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';

export const WinningCard = () => {
  const { numberOfTries, secretEmployee, isGameWon } = useGame();

  if (!isGameWon) {
    return null;
  }

  return (
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
      className="group relative rounded-lg z-10 max-w-[520px] w-full mx-auto mt-6"
    >
      <div className="z-10 relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
        <Spotlight
          className="from-green-600 via-green-500 to-green-400 blur-3xl dark:from-green-200 dark:via-green-300 dark:to-green-400"
          size={200}
        />

        <div className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-4 md:p-8 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-4xl">🎉</span>
          </div>

          <h2 className="md:text-xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
            Congratulations!
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
        </div>
      </div>
    </Tilt>
  );
};
