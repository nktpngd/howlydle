'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '@/types/types';
import { employees } from '@/lib/users';

interface GameContextType {
  secretEmployee: Employee;
  yesterdayEmployee: Employee | null;
  guessedEmployees: Employee[];
  addGuess: (employee: Employee) => void;
  isGameWon: boolean;
  numberOfTries: number;
  showWinningCard: boolean;
  setShowWinningCard: (show: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Reset hour constant (15:00 UTC)
const RESET_HOUR_UTC = 15;

// Function to get an employee for a specific date
const getEmployeeForDate = (date: Date): Employee => {
  // Create a deterministic seed based on the date
  const dateSeed =
    date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();

  // Use the seed to select an employee from the array
  const index = dateSeed % employees.length;

  return employees[index];
};

// Function to get the daily employee based on current time
const getDailyEmployee = (): Employee => {
  // Get current date in UTC
  const now = new Date();

  // Create date string for today at 15:00 UTC (changed from 16:00)
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );

  // If current time is before 15:00 UTC, use yesterday's seed
  const seedDate =
    now < todayAtResetUTC
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1))
      : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  return getEmployeeForDate(seedDate);
};

// Function to get yesterday's employee
const getYesterdayEmployee = (): Employee => {
  const now = new Date();
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );

  // If we're before 15:00 UTC, "yesterday" is 2 days ago
  // If we're after 15:00 UTC, "yesterday" is 1 day ago
  const daysToSubtract = now < todayAtResetUTC ? 2 : 1;

  const yesterdayDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToSubtract)
  );

  return getEmployeeForDate(yesterdayDate);
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  // Use localStorage to store guesses for the current day
  const [guessedEmployees, setGuessedEmployees] = useState<Employee[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showWinningCard, setShowWinningCard] = useState(false);
  const [secretEmployee, setSecretEmployee] = useState<Employee | null>(null);
  const [yesterdayEmployee, setYesterdayEmployee] = useState<Employee | null>(null);
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    // Get the daily employee
    const employee = getDailyEmployee();
    setSecretEmployee(employee);

    // Get yesterday's employee
    const yesterdayEmp = getYesterdayEmployee();
    setYesterdayEmployee(yesterdayEmp);

    // Format today's date as YYYY-MM-DD for storage key
    const now = new Date();
    const today = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
    setCurrentDay(today);

    // Load saved game state from localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(`employee-game-${today}`);

      if (savedState) {
        const { guesses, won } = JSON.parse(savedState);
        setGuessedEmployees(guesses);
        setIsGameWon(won);
        setShowWinningCard(won);
      } else {
        // Reset game state for a new day
        setGuessedEmployees([]);
        setIsGameWon(false);
      }
    }

    // Check for day change every minute
    const interval = setInterval(() => {
      const newEmployee = getDailyEmployee();
      const newYesterdayEmployee = getYesterdayEmployee();
      const newNow = new Date();
      const newToday = `${newNow.getUTCFullYear()}-${String(newNow.getUTCMonth() + 1).padStart(2, '0')}-${String(newNow.getUTCDate()).padStart(2, '0')}`;

      // If the day changed or it's past 15:00 UTC and we need a new employee
      if (newToday !== currentDay || secretEmployee?.id !== newEmployee.id) {
        setSecretEmployee(newEmployee);
        setYesterdayEmployee(newYesterdayEmployee);
        setCurrentDay(newToday);
        setGuessedEmployees([]);
        setIsGameWon(false);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentDay, secretEmployee?.id]);

  const addGuess = (employee: Employee) => {
    if (!secretEmployee) return;

    const newGuesses = [employee, ...guessedEmployees];
    setGuessedEmployees(newGuesses);

    const won = employee.id === secretEmployee.id;
    if (won) {
      setIsGameWon(true);
    }

    // Save game state to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `employee-game-${currentDay}`,
        JSON.stringify({
          guesses: newGuesses,
          won,
        })
      );
    }
  };

  // Don't render children until we have the secret employee
  if (!secretEmployee || !yesterdayEmployee) {
    return null;
  }

  return (
    <GameContext.Provider
      value={{
        secretEmployee,
        yesterdayEmployee,
        guessedEmployees,
        addGuess,
        isGameWon,
        showWinningCard,
        setShowWinningCard,
        numberOfTries: guessedEmployees.length,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return context;
}
