import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { DataCell } from './data-cell';
import { Employee, CellData } from '@/types/types';
import { compareEmployees } from '@/lib/utils';

interface Props {
  employee: Employee;
  secretEmployee: Employee;
  index: number;
}

export const TableRow: FC<Props> = ({ employee, secretEmployee, index }) => {
  const comparison = compareEmployees(employee, secretEmployee);
  const isNewRow = index === 0;

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
