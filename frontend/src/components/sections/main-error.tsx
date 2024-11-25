import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

export const MainError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <section className="h-[50dvh] flex justify-center items-center">
    <div className="flex flex-col max-w-96 gap-10">
      <Heading
        data-testid="global-error-heading"
        headingLevel="h2"
        className="capitalize"
      >
        {error.message}
      </Heading>
      <Button data-testid="global-error-button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  </section>
);
