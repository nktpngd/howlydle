'use client';

import React, { createContext, useContext, useState } from 'react';
import { Employee } from '@/types/types';
import { employees } from '@/lib/users';

interface GameContextType {
  secretEmployee: Employee;
  guessedEmployees: Employee[];
  addGuess: (employee: Employee) => void;
  isGameWon: boolean;
  numberOfTries: number;
  showWinningCard: boolean;
  setShowWinningCard: (show: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [guessedEmployees, setGuessedEmployees] = useState<Employee[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showWinningCard, setShowWinningCard] = useState(false);
  const [secretEmployee] = useState<Employee>(() => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex];
  });

  const addGuess = (employee: Employee) => {
    setGuessedEmployees((prev) => [employee, ...prev]);

    if (employee.id === secretEmployee.id) {
      setIsGameWon(true);
    }
  };

  return (
    <GameContext.Provider
      value={{
        secretEmployee,
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
