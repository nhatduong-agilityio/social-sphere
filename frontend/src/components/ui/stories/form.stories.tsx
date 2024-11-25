import { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { useForm } from 'react-hook-form';
import { Input } from '../input';
import { Button } from '../button';
import { LockIcon, MailIcon } from 'lucide-react';

const meta = {
  title: 'Components/Form',
  component: () => {
    const form = useForm();

    return (
      <Form {...form}>
        <form className="flex flex-col mt-[34px] gap-2.5">
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    endIcon={<MailIcon />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    endIcon={<LockIcon />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-20 h-50">
            Sign In
          </Button>
        </form>
      </Form>
    );
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
