"use client";
import { Routes } from "@/app/home/routes/routes";
import { useScrollSections } from "@/app/hooks";
import { Typography } from "@material-tailwind/react";

export type NavlistProps = {};

const Navlist: React.FC<NavlistProps> = () => {
  const { scrolled, sectionActive } = useScrollSections();

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-center">
      {Routes.map((r) => (
        <Typography
          key={r.id}
          as="li"
          variant="small"
          color="blue-gray"
          className={`w-28 relative flex justify-center text-center hover:font-bold items-center hover:text-[#008545] ${
            sectionActive !== r.active
              ? `text-black`
              : `text-[#008545] font-bold`
          }`}
        >
          <a href={r.href} className="flex items-center ">
            {r.text}
          </a>
        </Typography>
      ))}
    </ul>
  );
};

export default Navlist;
