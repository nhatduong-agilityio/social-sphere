import { TextField } from '@mui/material';
import { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react';

interface IProps {
  netAmount: number;
  onSetNetAmount: (netAmount: number) => void;
}

export const NetAmountContent: FunctionComponent<IProps> = memo(
  ({ netAmount, onSetNetAmount }: IProps) => {
    const [netAmountValue, setNetAmountValue] = useState(netAmount);

    const handleChangeNetAmount = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNetAmountValue(parseInt(event.target.value));
    };

    useEffect(() => {
      onSetNetAmount(netAmountValue);
    }, [netAmountValue, onSetNetAmount]);

    return (
      <TextField
        margin='dense'
        id='netAmount'
        label='Net Amount'
        type='text'
        fullWidth
        variant='standard'
        value={netAmount || ''}
        onChange={handleChangeNetAmount}
      />
    );
  },
);

NetAmountContent.displayName = 'NetAmountContent';
