import clsx from "clsx";

export function Container({ className, ...props }) {
  return (
    <div
      className={clsx(
        "mx-auto sm:max-w-[576px] md:max-w-[768px] lg:max-w-[960px] xl:max-w-[1140px]",
        className
      )}
      {...props}
    />
  );
}
