import { Container } from "@/components/common";
import Image from "next/image";

export function BannerChild({ ...props }) {
  const image =
    props.text == "MEN'S"
      ? "/images/banner/bannerChildMen.jpg"
      : "/images/banner/bannerChild.jpg";
  return (
    <Container>
      <div className="relative w-full h-auto font-Rokkitt">
        <div className="w-full h-[400px] mb-3 md:mb-0">
          <Image src={image} alt="bannerChild" layout="fill" />
        </div>
        <div className="absolute top-10 left-10 w-auto text-[40px] font-medium text-white">
          <h1>{props.text}</h1>
        </div>
      </div>
    </Container>
  );
}
