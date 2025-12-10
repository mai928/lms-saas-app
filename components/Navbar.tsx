import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';

const Navbar = () => {
  return (
    <nav className="navbar"> 
    <Link href={'/'}>   
      <Image  alt='' src={"images/logo.svg"} width={46} height={44}/>

    </Link>

     <div className='flex items-center gap-8 '>
      <NavItems/>
      <p></p>
     </div> 
    
     </nav>
  );
};

export default Navbar;
