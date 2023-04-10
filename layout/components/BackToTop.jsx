import Image from "next/image";

export function BackToTop() {
  return (
    <div>
      <Image
        src="/images/svg/backToTop.svg"
        className="w-full h-full"
        layout="fill"
        width={25}
        height={25}
      />
    </div>
  );
}
