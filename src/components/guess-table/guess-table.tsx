'use client';

import React from 'react';
import { TableHeader } from './table-header';
import { TableRows } from './table-rows';
import { useGame } from '@/contexts/game-context';

export const GuessTable = () => {
  const { secretEmployee, guessedEmployees } = useGame();

  if (guessedEmployees.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full overflow-x-auto sm:px-0">
      <div className="min-w-[320px] max-w-[660px] mx-auto">
        <TableHeader />
        <TableRows employees={guessedEmployees} secretEmployee={secretEmployee} />
      </div>
    </div>
  );
};
