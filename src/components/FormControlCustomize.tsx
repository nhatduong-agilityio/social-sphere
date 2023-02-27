// Libs
import { FormControl, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  arrValue: string[] | number[];
  selectValue: string;
  onHandleChange: (event: SelectChangeEvent) => void;
  formStyle?: SxProps<Theme>;
  itemStyle?: SxProps<Theme>;
  selectSize?: 'medium' | 'small';
  disableValue?: boolean;
}

export const FormControlCustomize: FunctionComponent<IProps> = memo(
  ({
    arrValue,
    selectValue,
    onHandleChange,
    formStyle,
    itemStyle,
    selectSize,
    disableValue,
  }: IProps) => {
    return (
      <FormControl
        sx={formStyle}
        size={selectSize ? selectSize : 'small'}
        disabled={disableValue ? disableValue : false}
      >
        <Select
          key={`select-${selectValue}`}
          value={selectValue}
          onChange={onHandleChange}
          autoWidth
          sx={itemStyle}
        >
          {arrValue.map((item) => (
            <MenuItem key={item} sx={itemStyle} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

FormControlCustomize.displayName = 'FormControlCustomize';
