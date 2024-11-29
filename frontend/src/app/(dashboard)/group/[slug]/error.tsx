'use client';

import { MainError } from '@/components/sections';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => <MainError error={error} reset={reset} />;

export default Error;
