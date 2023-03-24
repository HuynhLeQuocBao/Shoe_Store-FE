import Link from "next/link";
import clsx from "clsx";

export function MenuItem({ name, href, isActive }) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          ` text-white md:text-black text-base font-Rokkitt font-normal
            hover:text-primary
          `,
          {
            "text-[#595959] md:text-primary border-b-2 md:border-primary border-secondary": isActive,
          }
        )}
      >
        {name}
      </a>
    </Link>
  );
}
