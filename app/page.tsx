'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import InteractiveProducts from '../components/InteractiveProducts';
import Partners from '../components/Partners';
import { useContact } from './layout';

export default function Home() {
  const { open } = useContact();

  return (
    <>
      <Hero onOpenContact={open} />
      <Services />
      <Process />
      <Testimonials />
      <InteractiveProducts />
      <Partners />
    </>
  );
}
