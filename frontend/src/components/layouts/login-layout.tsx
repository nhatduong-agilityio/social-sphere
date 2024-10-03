import { ReactNode } from 'react';

// Components
import { BrandIcon } from '@/icons/brand-icon';
import { Heading } from '../ui/heading';

export const LoginLayout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh w-dvw flex flex-row bg-background relative">
    <section className="hidden lg:flex container bg-gradient-to-b from-sphere-5 to-sphere-70 bg-[length:400%_400%] animate-gradientShift duration-12000 ease-in-out infinite justify-center items-center">
      <Heading size="3xl" variant="caption" className="max-w-400 2xl:text-4xl">
        Join an Exciting Social Experience.
      </Heading>
    </section>
    <section className="container">{children}</section>
    <div className="hidden lg:flex w-100 h-100 bg-background absolute rounded-full p-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="w-full h-full bg-sphere-30 rounded-full flex justify-center items-center rotate-[30deg]">
        <BrandIcon className="text-white w-54 h-54" />
      </div>
    </div>
  </main>
);
