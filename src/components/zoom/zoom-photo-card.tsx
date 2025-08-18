'use client';

import React from 'react';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';
import { ZoomImage } from '@/components/zoom/zoom-image';
import { useZoomGame } from '@/contexts/zoom-game-context';

export const ZoomPhotoCard = () => {
  const { secretEmployee, guessedEmployees } = useZoomGame();

  return (
    <Tilt
      rotationFactor={6}
      isReverse
      style={{ transformOrigin: 'center center' }}
      springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
      className="group relative rounded-lg sm:max-w-[520px] w-full"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
        <Spotlight
          className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
          size={200}
        />
        <div className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-4 md:p-8 text-center">
          <h2 className="md:text-xl lg:text-2xl font-semibold text-neutral-200">
            Which employee is featured on this photo?
          </h2>
          <div className="flex justify-center">
            <ZoomImage imageUrl={secretEmployee.avatar} guessesCount={guessedEmployees.length} />
          </div>
        </div>
      </div>
    </Tilt>
  );
};
