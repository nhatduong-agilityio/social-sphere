import { Meta, StoryObj } from '@storybook/react';
import { Text } from '../text';

// Meta
const meta = {
  title: 'Components/Text',
  render: (args) => <Text {...args}>{args.children}</Text>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'Paragraph',
  },
  argTypes: {
    variant: {
      options: ['default', 'primary', 'error'],
    },
    size: {
      options: ['default', 'xs', 'md'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

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
export const Error: Story = {
  args: {
    variant: 'error',
  },
};

// sizes
export const SizeExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};
export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
};
