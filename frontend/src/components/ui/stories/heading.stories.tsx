import { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../heading';
//meta
const meta = {
  title: 'Components/Heading',
  render: (args) => <Heading {...args}>{args.children}</Heading>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'Heading',
  },
  argTypes: {
    variant: {
      options: ['default', 'title', 'caption'],
    },
    size: {
      options: ['default', 'base', '2xl', '3xl'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
};
export const Title: Story = {
  args: {
    variant: 'title',
  },
};
export const Caption: Story = {
  args: {
    variant: 'caption',
  },
};

// sizes
export const SizeBase: Story = {
  args: {
    size: 'base',
  },
};
export const Size2ExtraLarge: Story = {
  args: {
    size: '2xl',
  },
};
export const Size3ExtraLarge: Story = {
  args: {
    size: '3xl',
  },
};
