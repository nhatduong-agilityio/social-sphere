import { render } from '@testing-library/react';
import { ThemeProvider } from '../theme-provider';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-theme-provider">{children}</div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children within the ThemeProvider', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div data-testid="child-element">Child Component</div>
      </ThemeProvider>,
    );

    // Check if the ThemeProvider wrapper is rendered
    expect(getByTestId('mock-theme-provider')).toBeInTheDocument();

    // Check if the child component is rendered inside ThemeProvider
    expect(getByTestId('child-element')).toHaveTextContent('Child Component');
  });
});
