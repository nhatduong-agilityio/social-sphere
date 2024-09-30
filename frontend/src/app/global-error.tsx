'use client';

// Types
import { PageErrorProps } from '@/types/components';

// Components
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layouts/header';

export default function GlobalError({
  // error,
  reset,
}: PageErrorProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <h2>Something went wrong!</h2>
        <Button variant="destructive" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
