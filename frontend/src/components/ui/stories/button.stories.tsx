import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { XIcon } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'fixed',
        'primary',
        'outline',
        'destructive',
        'link',
        'rounded',
        'unstyle',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'md', 'lg', 'icon', 'fit'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button Shadcn',
  },
};

export const Fixed: Story = {
  args: {
    variant: 'fixed',
    children: 'Button Shadcn',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button Shadcn',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button Shadcn',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button Shadcn',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button Shadcn',
  },
};

export const Unstyle: Story = {
  args: {
    variant: 'unstyle',
    children: 'Button Shadcn',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    size: 'icon',
    className: 'bg-input-foreground w-12 h-12',
    children: <XIcon />,
  },
};

// sizes
export const SizeDefault: Story = {
  args: {
    size: 'default',
    children: 'Button Shadcn',
  },
};

export const SizeIcon: Story = {
  args: {
    size: 'icon',
    children: 'icon',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    children: 'Button Shadcn',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    children: 'Button Shadcn',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    children: 'Button Shadcn',
  },
};

export const SizeFit: Story = {
  args: {
    size: 'fit',
    children: 'Button Shadcn',
  },
};
