'use client';

import Script from 'next/script';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { createContext, useState, ReactNode, useContext } from 'react';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const ContactContext = createContext<{ open: () => void } | undefined>(undefined);
export const useContact = () => {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact must be used within ContactProvider');
  return ctx;
};

import { PHProvider } from './Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const pathname = usePathname();

  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57DVX9V7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <PHProvider>
          <ContactContext.Provider value={{ open: openContact }}>
            {!isAdminRoute && <Navbar onOpenContact={openContact} />}
            <main className={isAdminRoute ? '' : 'pt-20 min-h-screen'}>{children}</main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <ContactModal isOpen={isContactOpen} onClose={closeContact} />}
          </ContactContext.Provider>
        </PHProvider>
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57DVX9V7');
          `}
        </Script>
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/696368517c8bd319796accab/1jem4v0jc';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
