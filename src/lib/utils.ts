import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, ComparisonType } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareEmployees(guessEmployee: Employee, secretEmployee: Employee) {
  return {
    avatar: {
      value: guessEmployee.avatar,
      isMatch: false,
    },
    gender: {
      value: guessEmployee.gender,
      isMatch: guessEmployee.gender === secretEmployee.gender,
    },
    age: {
      value: guessEmployee.age,
      isMatch: guessEmployee.age === secretEmployee.age,
      comparison: (guessEmployee.age > secretEmployee.age ? 'lower' : 'higher') as ComparisonType,
    },
    zone: {
      value: guessEmployee.zone,
      isMatch: guessEmployee.zone === secretEmployee.zone,
    },
    affiliation: {
      value: guessEmployee.affiliation,
      isMatch: guessEmployee.affiliation === secretEmployee.affiliation,
    },
    startYear: {
      value: guessEmployee.startYear,
      isMatch: guessEmployee.startYear === secretEmployee.startYear,
      comparison: (guessEmployee.startYear > secretEmployee.startYear
        ? 'lower'
        : 'higher') as ComparisonType,
    },
  };
}
