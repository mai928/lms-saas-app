import CompanionList from '@/components/CompanionList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  getUserCompanion,
  getUserSessions,
} from '@/lib/actions/companion.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const companion = await getUserCompanion(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <section className="w-full ">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center shadow-md p-4 rounded-lg">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={90}
            height={90}
            className="rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className=" border border-gray-100 shadow-sm rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src={'/icons/check.svg'}
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>

            <div>Lessons Completed</div>
          </div>

          <div className=" border border-gray-100 shadow-sm rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src={'/icons/check.svg'}
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{companion.length}</p>
            </div>

            <div>Companion Created</div>
          </div>
        </div>
      </section>

      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companion.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="My Companion" companions={companion} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ProfilePage;
