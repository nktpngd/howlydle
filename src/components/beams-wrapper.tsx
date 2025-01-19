import { BackgroundBeams } from '@/components/ui/background-beams';
import { FC, PropsWithChildren } from 'react';

export const BeamsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center py-4 antialiased">
      <div className="flex flex-col gap-4 md:gap-10 max-w-2xl mx-auto p-4">
        {children}
      </div>

      <BackgroundBeams />
    </div>
  );
};
