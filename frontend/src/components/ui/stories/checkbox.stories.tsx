import { Meta, StoryObj } from '@storybook/react';
import { Checkbox as CheckboxBase } from '../checkbox';

const meta = {
  title: 'Components/Checkbox',
  render: (args) => <CheckboxBase {...args}>{args.children}</CheckboxBase>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'checkbox',
  },
  argTypes: {
    variant: {
      control: { type: 'check' },
      options: ['default', 'circle'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};
