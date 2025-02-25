import { FC, PropsWithChildren } from 'react';
import bgImage from '@/app/images/bg.jpg';

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen h-full w-full relative flex flex-col items-center py-4 antialiased overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-[100vw] h-[100vh]"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: '1000',
            willChange: 'transform',
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div
          className="absolute inset-0 opacity-30"
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
