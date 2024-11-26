import { render, screen } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs Components', () => {
  it('renders tabs structure correctly', () => {
    render(
      <Tabs defaultValue="tab1" data-testid="tabs">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1" data-testid="trigger-1">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" data-testid="trigger-2">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">
          Content 1
        </TabsContent>
        <TabsContent value="tab2" data-testid="content-2">
          Content 2
        </TabsContent>
      </Tabs>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    expect(screen.getByTestId('trigger-1')).toBeInTheDocument();
    expect(screen.getByTestId('content-1')).toBeInTheDocument();
  });

  it('handles tab switching', () => {
    render(
      <Tabs value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1" data-testid="trigger-1">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" data-testid="trigger-2">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">
          Content 1
        </TabsContent>
        <TabsContent value="tab2" data-testid="content-2">
          Content 2
        </TabsContent>
      </Tabs>,
    );

    const trigger2 = screen.getByTestId('trigger-2');
    expect(trigger2).toHaveAttribute('data-state', 'active');
  });

  it('applies correct styling to active tab', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" data-testid="trigger-1">
            Tab 1
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const trigger = screen.getByTestId('trigger-1');
    expect(trigger).toHaveAttribute('data-state', 'active');
    expect(trigger).toHaveClass('data-[state=active]:shadow-lg');
  });

  it('applies custom className to TabsList', () => {
    render(
      <Tabs>
        <TabsList className="custom-list-class" data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(screen.getByTestId('tabs-list')).toHaveClass('custom-list-class');
  });

  it('applies custom className to TabsContent', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent
          value="tab1"
          className="custom-content-class"
          data-testid="content"
        >
          Content
        </TabsContent>
      </Tabs>,
    );

    expect(screen.getByTestId('content')).toHaveClass('custom-content-class');
  });
});
