import { Meta, StoryObj } from '@storybook/react';
import { Input } from '../input';
import { MailIcon } from 'lucide-react';
//meta
const meta = {
  title: 'Components/Input',
  render: (args) => <Input placeholder="Enter..." {...args} />,
  tags: ['autodocs'],
  args: {
    variant: 'default',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const StartIcon: Story = {
  args: {
    variant: 'icon',
    startIcon: <MailIcon />,
  },
};

export const EndIcon: Story = {
  args: {
    variant: 'icon',
    endIcon: <MailIcon />,
  },
};
