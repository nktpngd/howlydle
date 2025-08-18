'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Employee } from '@/types/types';
import { getEmployees } from '@/lib/employees';

interface ZoomGameContextType {
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

const ZoomGameContext = createContext<ZoomGameContextType | undefined>(undefined);

// Reset hour constant (00:00 UTC)
const RESET_HOUR_UTC = 0;

const getStorageKey = (date: Date) => {
  return `howlydle-zoom-guesses-${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

const getEmployeeForDate = async (date: Date, allEmployees: Employee[]): Promise<Employee> => {
  const dateSeed =
    date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
  const index = dateSeed % allEmployees.length;
  return allEmployees[index];
};

const getDailyEmployee = async (allEmployees: Employee[]): Promise<Employee> => {
  const now = new Date();
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );

  const seedDate =
    now < todayAtResetUTC
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1))
      : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  // Derive a date seed like Classic
  const dateSeed =
    seedDate.getUTCFullYear() * 10000 + (seedDate.getUTCMonth() + 1) * 100 + seedDate.getUTCDate();

  const length = allEmployees.length;
  if (length === 0) throw new Error('No employees available');

  // Classic index would be baseIndex
  const baseIndex = dateSeed % length;

  if (length === 1) return allEmployees[baseIndex];

  // Choose a deterministic offset in [1, length-1] so it's always different from Classic
  const offset = (dateSeed % (length - 1)) + 1;
  const zoomIndex = (baseIndex + offset) % length;
  return allEmployees[zoomIndex];
};

const getYesterdayEmployee = async (allEmployees: Employee[]): Promise<Employee> => {
  const now = new Date();
  const todayAtResetUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), RESET_HOUR_UTC, 0, 0)
  );
  const daysToSubtract = now < todayAtResetUTC ? 2 : 1;
  const yesterdayDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToSubtract)
  );
  return getEmployeeForDate(yesterdayDate, allEmployees);
};

type ZoomMode = 'daily' | 'infinite';

export const ZoomGameProvider: React.FC<{ children: React.ReactNode; mode?: ZoomMode }> = ({
  children,
  mode = 'daily',
}) => {
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
        if (mode === 'infinite') {
          // pick a random employee every load
          const randomIndex = Math.floor(Math.random() * employees.length);
          setSecretEmployee(employees[randomIndex]);
          setYesterdayEmployee(null);
          setGuessedEmployees([]);
        } else {
          const todayEmployee = await getDailyEmployee(employees);
          const yesterdayEmp = await getYesterdayEmployee(employees);

          const now = new Date();
          const storageKey = getStorageKey(now);
          const savedGuesses = localStorage.getItem(storageKey);
          if (savedGuesses) {
            const parsedGuesses = JSON.parse(savedGuesses);
            setGuessedEmployees(parsedGuesses);
          }

          setSecretEmployee(todayEmployee);
          setYesterdayEmployee(yesterdayEmp);
        }
      } catch (error) {
        console.error('Error initializing zoom game:', error);
      }
    };

    initializeGame();
  }, [mode]);

  const addGuess = (employee: Employee) => {
    setGuessedEmployees((prev) => {
      const newGuesses = [employee, ...prev];
      if (mode === 'daily') {
        const now = new Date();
        const storageKey = getStorageKey(now);
        localStorage.setItem(storageKey, JSON.stringify(newGuesses));
      }
      return newGuesses;
    });

    if (employee.id === secretEmployee?.id) {
      setShowWinningCard(true);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        // noop in non-browser environment
      }
    }
  };

  const isGameWon = guessedEmployees.some((employee) => employee.id === secretEmployee?.id);

  if (!secretEmployee) {
    return null;
  }

  return (
    <ZoomGameContext.Provider
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
    </ZoomGameContext.Provider>
  );
};

export const useZoomGame = () => {
  const context = useContext(ZoomGameContext);
  if (context === undefined) {
    throw new Error('useZoomGame must be used within a ZoomGameProvider');
  }
  return context;
};
