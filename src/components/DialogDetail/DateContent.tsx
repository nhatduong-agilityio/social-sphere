import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FunctionComponent, memo, useEffect, useState } from 'react';

interface IProps {
  date: string;
  onSetDate: (date: string) => void;
}

export const DateContent: FunctionComponent<IProps> = memo(({ date, onSetDate }: IProps) => {
  const [dateValue, setDateValue] = useState(date);

  const handleChange = (newValue: Dayjs | null) => {
    const setDate = dayjs(newValue).format('ll').toString();

    setDateValue(setDate);
  };

  useEffect(() => {
    onSetDate(dateValue);
  }, [dateValue, onSetDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label='Date desktop'
        inputFormat='MM/DD/YYYY'
        value={date}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} variant='standard' />}
      />
    </LocalizationProvider>
  );
});

DateContent.displayName = 'DateContent';
