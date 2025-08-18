'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '@/types/types';
import { getEmployees } from '@/lib/employees';

interface GameContextType {
  secretEmployee: Employee;
  yesterdayEmployee: Employee | null;
  guessedEmployees: Employee[];
  allEmployees: Employee[];
  addGuess: (employee: Employee) => void;
  isGameWon: boolean;
  numberOfTries: number;
  showWinningCard: boolean;
  setShowWinningCard: (show: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Reset hour constant (00:00 UTC)
const RESET_HOUR_UTC = 0;

// Function to get a storage key based on date
const getStorageKey = (date: Date) => {
  return `howlydle-guesses-${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

// Function to get an employee for a specific date
const getEmployeeForDate = async (date: Date, allEmployees: Employee[]): Promise<Employee> => {
  // Create a deterministic seed based on the date
  const dateSeed =
    date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();

  // Use the seed to select an employee from the array
  const index = dateSeed % allEmployees.length;

  return allEmployees[index];
};

// Function to get the daily employee based on current time
const getDailyEmployee = async (allEmployees: Employee[]): Promise<Employee> => {
  // Get current date in UTC
  const now = new Date();

  // Create date string for today at 00:00 UTC
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );

  // If current time is before 00:00 UTC, use yesterday's seed
  const seedDate =
    now < todayAtResetUTC
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1))
      : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  return getEmployeeForDate(seedDate, allEmployees);
};

// Function to get yesterday's employee
const getYesterdayEmployee = async (allEmployees: Employee[]): Promise<Employee> => {
  const now = new Date();
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );

  // If we're before 00:00 UTC, "yesterday" is 2 days ago
  // If we're after 00:00 UTC, "yesterday" is 1 day ago
  const daysToSubtract = now < todayAtResetUTC ? 2 : 1;

  const yesterdayDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToSubtract)
  );

  return getEmployeeForDate(yesterdayDate, allEmployees);
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [secretEmployee, setSecretEmployee] = useState<Employee | null>(null);
  const [yesterdayEmployee, setYesterdayEmployee] = useState<Employee | null>(null);
  const [guessedEmployees, setGuessedEmployees] = useState<Employee[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [showWinningCard, setShowWinningCard] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const employees = await getEmployees();
        setAllEmployees([...employees].sort((a, b) => a.name.localeCompare(b.name)));
        const todayEmployee = await getDailyEmployee(employees);
        const yesterdayEmp = await getYesterdayEmployee(employees);

        // Load saved guesses for today
        const now = new Date();
        const storageKey = getStorageKey(now);
        const savedGuesses = localStorage.getItem(storageKey);
        if (savedGuesses) {
          const parsedGuesses = JSON.parse(savedGuesses);
          setGuessedEmployees(parsedGuesses);
        }

        setSecretEmployee(todayEmployee);
        setYesterdayEmployee(yesterdayEmp);
      } catch (error) {
        console.error('Error initializing game:', error);
      }
    };

    initializeGame();
  }, []);

  const addGuess = (employee: Employee) => {
    setGuessedEmployees((prev) => {
      const newGuesses = [employee, ...prev];
      // Save to localStorage
      const now = new Date();
      const storageKey = getStorageKey(now);
      localStorage.setItem(storageKey, JSON.stringify(newGuesses));
      return newGuesses;
    });
  };

  const isGameWon = guessedEmployees.some((employee) => employee.id === secretEmployee?.id);

  if (!secretEmployee) {
    return null; // or a loading state
  }

  return (
    <GameContext.Provider
      value={{
        secretEmployee,
        yesterdayEmployee,
        guessedEmployees,
        allEmployees,
        addGuess,
        isGameWon,
        numberOfTries: guessedEmployees.length,
        showWinningCard,
        setShowWinningCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
