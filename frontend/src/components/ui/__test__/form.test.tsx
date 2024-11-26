import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from '../form';

const TestForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Label</FormLabel>
              <FormControl>
                <input {...field} data-testid="test-input" />
              </FormControl>
              <FormDescription>Test description</FormDescription>
              <FormMessage>Test error message</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

describe('Form Components', () => {
  it('renders Form with all subcomponents', () => {
    render(<TestForm />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('applies correct classes to FormLabel', () => {
    render(<TestForm />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-neutral-400 font-medium');
  });

  it('applies correct classes to FormDescription', () => {
    render(<TestForm />);
    const description = screen.getByText('Test description');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('applies correct classes to FormMessage', () => {
    render(<TestForm />);
    const message = screen.getByText('Test error message');
    expect(message).toHaveClass('text-destructive');
  });

  it('applies error class to FormLabel when there is an error', () => {
    const TestFormWithError = () => {
      const form = useForm({
        defaultValues: { test: '' },
      });
      form.setError('test', {
        type: 'required',
        message: 'This field is required',
      });
      return (
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="test"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Label</FormLabel>
                  <FormControl>
                    <input {...field} data-testid="test-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    };
    render(<TestFormWithError />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
  });

  describe('returns correct field information', () => {
    const TestComponent = () => {
      const field = useFormField();
      return <div data-testid="field-info">{JSON.stringify(field)}</div>;
    };

    const TestForm = () => {
      const form = useForm();
      return (
        <FormProvider {...form}>
          <FormField
            control={form.control}
            name="testField"
            render={() => (
              <FormItem>
                <TestComponent />
              </FormItem>
            )}
          />
        </FormProvider>
      );
    };

    it('returns correct field information', () => {
      render(<TestForm />);
      const fieldInfo = JSON.parse(
        screen.getByTestId('field-info').textContent || '{}',
      );

      expect(fieldInfo).toEqual({
        id: expect.any(String),
        name: 'testField',
        formItemId: expect.stringContaining('-form-item'),
        formDescriptionId: expect.stringContaining('-form-item-description'),
        formMessageId: expect.stringContaining('-form-item-message'),
        isDirty: false,
        isTouched: false,
        invalid: false,
        isValidating: false,
      });
    });
  });
});
