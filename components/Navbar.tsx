'use client';
import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavItems from './NavItems';
import SearchInput from './SearchInput';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar = ({
  onMenuToggle,
  isopen,
}: {
  onMenuToggle: () => void;
  isopen: boolean;
}) => {
  const pathname = usePathname();

  return (
    <nav className={`navbar ${isopen ? 'px-[2.8rem] ' : 'px-[6rem] '} `}>
      <div className="flex gap-3">
        {/* {pathname === '/' && <SearchInput />} */}
        {isopen ? (
          <Image
            onClick={onMenuToggle}
            className="cursor-pointer"
            src={'/icons/menu-right.png'}
            alt="menu-left"
            width={25}
            height={20}
          />
        ) : (
          <Image
            onClick={onMenuToggle}
            className="cursor-pointer"
            src={'/icons/menu-left.png'}
            alt="menu-right"
            width={25}
            height={20}
          />
        )}
      </div>
      <div className="flex   gap-8 ">
        <div className="flex items-center  gap-4">
          <SignedOut>
            <SignInButton>
              <button className="btn-signin">Sign In</button>
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
