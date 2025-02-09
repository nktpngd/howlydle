import React, { FC } from 'react';
import { TableRow } from './table-row';
import { Employee } from '@/types/types';

interface Props {
  employees: Employee[];
  secretEmployee: Employee;
}

export const TableRows: FC<Props> = ({ employees, secretEmployee }) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      {employees.map((employee, index) => (
        <TableRow
          key={employee.id}
          employee={employee}
          secretEmployee={secretEmployee}
          index={index}
        />
      ))}
    </div>
  );
};
