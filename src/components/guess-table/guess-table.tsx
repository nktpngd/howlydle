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
    <div className="flex flex-col gap-2 z-10">
      <TableHeader />
      <TableRows employees={guessedEmployees} secretEmployee={secretEmployee} />
    </div>
  );
};
