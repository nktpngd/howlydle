import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DataCell } from './data-cell';
import { Employee, CellData } from '@/types/types';
import { compareEmployees } from '@/lib/utils';
import { useGame } from '@/contexts/game-context';

interface Props {
  employee: Employee;
  secretEmployee: Employee;
  index: number;
  totalGuesses: number;
}

export const TableRow: FC<Props> = ({ employee, secretEmployee, index, totalGuesses }) => {
  const { isGameWon, setShowWinningCard } = useGame();
  const comparison = compareEmployees(employee, secretEmployee);
  const isNewRow = index === totalGuesses - 1;

  const cellData: CellData[] = [
    {
      type: 'avatar',
      value: comparison.avatar.value,
      isMatch: comparison.avatar.isMatch,
    },
    {
      type: 'text',
      value: comparison.gender.value,
      isMatch: comparison.gender.isMatch,
    },
    {
      type: 'number',
      value: comparison.age.value,
      isMatch: comparison.age.isMatch,
      comparison: comparison.age.comparison,
    },
    {
      type: 'text',
      value: comparison.zone.value,
      isMatch: comparison.zone.isMatch,
    },
    {
      type: 'text',
      value: comparison.affiliation.value,
      isMatch: comparison.affiliation.isMatch,
    },
    {
      type: 'number',
      value: comparison.startYear.value,
      isMatch: comparison.startYear.isMatch,
      comparison: comparison.startYear.comparison,
    },
  ];

  useEffect(() => {
    if (isGameWon && isNewRow) {
      const totalDelay = (cellData.length - 1) * 0.5 + 0.6; // Last cell delay + animation duration

      const timer = setTimeout(() => {
        setShowWinningCard(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, totalDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [cellData.length, isGameWon, isNewRow, setShowWinningCard]);

  return (
    <motion.div
      className="grid grid-cols-6 w-full gap-1 sm:gap-2 p-1 sm:p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {cellData.map((cell, cellIndex) => (
        <DataCell
          key={cellIndex}
          type={cell.type}
          value={cell.value}
          isMatch={cell.isMatch}
          comparison={cell.comparison}
          animate={isNewRow}
          delay={(cellIndex - 1) * 0.5}
        />
      ))}
    </motion.div>
  );
};
