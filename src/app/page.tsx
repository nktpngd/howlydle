'use client';

import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Wrapper } from '@/components/wrapper';

export default function LandingPage() {
  return (
    <Wrapper>
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <GameModeCard
          title="Classic"
          description="Guess today's mystery employee with clues."
          isAvailable={true}
          href="/classic"
        />
        <GameModeCard
          title="Zoom"
          description="Guess the employee from a zoomed photo."
          isAvailable={true}
          href="/zoom"
        />
        <GameModeCard
          title="Zoom (Infinity Test)"
          description="Testing mode: new random employee on refresh."
          isAvailable={true}
          href="/zoom/infinity"
        />
      </div>
    </Wrapper>
  );
}

type GameModeCardProps = {
  title: string;
  description: string;
  isAvailable: boolean;
  href?: string;
};

const GameModeCard = ({ title, description, isAvailable, href }: GameModeCardProps) => {
  const CardContent = () => (
    <Tilt
      rotationFactor={6}
      isReverse
      style={{
        transformOrigin: 'center center',
      }}
      springOptions={{
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2,
      }}
      className="group relative rounded-lg w-full sm:max-w-[520px]"
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          isAvailable ? 'bg-zinc-300/30 dark:bg-zinc-700/30' : 'bg-zinc-300/20 dark:bg-zinc-800/20'
        } p-[1px]`}
      >
        <Spotlight
          className={`${
            isAvailable
              ? 'from-blue-600 via-blue-500 to-blue-400 dark:from-blue-200 dark:via-blue-300 dark:to-blue-400'
              : 'from-neutral-600 via-neutral-500 to-neutral-400 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-500'
          } blur-3xl`}
          size={200}
        />

        <div className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-6 text-left">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-200">{title}</h2>
            {!isAvailable && (
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">
                Coming Soon
              </span>
            )}
          </div>

          <p className="text-base/6 text-neutral-400">{description}</p>
        </div>
      </div>
    </Tilt>
  );

  if (isAvailable && href) {
    return (
      <Link href={href} className="block w-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
