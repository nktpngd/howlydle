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

  const renderComparisonIndicator = () => {
    if (!comparison) return null;
    return comparison === 'higher' ? '↑' : '↓';
  };

  // If it's an avatar, render it without animation wrapper
  if (type === 'avatar') {
    return (
      <div className="w-[100px] h-[100px] flex items-center justify-center">
        <Avatar alt="employee avatar" className="flex-shrink-0" size="lg" src={String(value)} />
      </div>
    );
  }

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-[100px] h-[100px]"
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
          className={`absolute w-full h-full flex items-center justify-center rounded bg-gray-700`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
        >
          <div className="w-4 h-4 rounded-full bg-gray-500 animate-pulse" />
        </div>

        {/* Front face */}
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded ${bgColor}`}
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center gap-1">
            <span>{value}</span>
            {type === 'number' && !isMatch && (
              <span className="text-white text-sm">{renderComparisonIndicator()}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
