import CompanionCard from '@/components/CompanionCard';
import CompanionList from '@/components/CompanionList';
import CTA from '@/components/CTA';
import {
  getAllCompanions,
  getRecentSessions,
} from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import React from 'react';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions(10);

  return (
    <div className="flex flex-col gap-8  mx-auto  max-sm:px-2">
      <h1 className="">Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionList
          title="Recently Completed Sessions"
          companions={recentSessionCompanions}
          className="w-[65%] max-lg:w-full"
        />
        <CTA />
      </section>
    </div>
  );
};

export default Page;
