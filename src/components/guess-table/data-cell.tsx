import React from 'react';
import { motion } from 'framer-motion';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

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
  const bgColor = isMatch ? 'bg-green-700' : 'bg-red-700';
  const borderColor = isMatch ? 'border-green-500' : 'border-red-500';

  const renderComparisonIndicator = () => {
    if (!comparison || type !== 'number' || isMatch) return null;
    return (
      <div className={`z-0 absolute flex items-center justify-center w-full h-full`}>
        {comparison === 'higher' ? (
          <ArrowBigUp className="w-full h-full text-red-800" />
        ) : (
          <ArrowBigDown className="w-full h-full text-red-800" />
        )}
      </div>
    );
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
          className={`w-full h-full flex items-center justify-center rounded border-1 ${borderColor} ${bgColor}`}
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center gap-1 z-10">
            <span className="font-medium text-xs sm:text-lg text-center text-white">{value}</span>
          </div>
          {renderComparisonIndicator()}
        </div>
      </motion.div>
    </div>
  );
};
