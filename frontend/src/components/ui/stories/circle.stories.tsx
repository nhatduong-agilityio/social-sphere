import { Meta, StoryObj } from '@storybook/react';
import { Circle } from '../circle';

const meta = {
  title: 'Components/Circle',
  component: Circle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'tiny', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Circle>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
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

export const SizeTiny: Story = {
  args: {
    size: 'tiny',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
};

export const SizeExtrtaLarge: Story = {
  args: {
    size: 'xl',
  },
};
