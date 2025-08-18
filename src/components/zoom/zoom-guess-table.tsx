'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useZoomGame } from '@/contexts/zoom-game-context';

export const ZoomGuessTable = () => {
  const { guessedEmployees, secretEmployee } = useZoomGame();

  if (guessedEmployees.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full overflow-x-auto sm:px-0">
      <div className="w-full sm:max-w-[520px] mx-auto">
        <div className="flex flex-col gap-1 sm:gap-2 mt-1">
          {guessedEmployees.map((emp, index) => {
            const isCorrect = emp.id === secretEmployee.id;
            const colors = isCorrect
              ? 'bg-green-700 border-green-500'
              : 'bg-red-700 border-red-500';
            const shouldShake = !isCorrect && index === 0;
            return (
              <motion.div
                key={emp.id}
                className={`flex items-center gap-3 p-2 sm:p-3 rounded-lg border ${colors}`}
                animate={shouldShake ? { x: [0, -4, 4, -2, 2, 0] } : undefined}
                transition={shouldShake ? { duration: 0.3, ease: 'easeInOut' } : undefined}
              >
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-white">
                  <div className="truncate text-sm sm:text-base font-semibold">{emp.name}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
