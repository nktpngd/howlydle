import { FC, PropsWithChildren } from 'react';
import { Spotlight } from '@/components/ui/spotlight-new';

export const BeamsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen h-full w-full relative flex flex-col items-center py-4 antialiased  overflow-hidden">
      <Spotlight />
      <div className="absolute inset-0 bg-neutral-950 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 15% 50%, rgb(13, 17, 23) 0%, transparent 50%),
              radial-gradient(circle at 85% 30%, rgb(17, 24, 39) 0%, transparent 55%),
              radial-gradient(circle at 50% 50%, rgb(2, 13, 46) 0%, transparent 70%),
              radial-gradient(circle at 70% 80%, rgb(3, 7, 18) 0%, transparent 60%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent opacity-20" />
      </div>

      <div className="relative flex flex-col items-center gap-4 md:gap-10 mx-auto p-4 w-full">
        {children}
      </div>
    </div>
  );
};
