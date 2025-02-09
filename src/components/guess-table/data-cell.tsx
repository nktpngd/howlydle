import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@heroui/avatar';

export type CellType = 'avatar' | 'text' | 'number';

interface DataCellProps {
  type: CellType;
  value: string | number;
  isMatch: boolean;
  comparison?: 'higher' | 'lower';
  animate?: boolean;
  delay?: number;
}

export const DataCell: React.FC<DataCellProps> = ({
  type,
  value,
  isMatch,
  comparison,
  animate = false,
  delay = 0,
}) => {
  const bgColor = isMatch ? 'bg-green-600' : 'bg-red-600';
  const borderColor = isMatch ? 'border-green-400' : 'border-red-400';

  const renderComparisonIndicator = () => {
    if (!comparison) return null;
    return comparison === 'higher' ? '↑' : '↓';
  };

  if (type === 'avatar') {
    return (
      <div className="w-full aspect-square flex items-center justify-center">
        <img
          src={String(value)}
          alt="employee avatar"
          className="rounded w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full"
        initial={animate ? { rotateX: -180 } : false}
        animate={animate ? { rotateX: 0 } : false}
        transition={{
          duration: 0.6,
          delay,
          ease: 'easeOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back face */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded bg-gray-700"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
        >
          <div className="text-gray-500 animate-pulse text-2xl sm:text-4xl">?</div>
        </div>

        {/* Front face */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded border-1 ${borderColor} ${bgColor}`}
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center gap-1">
            <span className="font-medium text-xs sm:text-lg text-center">{value}</span>
            {type === 'number' && !isMatch && (
              <span className="text-white text-xs sm:text-sm">{renderComparisonIndicator()}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
