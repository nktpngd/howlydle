'use client';

import { useGame } from '@/contexts/game-context';
import React from 'react';

export const YesterdaysEmployee = () => {
  const { yesterdayEmployee } = useGame();

  if (!yesterdayEmployee) {
    return null;
  }

  return (
    <div className="text-center max-w-[520px] mx-auto">
      <span className="text-neutral-300">
        Yesterday&#39;s employee was <span className="font-semibold">{yesterdayEmployee.name}</span>
      </span>
    </div>
  );
};
