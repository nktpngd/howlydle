'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Avatar } from '@heroui/avatar';
import { SearchIcon } from '@/components/ui/search-icon';
import { Key, useRef } from 'react';
import { useZoomGame } from '@/contexts/zoom-game-context';

export const ZoomEmployeesAutocomplete = () => {
  const { guessedEmployees, addGuess, showWinningCard, isGameWon, allEmployees } = useZoomGame();
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const filteredEmployees = allEmployees.filter(
    (employee) => !guessedEmployees.some((guessed) => guessed.id === employee.id)
  );

  const handleSelectionChange = (employeeId: Key | null) => {
    if (employeeId) {
      const selectedEmployee = allEmployees.find((emp) => emp.id === employeeId);
      if (selectedEmployee) {
        addGuess(selectedEmployee);
        autocompleteRef.current?.blur();
      }
    }
  };

  if (showWinningCard) {
    return null;
  }

  return (
    <Autocomplete
      disabled={isGameWon}
      ref={autocompleteRef}
      isVirtualized={false}
      aria-label="Select an employee"
      defaultItems={filteredEmployees}
      placeholder="Enter employee name"
      variant="bordered"
      radius="full"
      startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
      onSelectionChange={handleSelectionChange}
      classNames={{
        base: 'max-w-[520px]',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
      }}
      inputProps={{
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
      popoverProps={{
        placement: 'bottom',
        offset: 10,
        shouldFlip: false,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background',
        },
      }}
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
