import type { ReactNode } from 'react';

const LayoutCategory = ({ children }: { children: ReactNode }) => (
  <div className="container mx-auto mt-6 grid grid-cols-[240px_1fr]">
    <div className="bg-slate-50">Sidebar (filter)</div>
    <div className="">{children}</div>
  </div>
);

export default LayoutCategory;
