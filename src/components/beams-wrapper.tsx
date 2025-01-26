import { BackgroundBeams } from '@/components/ui/background-beams';
import { FC, PropsWithChildren } from 'react';

export const BeamsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center py-4 antialiased">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-10 mx-auto p-4 w-full">
        {children}
      </div>

      <BackgroundBeams />
    </div>
  );
};
