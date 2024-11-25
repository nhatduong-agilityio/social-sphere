import { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../progress';

const meta = {
  title: 'Components/Progress',
  render: (args) => (
    <div className="relative w-[400px]">
      <Progress {...args} />
    </div>
  ),
  tags: ['autodocs'],
  args: {
    value: 3,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'md'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

// sizes
export const SizeDefault: Story = {
  args: {
    size: 'default',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
};
