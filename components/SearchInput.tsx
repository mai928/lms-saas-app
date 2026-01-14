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

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('topic') || '',
  );

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
        if (pathName === '/companions' || pathName === '/') {
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
    <div className="relative border  border-gray-100 shadow-sm rounded-lg flex gap-2 ps-2 pe-12 py-2 h-fit items-center bg-white">
      <Image src={'/icons/search.svg'} height={15} width={15} alt="search" />

      <input
        type="text"
        placeholder="Search Companions  . . . . . . "
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
