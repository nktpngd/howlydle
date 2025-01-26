'use client';

import React from 'react';

export const GuessTable = () => {
  return (
    <div className="flex flex-col gap-2 z-10">
      {/* Header Row */}
      <div className="grid grid-cols-6 w-full max-w-[720px] bg-black rounded gap-2 p-2">
        <div className="flex items-center justify-center p-4 rounded w-[100px]">
          Employee
        </div>
        <div className="flex items-center justify-center p-4 rounded w-[100px]">
          Gender
        </div>
        <div className="flex items-center justify-center p-4 rounded w-[100px]">
          Age
        </div>
        <div className="flex items-center justify-center p-4 rounded w-[100px]">
          Zone
        </div>
        <div className="flex items-center justify-center p-4 rounded w-[100px]">
          Affiliation
        </div>
        <div className="flex items-center justify-center p-4 rounded w-[100px] text-center">
          Start Year
        </div>
      </div>

      {/* Data Row */}
      <div className="grid grid-cols-6 w-full max-w-[720px] gap-2 p-2">
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          avatar
        </div>
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          Male
        </div>
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          20-25
        </div>
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          Backend
        </div>
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          Tech
        </div>
        <div className="flex items-center justify-center p-4 bg-red-600 rounded w-[100px]">
          2023
        </div>
      </div>
    </div>
  );
};
