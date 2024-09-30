export type CustomClassType = {
  customClass?: string;
};

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
