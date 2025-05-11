export enum Zone {
  Backend = 'Backend',
  Marketing = 'Marketing',
  Frontend = 'Frontend',
  Product = 'Product',
  Analytics = 'Analytics',
  CLevel = 'C-level',
  DesignAndContent = 'Design & Content',
  Operations = 'Operations',
  Payments = 'Payments',
  Growth = 'Growth',
  HR = 'HR',
  Other = 'Other',
}

export enum Affiliation {
  Tech = 'Tech',
  PDFAid = 'PDFAid',
  LegalAnswers = 'Legal Answers',
  BetterJob = 'Better Job',
  LookupLabs = 'Lookup Labs',
  Shared = 'Shared',
}

export type AgeRange = '<20' | '20-25' | '25-30' | '30+';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  gender: Gender;
  age: AgeRange;
  zone: Zone;
  affiliation: Affiliation;
  startYear: number;
}

export type ComparisonType = 'higher' | 'lower';

export interface CellData {
  type: 'avatar' | 'text' | 'number';
  value: string | number;
  isMatch: boolean;
  comparison?: ComparisonType;
}
