'use client';

// Types
import { PageErrorProps } from '@/types/components';

// Components
import Header from '@/layouts/Header';
import { Button } from '@/components/Button';

export default function GlobalError({
  // error,
  reset,
}: PageErrorProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <h2>Something went wrong!</h2>
        <Button variant="error" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
