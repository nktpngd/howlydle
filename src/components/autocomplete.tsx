'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Avatar } from '@heroui/avatar';
import { SearchIcon } from '@/components/ui/search-icon';
import { employees } from '@/lib/users';
import { Key, useState, useRef } from 'react';
import { Employee } from '@/types/types';
import { useGame } from '@/contexts/game-context';

export const EmployeesAutocomplete = () => {
  const { guessedEmployees, addGuess, isGameWon } = useGame();
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>(employees);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter out already guessed employees from the available options
  const filteredEmployees = availableEmployees.filter(
    (employee) => !guessedEmployees.some((guessed) => guessed.id === employee.id)
  );

  const handleSelectionChange = (employeeId: Key | null) => {
    if (employeeId) {
      const selectedEmployee = availableEmployees.find((emp) => emp.id === employeeId);
      if (selectedEmployee) {
        addGuess(selectedEmployee);
        // Update the available employees list by filtering out the selected employee
        setAvailableEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
        // Unfocus the input
        inputRef.current?.blur();
      }
    }
  };

  if (isGameWon) {
    return null;
  }

  return (
    <Autocomplete
      aria-label="Select an employee"
      classNames={{
        base: 'z-10 max-w-[520px]',
        listboxWrapper: 'max-h-[320px] z-10',
        selectorButton: 'text-default-500 z-10',
      }}
      defaultItems={filteredEmployees}
      inputProps={{
        ref: inputRef,
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[48px]',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-medium',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-default-200',
            'data-[selectable=true]:focus:bg-default-100',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      placeholder="Enter employee name"
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background',
        },
      }}
      radius="full"
      startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
      variant="bordered"
      onSelectionChange={handleSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.id} value={item.id} textValue={item.name}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
