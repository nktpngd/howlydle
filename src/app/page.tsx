import { BackgroundBeams } from '@/components/ui/background-beams';
import { Spotlight } from '@/components/ui/spotlight';
import { Tilt } from '@/components/ui/tilt';

export default function Home() {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center py-4 antialiased">
      <div className="flex flex-col gap-4 md:gap-10 max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Howlydle
        </h1>

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
          className="group relative rounded-lg z-10"
        >
          <div className="z-10 relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
            <Spotlight
              className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
              size={200}
            />

            <div className="flex flex-col gap-4 relative h-full w-full rounded-xl bg-white dark:bg-black p-4 md:p-8 text-center max-w-[520px]">
              <h2 className="md:text-xl lg:text-3xl font-semibold text-neutral-200">
                Guess today&#39;s employee from Howly!
              </h2>

              <p className="text-base/6 text-neutral-200">
                Type any employee to begin.
              </p>

              <p className="text-sm text-neutral-400">
                The data is up until the end of January 2025.
              </p>
            </div>
          </div>
        </Tilt>
      </div>

      <BackgroundBeams />
    </div>
  );
}
