import { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

//meta
const meta = {
  title: 'Components/Avatar',
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Shadcn</AvatarFallback>
    </Avatar>
  ),
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
  },
};

export const SizeExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
  },
};

export const SizeExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};
