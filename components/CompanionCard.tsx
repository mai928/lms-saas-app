import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

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
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image alt="" src={"/icons/bookmark.svg"} width={12.5} height={15} />
        </button>
      </div>

      <h2 className="text-2xl font-bold ">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          alt="duration"
          src={"icons/clock.svg"}
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} mins durations</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <Button className="btn-primary w-full justify-center">
          {" "}
          Lunach Lesson
        </Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
