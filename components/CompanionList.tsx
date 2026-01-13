import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface CompanionListProps {
  title: string;
  companions: Companion[];
  className?: string;
}

const CompanionList = ({
  title,
  companions,
  className,
}: CompanionListProps) => {
  return (
    <article className={cn('companion-list', className)}>
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subjects</TableHead>
            <TableHead className="text-right">Durations</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companions.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              <TableCell>
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-5">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{
                        backgroundColor: getSubjectColor(subject),
                      }}
                    >
                      <Image
                        alt={subject}
                        src={`/icons/${subject}.svg`}
                        width={30}
                        height={30}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl capitalize">{name}</p>
                      <p className="text-sm text-gray-600">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>

              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {subject}
                </div>
                <div
                  className="flex items-center justify-center gap-3 rounded-lg  w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  {' '}
                  <Image
                    alt={subject}
                    src={`/icons/${subject}.svg`}
                    width={16}
                    height={16}
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 w-full justify-end">
                  <p className="text-2xl">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image
                    alt="mins"
                    src={`/icons/clock.svg`}
                    width={14}
                    height={14}
                    className="md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
