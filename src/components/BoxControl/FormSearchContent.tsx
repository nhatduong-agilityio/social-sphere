// Libs
import { FormControl, InputBase, useTheme } from '@mui/material';
import { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react';

interface IProps {
  searchValue: string;
  onSetSearchValue: (searchValue: string) => void;
}

export const FormSearchContent: FunctionComponent<IProps> = memo(
  ({ searchValue, onSetSearchValue }: IProps) => {
    const theme = useTheme();
    const [state, setState] = useState(searchValue);

    const handleSetValueSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(event.target.value);
    };

    useEffect(() => {
      onSetSearchValue(state);
    }, [onSetSearchValue, state]);

    return (
      <FormControl sx={{ minWidth: '200px', padding: '0 12px 0 10px' }} size='small'>
        <InputBase
          onChange={handleSetValueSearch}
          value={searchValue}
          sx={{
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: 16,
            width: 'auto',
            padding: '6px 12px 4px 12px',
            color: theme.palette.primary.light,
          }}
        />
      </FormControl>
    );
  },
);

FormSearchContent.displayName = 'FormSearchContent';
