import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { RegionResponseType } from '../../../old/lib/utilities/API/types';
import { IExpert } from '../../../old/lib/types';
import { getRegions } from '../../../old/lib/utilities/API/api';

interface IRegionDropDownProps {
  expertRegion?: RegionResponseType;
  setExpertInfo: Dispatch<SetStateAction<IExpert | undefined>>;
}

// defValue to prevent passing undefined on component mounting: undefined
const defValue = { usersPresent: true, id: 0, name: '' };

export const RegionDropDown: React.FC<IRegionDropDownProps> = (props) => {
  const { expertRegion, setExpertInfo } = props;
  const [allRegions, setAllRegions] = useState<RegionResponseType[]>([]);

  const fetchRegions = async () => {
    const response = await getRegions();
    const modifiedResponse = response.data.filter(
      (region: RegionResponseType) => {
        // check if we should only render regions with usersPresent: true or all regions should be displayed
        return region.usersPresent && region.name;
      },
    );
    setAllRegions(modifiedResponse);
  };

  const clearCityOnRegionUpdate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setExpertInfo((prevState: any) => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      mainInstitution: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...prevState.mainInstitution,
        city: {},
      },
    }));
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (expertRegion && _.isEmpty(expertRegion)) {
      clearCityOnRegionUpdate();
    }
  }, [expertRegion]);

  return (
    <Autocomplete
      options={allRegions}
      getOptionLabel={(option: RegionResponseType) =>
        option.name ? option.name : ''
      }
      id="regions-dropdown-menu"
      value={expertRegion || defValue}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      onChange={(_, newValue: RegionResponseType | null) => {
        clearCityOnRegionUpdate();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setExpertInfo((prevState: any) => ({
          ...prevState,
          region: {
            ...newValue,
          },
        }));
      }}
      renderInput={(params) => (
        <TextField
          error={false}
          helperText={null}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label="Регіон"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: !!expertRegion }}
        />
      )}
    />
  );
};
