import { ReactNode } from 'react';

// Components
import { BrandIcon } from '@/icons/brand-icon';
import { Heading } from '../ui/heading';

export const LoginLayout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh w-dvw flex flex-row relative">
    <section className="hidden lg:flex container bg-gradient-blue animate-gradientShift duration-12000 ease-in-out infinite justify-center items-center">
      <Heading
        size="3xl"
        variant="caption"
        className="max-w-[400px] 2xl:text-4xl"
      >
        Join an Exciting Social Experience.
      </Heading>
    </section>
    <section className="container">{children}</section>
    <div className="hidden lg:flex w-[100px] h-[100px] bg-background absolute rounded-full p-[7px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="w-full h-full bg-gradient-blue animate-gradientShift duration-12000 ease-in-out infinite rounded-full flex justify-center items-center rotate-[30deg]">
        <BrandIcon className="text-white w-[54px] h-[54px]" />
      </div>
    </div>
  </main>
);
