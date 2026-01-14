import CompanionCard from '@/components/CompanionCard';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import React from 'react';

import CompanionLibraryClient from '@/components/CompanionLibraryClient';

export const dynamic = 'force-dynamic';

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });
  // console.log(companions);

  return <CompanionLibraryClient companions={companions} />;
};

export default CompanionLibrary;
