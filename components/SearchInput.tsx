'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
const SearchInput = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // router.push(`${pathName}?topic=${searchQuery}`);
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'topic',
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === '/companions') {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['topic'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParams, pathName, router]);

  return (
    <div className="relative border  border-black rounded-lg flex gap-2 px-2 py-1 h-fit items-center">
      <Image src={'/icons/search.svg'} height={15} width={15} alt="search" />

      <input
        type="text"
        placeholder="Search Companions..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
