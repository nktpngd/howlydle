import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, ComparisonType, AgeRange } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function ageToNumber(age: AgeRange): number {
  switch (age) {
    case '<20':
      return 19;
    case '20-25':
      return 20;
    case '25-30':
      return 25;
    case '30+':
      return 30;
  }
}

export function compareEmployees(guessEmployee: Employee, secretEmployee: Employee) {
  const guessAgeNum = ageToNumber(guessEmployee.age);
  const secretAgeNum = ageToNumber(secretEmployee.age);

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
      comparison: (guessAgeNum < secretAgeNum ? 'higher' : 'lower') as ComparisonType,
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
