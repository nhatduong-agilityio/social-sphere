import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card';

describe('Card Components', () => {
  it('renders Card with correct classes', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('rounded-md bg-card border border-gray-800');
  });

  it('renders CardHeader with correct classes', () => {
    render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
    const header = screen.getByTestId('card-header');
    expect(header).toHaveClass('flex flex-col p-5');
  });

  it('renders CardTitle with correct classes', () => {
    render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
    const title = screen.getByTestId('card-title');
    expect(title).toHaveClass('font-roboto font-medium text-md leading-6');
  });

  it('renders CardDescription with correct classes', () => {
    render(
      <CardDescription data-testid="card-description">
        Card Description
      </CardDescription>,
    );
    const description = screen.getByTestId('card-description');
    expect(description).toHaveClass(
      'font-roboto font-normal text-sm text-neutral-200',
    );
  });

  it('renders CardContent with correct classes', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    const content = screen.getByTestId('card-content');
    expect(content).toHaveClass('p-5 pt-0');
  });

  it('renders CardFooter with correct classes', () => {
    render(<CardFooter data-testid="card-footer">Footer Content</CardFooter>);
    const footer = screen.getByTestId('card-footer');
    expect(footer).toHaveClass('flex items-center p-5 pt-0');
  });

  it('applies custom className to all components', () => {
    const components = [
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
      CardFooter,
    ];
    components.forEach((Component, index) => {
      render(
        <Component data-testid={`custom-${index}`} className="custom-class">
          Content
        </Component>,
      );
      const element = screen.getByTestId(`custom-${index}`);
      expect(element).toHaveClass('custom-class');
    });
  });
});
