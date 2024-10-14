import { ReactNode } from 'react';

interface ComposeOverlayProps {
  isOpen: boolean;
  children: ReactNode;
}

export const ComposeOverlay = ({ isOpen, children }: ComposeOverlayProps) => {
  if (!isOpen) return <>{children}</>;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 dark:opacity-70 z-50" />
      <div className="relative z-50">{children}</div>
    </>
  );
};
