// Libs
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FunctionComponent, memo } from 'react';
import { statusArr } from '~/constants/status';
import { Status } from '../Status';

interface IProps {
  status: string;
}

export const OrderStatus: FunctionComponent<IProps> = memo(({ status }: IProps) => {
  return (
    <FormControl>
      <InputLabel id='demo-select-label' sx={{ textTransform: 'uppercase' }}>
        Status
      </InputLabel>
      <Select
        key={`select-${status}`}
        labelId='demo-select-label'
        name='status'
        defaultValue={status}
        variant='standard'
      >
        {statusArr.map((item) => (
          <MenuItem key={item} value={item}>
            <Status
              status={item}
              styleStack={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}
              styleText={{
                fontSize: '13px',
                textTransform: 'capitalize',
                marginLeft: '25px',
                paddingTop: '2px',
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

OrderStatus.displayName = 'OrderStatus';
