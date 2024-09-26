'use client'; // Error components must be Client Components

// Types
import { PageErrorProps } from '@/types/components';

// Components
import { Button } from '@/components/Button';

const Error = ({
  // error,
  reset,
}: PageErrorProps) => (
  <div className="container mx-auto flex flex-col items-center">
    <h2 className="font-semibold mb-2">Something went wrong!</h2>
    <Button variant="error" onClick={() => reset()}>
      Try again
    </Button>
  </div>
);

export default Error;
