import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { getSubjectColor } from '@/lib/utils';

interface CompanionCardProps {
  id?: string;
  name?: string;
  topic?: string;
  subject?: string;
  duration?: string;
  color?: string;
}
const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <article className="companion-card " style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image alt="" src={'/icons/bookmark2.svg'} width={13} height={15} />
        </button>
      </div>

      <div className="flex gap-3 items-stretch ">
        <div className=" border-r-4 border-orange-400 " />
        <div>
          <h2 className="text-2xl font-bold capitalize ">{name}</h2>
          <p className="text-xs w-72 text-gray-500">{topic}</p>
        </div>
      </div>

      <div className="w-[90%] border-b-2 border-gray-100  m-auto my-2" />

      <div className="flex justify-between ">
        <div className="flex items-center gap-1">
          <Image
            alt="duration"
            src={'icons/clock.svg'}
            width={13.5}
            height={13.5}
          />
          <p className="text-xs">
            {' '}
            <span className="font-bold">{duration}</span> mins durations
          </p>
        </div>

        <div>
          <Link href={`/companions/${id}`} className="btn-wrapper  ">
            <button className="btn-primary  ">Launch Lesson</button>
            <Image
              alt="right-icon"
              src={'icons/right.svg'}
              width={13.5}
              height={13.5}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CompanionCard;
