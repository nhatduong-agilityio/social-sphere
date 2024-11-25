import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../textarea';

// Meta
const meta = {
  title: 'Components/Textarea',
  render: (args) => <Textarea {...args}>{args.children}</Textarea>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'Textarea paragraph',
  },
  argTypes: {
    variant: {
      options: ['default', 'ghost'],
    },
    size: {
      options: ['default', 'sm'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

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

// sizes
export const SizeSmall: Story = {
  args: {
    size: 'sm',
  },
};
