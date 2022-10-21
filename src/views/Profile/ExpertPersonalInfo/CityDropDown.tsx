import React, { SetStateAction, Dispatch, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { CityResponseType } from '../../../old/lib/utilities/API/types';
import { IExpert } from '../../../old/lib/types';
import { getCitiesByRegionId } from '../../../old/lib/utilities/API/api';

type CityType = { id: number; name: string };

interface IRegionDropDownProps {
  expertCity?: CityType;
  regionId?: number;
  setExpertInfo: Dispatch<SetStateAction<IExpert | undefined>>;
}

// defValue to prevent passing undefined on component mounting: undefined
const defValue = { id: 0, name: '' };

export const CityDropDown: React.FC<IRegionDropDownProps> = (props) => {
  const { expertCity, regionId, setExpertInfo } = props;
  const [cities, setCities] = useState<CityResponseType[]>([]);

  const fetchCitiesByRegionId = async () => {
    const response = await getCitiesByRegionId(regionId as number);
    setCities(response.data);
  };

  useEffect(() => {
    if (regionId) {
      fetchCitiesByRegionId();
    }
  }, [regionId]);

  return (
    <Autocomplete
      disabled={!regionId}
      options={cities}
      getOptionLabel={(option: CityType) => (option.name ? option.name : '')}
      id="regions-dropdown-menu"
      value={expertCity || defValue}
      onChange={(_, newValue: CityType | null) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        setExpertInfo((prevState: any) => ({
          ...prevState,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          mainInstitution: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...prevState.mainInstitution,
            city: { ...newValue },
          },
        }));
      }}
      renderInput={(params) => (
        <TextField
          error={false}
          helperText={!regionId && 'Регіон не вибрано'}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label="Місто"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: !!expertCity && !!regionId }}
        />
      )}
    />
  );
};
