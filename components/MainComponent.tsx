'use client';
import { ClerkProvider } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  const [isopen, setIsopen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1240) {
        setIsopen(false);
      } else {
        setIsopen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{ variables: { colorPrimary: '#fe5933' } }}
    >
      <div className="flex h-screen bg-[#fff4f3]   overflow-hidden">
        {/* Sidebar */}
        <SideBar isopen={isopen} />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar min-w-0 transition-all duration-300 ease-in-out">
          <Navbar onMenuToggle={() => setIsopen(!isopen)} isopen={isopen} />

          <main className="flex-1 py-4 w-full">{children}</main>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default MainComponent;
