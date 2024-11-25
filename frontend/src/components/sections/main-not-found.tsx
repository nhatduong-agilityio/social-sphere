import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export const MainNotFound = () => (
  <section
    className="h-[50dvh] flex justify-center items-center"
    data-testid="main-not-found"
  >
    <div className="flex flex-col max-w-96 gap-10">
      <Heading headingLevel="h2" data-testid="not-found-heading">
        Not Found
      </Heading>
      <Text data-testid="not-found-text">
        Could not find requested resource
      </Text>
      <Link href="/" data-testid="not-found-link">
        Return Home
      </Link>
    </div>
  </section>
);
