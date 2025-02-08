import React from 'react';

interface HeaderCellProps {
  text: string;
}

export const HeaderCell = ({ text }: HeaderCellProps) => {
  return (
    <div className="flex items-center justify-center p-4 rounded w-[100px] bg-gray-700">{text}</div>
  );
};
