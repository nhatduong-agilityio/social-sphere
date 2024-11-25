import { Meta, StoryObj } from '@storybook/react';
import { Label } from '../label';
//meta
const meta = {
  title: 'Components/Label',
  render: (args) => <Label {...args}>{args.children}</Label>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'label',
  },
  argTypes: {
    variant: {
      options: ['default', 'neutral', 'darkNeutral'],
    },
    size: {
      options: ['default', 'tiny'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
};
export const Neutral: Story = {
  args: {
    variant: 'neutral',
  },
};
export const DarkNeutral: Story = {
  args: {
    variant: 'darkNeutral',
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
