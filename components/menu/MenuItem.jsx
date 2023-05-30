import Link from "next/link";

export function MenuItem({ name, href, isActive }) {
  const dynamicClass = isActive
    ? "text-secondary xl:text-teal-600 border-b-2 xl:border-teal-600 border-secondary"
    : "";

  return (
    <Link href={href} prefetch={false}>
      <a
        className={`text-black xl:text-black text-base font-Rokkitt font-normal hover:text-teal-600 ${dynamicClass}`}
      >
        {name}
      </a>
    </Link>
  );
}
