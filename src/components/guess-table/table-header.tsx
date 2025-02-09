import React from 'react';
import { HeaderCell } from './header-cell';

export const TableHeader = () => {
  const headers = ['Employee', 'Gender', 'Age', 'Zone', 'Affiliation', 'Start Year'];

  return (
    <div className="grid grid-cols-6 w-full rounded gap-1 sm:gap-2 p-1 sm:p-2 text-center">
      {headers.map((header, index) => (
        <HeaderCell key={index} text={header} />
      ))}
    </div>
  );
};
