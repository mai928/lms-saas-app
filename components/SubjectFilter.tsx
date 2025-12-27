'use client';
import { subjects } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';
  console.log('SubjectFilter query:', query);
  console.log('SubjectFilter searchParams:', searchParams.toString());

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    if (!window.location.pathname.startsWith('/companions')) return;

    let newUrl = '';
    if (subject === 'All' || !subject) {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject,
      });
    }
    router.replace(newUrl, { scroll: false });
  }, [subject]);

  return (
    <div>
      <Select onValueChange={setSubject} defaultValue={query}>
        <SelectTrigger className="input capitalize">
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All subjects</SelectItem>

          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
