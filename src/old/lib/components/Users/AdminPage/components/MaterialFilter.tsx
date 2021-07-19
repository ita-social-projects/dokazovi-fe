import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ChipsList } from '../../../../../../components/Chips/ChipsList/ChipsList';
import { AdminPageFiltersType, IFilterOption } from '../../../../types';

interface IMaterialFilterProps {
  filterLabel: string;
  filterName: AdminPageFiltersType;
  filterOptions: IFilterOption[];
  submitFilters: (
    filterName: AdminPageFiltersType,
    selectedFilters: number[],
  ) => void;
}

const MaterialFilter: React.FC<IMaterialFilterProps> = ({
  filterLabel,
  filterName,
  filterOptions,
  submitFilters,
}) => {
  const [selectedFilters, setFilters] = useState<number[]>([]);
  const [selectedChipFilters, updateChips] = useState('');
  const filterLabelId = `${filterName.toLowerCase()}filter-label`;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const updatedFilters = event.target.value as number[];
    const updatedChips = updatedFilters.map((filter) => {
      const fullFilter = filterOptions.find(
        (option) => option.value === filter,
      );
      return fullFilter?.chipValue || '';
    });
    setFilters(updatedFilters);
    updateChips(updatedChips.join(', '));
  };

  const removeFilter = (optionId) => {
    const updatedFilters = selectedFilters.filter(
      (filter) => filter !== optionId,
    );
    const updatedChips = updatedFilters.map((filter) => {
      const fullFilter = filterOptions.find(
        (option) => option.value === filter,
      );
      return fullFilter?.chipValue || '';
    });
    setFilters(updatedFilters);
    updateChips(updatedChips.join(', '));
    submitFilters(filterName, updatedFilters);
  };

  return (
    <div className="filterView">
      <Select
        className="dropdownFilter"
        labelId={filterLabelId}
        multiple
        displayEmpty
        variant="outlined"
        renderValue={() => <InputLabel>{filterLabel}</InputLabel>}
        placeholder={filterLabel}
        value={selectedFilters}
        onChange={handleChange}
        onClose={() => submitFilters(filterName, selectedFilters)}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            selected={selectedFilters.includes(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <div>
        <ChipsList
          checkedNames={selectedChipFilters}
          handleDelete={removeFilter}
        />
      </div>
    </div>
  );
};

export default MaterialFilter;
