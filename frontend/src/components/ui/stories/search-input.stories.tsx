import { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../search-input';

const meta = {
  title: 'Components/SearchInput',
  render: (args) => <SearchInput placeholder="Enter..." {...args} />,
  tags: ['autodocs'],
  args: {
    variant: 'default',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchInput>;

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
