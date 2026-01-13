import CompanionComponent from '@/components/CompanionComponent';
import { getCompanionById } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

// params   /url/{id}
// Search Params  /url?subject=math&topic=algebra

const CompanionSessions = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanionById(id);
  const user = await currentUser();

  const { name, subject, title, topic, duration } = companion;
  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

  return (
    <section className="w-full">
      <article className="flex w-full border border-gray-200 shadow-md rounded-2xl justify-between p-6 max-md:flex-col my-3 ">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center  justify-center rounded-lg  max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              alt="subject"
              width={35}
              height={35}
              src={`/icons/${subject}.svg`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>

        <div className="items-start text-2xl ">{duration} minutes</div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </section>
  );
};

export default CompanionSessions;
