import { useState, useEffect } from 'react';

interface TimeUntilReset {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useResetTimer = (resetHourUTC = 15): TimeUntilReset => {
  const [timeUntilReset, setTimeUntilReset] = useState<TimeUntilReset>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate time until next reset
    const updateTimeUntilReset = () => {
      const now = new Date();

      // Create today's reset time at specified UTC hour
      const resetTime = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), resetHourUTC, 0, 0)
      );

      // If we've already passed today's reset time, use tomorrow's
      if (now > resetTime) {
        resetTime.setUTCDate(resetTime.getUTCDate() + 1);
      }

      // Calculate time difference in milliseconds
      const diff = resetTime.getTime() - now.getTime();

      // Convert to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilReset({ hours, minutes, seconds });
    };

    // Update countdown timer every second
    updateTimeUntilReset();
    const timerInterval = setInterval(updateTimeUntilReset, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [resetHourUTC]);

  return timeUntilReset;
};
