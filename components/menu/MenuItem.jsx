import Link from "next/link";
import clsx from "clsx";

export function MenuItem({ name, href, isActive }) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          ` text-white lg:text-black text-base font-Rokkitt font-normal
            hover:text-primary
          `,
          {
            "text-secondary lg:text-primary border-b-2 lg:border-primary border-secondary":
              isActive,
          }
        )}
      >
        {name}
      </a>
    </Link>
  );
}
