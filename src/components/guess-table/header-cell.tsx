import React from 'react';

interface HeaderCellProps {
  text: string;
}

export const HeaderCell = ({ text }: HeaderCellProps) => {
  return (
    <div className="flex items-center justify-center p-2 sm:p-4 rounded w-full bg-gray-700 text-[10px] sm:text-lg font-medium">
      {text}
    </div>
  );
};
