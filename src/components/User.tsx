// Libs
import { Avatar, Stack, SxProps, Theme, Typography } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  avatar: string;
  name: string;
  directionValue?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number;
  styleStack?: SxProps<Theme>;
  styleAvatar?: SxProps<Theme>;
  styleText?: SxProps<Theme>;
}

export const User: FunctionComponent<IProps> = memo(
  ({ avatar, name, directionValue, spacing, styleStack, styleAvatar, styleText }: IProps) => {
    return (
      <Stack direction={directionValue ? directionValue : 'row'} spacing={spacing} sx={styleStack}>
        <Avatar alt='customer-avatar' src={avatar} sx={styleAvatar} />
        <Typography component={'h4'} sx={styleText}>
          {name}
        </Typography>
      </Stack>
    );
  },
);

User.displayName = 'User';
