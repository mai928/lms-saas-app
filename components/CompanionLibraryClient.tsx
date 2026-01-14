'use client';

import React, { Suspense } from 'react';
import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { getSubjectColor } from '@/lib/utils';

const CompanionLibraryClient = ({
  companions,
}: {
  companions: Companion[];
}) => {
  return (
    <section className=" my-5 border-2 border-gray-50 rounded-lg  p-5 shadow-sm">
      <section className="flex justify-between gap-4 max-sm:flex-col ">
        <h1 className="text-2xl font-bold mb-4">Companion Library</h1>
        <Suspense fallback={<div>Loading filters...</div>}>
          <div className="flex gap-4 items-center mb-5">
            <SearchInput />
            <SubjectFilter />
          </div>
        </Suspense>
      </section>

      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </section>
  );
};

export default CompanionLibraryClient;
