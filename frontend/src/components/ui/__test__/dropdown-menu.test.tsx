import { render, screen, fireEvent } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
} from '../dropdown-menu';

describe('DropdownMenu Components', () => {
  it('renders DropdownMenu with trigger and content', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="dropdown-content">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByTestId('dropdown-trigger');
    fireEvent.click(trigger);

    expect(screen.getByTestId('dropdown-content')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders DropdownMenuCheckboxItem correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true} data-testid="checkbox-item">
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const checkboxItem = screen.getByTestId('checkbox-item');
    expect(checkboxItem).toBeInTheDocument();
  });

  it('renders DropdownMenuRadioItem correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioItem value="radio" data-testid="radio-item">
            Radio Item
          </DropdownMenuRadioItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('radio-item')).toBeInTheDocument();
  });

  it('renders DropdownMenuLabel correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuLabel data-testid="menu-label">Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('menu-label')).toHaveClass(
      'px-2 py-1.5 text-sm font-semibold',
    );
  });

  it('renders DropdownMenuLabel inset correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuLabel data-testid="menu-label" inset>
            Label
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('menu-label')).toHaveClass(
      'px-2 py-1.5 text-sm font-semibold pl-8',
    );
  });

  it('renders DropdownMenuSeparator correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSeparator data-testid="menu-separator" />
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('menu-separator')).toHaveClass('h-px bg-muted');
  });

  it('renders DropdownMenuGroup correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuGroup data-testid="menu-group">
            <DropdownMenuItem>Group Item</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('menu-group')).toBeInTheDocument();
  });

  it('renders DropdownMenuSub with trigger and content', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger data-testid="sub-trigger">
              Sub Menu
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent data-testid="sub-content">
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('sub-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('sub-content')).toBeInTheDocument();
  });

  it('renders DropdownMenuSub with trigger inset and content', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger data-testid="sub-trigger" inset>
              Sub Menu
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent data-testid="sub-content">
              <DropdownMenuItem inset>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId('sub-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('sub-content')).toBeInTheDocument();
  });

  it('renders DropdownMenuShortcut correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item
            <DropdownMenuShortcut data-testid="shortcut">
              ⌘K
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const shortcut = screen.getByTestId('shortcut');
    expect(shortcut).toHaveClass('ml-auto text-xs tracking-widest opacity-60');
  });

  it('renders DropdownMenuPortal correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuPortal>
          <DropdownMenuContent data-testid="portal-content">
            <DropdownMenuItem>Portaled Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>,
    );
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  it('renders DropdownMenuRadioGroup correctly', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup data-testid="radio-group">
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByTestId('radio-group')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
