'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To detect active page
import React, { useEffect, useState } from 'react';

const SideBar = ({ isopen }: { isopen: boolean }) => {
  // console.log('Sidebar render - isopen:', isopen);
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: (color: string) => (
        <svg fill={color} width={22} height={22} viewBox="0 0 640 640">
          <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
        </svg>
      ),
    },
    {
      name: 'Companions',
      href: '/companions',
      icon: (color: string) => (
        <svg fill={color} width={24} height={24} viewBox="0 0 640 640">
          <path d="M80 259.8L289.2 345.9C299 349.9 309.4 352 320 352C330.6 352 341 349.9 350.8 345.9L593.2 246.1C602.2 242.4 608 233.7 608 224C608 214.3 602.2 205.6 593.2 201.9L350.8 102.1C341 98.1 330.6 96 320 96C309.4 96 299 98.1 289.2 102.1L46.8 201.9C37.8 205.6 32 214.3 32 224L32 520C32 533.3 42.7 544 56 544C69.3 544 80 533.3 80 520L80 259.8zM128 331.5L128 448C128 501 214 544 320 544C426 544 512 501 512 448L512 331.4L369.1 390.3C353.5 396.7 336.9 400 320 400C303.1 400 286.5 396.7 270.9 390.3L128 331.4z" />
        </svg>
      ),
    },
    {
      name: 'Journey',
      href: '/my-journey',
      icon: (color: string) => (
        <svg fill={color} width={24} height={24} viewBox="0 0 640 640">
          <path d="M307.5 70.6L241.2 167C230 183.3 224 202.6 224 222.3L224 224C224 277 267 320 320 320C373 320 416 277 416 224L416 222.3C416 202.5 410 183.3 398.8 167L332.5 70.6C329.7 66.5 325 64 320 64C315 64 310.3 66.5 307.5 70.6zM141.3 405.5L98.7 448L64 448C46.3 448 32 462.3 32 480L32 544C32 561.7 46.3 576 64 576L384.5 576C413.5 576 441.8 566.7 465.2 549.5L591.8 456.2C609.6 443.1 613.4 418.1 600.3 400.3C587.2 382.5 562.2 378.7 544.4 391.8L424.6 480L312 480C298.7 480 288 469.3 288 456C288 442.7 298.7 432 312 432L384 432C401.7 432 416 417.7 416 400C416 382.3 401.7 368 384 368L231.8 368C197.9 368 165.3 381.5 141.3 405.5z" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/subscription',
      icon: (color: string) => (
        <svg
          fill={color}
          width={24}
          height={24}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out h-full flex-shrink-0
        ${
          isopen
            ? 'w-24 opacity-100'
            : 'w-0 opacity-0 overflow-hidden pointer-events-none'
        }
        
     
      `}
    >
      <nav className="m-4 h-[calc(100%-32px)] w-14 rounded-xl bg-white border-[.4px] border-gray-50 shadow-sm flex flex-col items-center gap-8 py-6">
        {/* Logo */}
        <Link href="/" className="transition hover:scale-105">
          <Image
            alt="Logo"
            src="/images/download.png"
            width={48}
            height={48}
            className="rounded-xl"
          />
        </Link>

        {/* Nav Items */}
        <div className="flex flex-col w-full gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div
                className="relative flex items-center justify-center w-full"
                key={item.href}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 bg-[#fe8f00] h-8 rounded-r-full" />
                )}
                <Link
                  href={item.href}
                  title={item.name}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    isActive ? 'bg-orange-50 scale-110' : 'hover:bg-gray-50'
                  }`}
                >
                  {item.icon(isActive ? '#fe8f00' : '#9ca3af')}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
