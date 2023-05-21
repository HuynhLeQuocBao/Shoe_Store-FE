import Link from "next/link";
import clsx from "clsx";

export function MenuItem({ name, href, isActive }) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          ` text-white xl:text-black text-base font-Rokkitt font-normal
            hover:text-teal-600
          `,
          {
            "text-secondary xl:text-teal-600 border-b-2 xl:border-teal-600 border-secondary":
              isActive,
          }
        )}
      >
        {name}
      </a>
    </Link>
  );
}
