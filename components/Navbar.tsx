'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavItems from './NavItems';

const Navbar = () => {
  return (
    <nav className="navbar"> 
    <Link href={'/'}>   
      <Image  alt='' src={"images/logo.svg"} width={46} height={44}/>

    </Link>

     <div className='flex items-center gap-8 '>
      <NavItems/>
      <div className='flex items-center gap-4'>
        <SignedOut>
          <SignInButton >
            <button className='btn-signin'>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
     </div> 
    
     </nav>
  );
};

export default Navbar;
