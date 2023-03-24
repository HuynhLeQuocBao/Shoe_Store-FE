/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import { FaTwitter, FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export function FooterImage({ images = [] }) {
  return (
    <div className="items-center text-center inline-flex flex-col">
      <div className="flex flex-row flex-wrap items-center justify-center xl:flex-nowrap space-8">
        {images.map((image) => (
          <div
            key={image}
            className="w-[204px] h-[130px] relative flex items-center justify-center"
          >
            <img src={`/images/brand/${image}`} alt="" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FooterTitle({ mainTitle, titlesArr = [] }, link) {
  return (
    <div className="flex flex-col mb-10 md:px-5 xl:px-10 uppercase">
      <div className="mb-3 md:mb-5">
        <h4 className="font-Rokkitt whitespace-nowrap text-base text-black font-semibold">
          {mainTitle}
        </h4>
      </div>
      <div className="">
        {titlesArr.map((title) => (
          <div
            key={title}
            className="font-Rokkitt text-sm text-secondary font-light text-left mb-2"
          >
            <Link href={link}>
              <div>{title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const images = [
    {
      images: ["brand-1.jpg", "brand-4.jpg", "brand-3.jpg", "brand-5.jpg", "brand-2.jpg"],
    },
  ];

  const titles = [
    {
      mainTitle: "Customer Care",
      subTitle: ["Contact", "Returns/Exchange","Gift Voucher", "Wishlist", "Special", "Customer Services", "Site maps"],
      link: "/contact",
    },
    {
      mainTitle: "Information",
      subTitle: ["About us", "Delivery Information", "Privacy Policy", "Support", "Order Tracking"],
      link: "/contact",
    },
    {
      mainTitle: "News",
      subTitle: ["Blog", "Press", "Exhibitions"],
      link: "/contact",
    },
    {
      mainTitle: "Contact Information",
      subTitle: ["291 South 21th Street", "Suite 721 New York NY 10016", "+ 1235 2355 98", "info@yoursite.com", "yoursite.com"],
      link: "/contact",
    },
  ];

  return (
    <footer className="px-4 md:px-0">
      <Container>
        <div className="py-24">
          <div className="text-xl pb-20 text-center text-[#0000004D] font-Rokkitt font-semibold">
            <p>TRUSTED PARTNERS</p>
          </div>
          <div className="flex items-center justify-center md:flex-col">
            {images.map((image, index) => (
              <FooterImage
                key={index}
                images={image.images}
              />
            ))}
          </div>
        </div>
        <div className="md:pt-24 pb-14">
          <div className="flex flex-col xl:justify-center flex-wrap md:flex-row xl:flex-nowrap">
            <div className="flex flex-col mb-10 md:px-5 xl:px-10">
              <div className="mb-3 md:mb-5">
                <h4 className="font-Rokkitt whitespace-nowrap text-base text-secondary md:text-base font-semibold">
                  ABOUT FOOTWEAR
                </h4>
              </div>
              <div className="font-Rokkitt text-sm font-light mb-2 md:text-left md:text-xs text-secondary">
                <p className="leading-loose text-justify md:text-left md:max-w-fit">
                  Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <a href="/"><FaTwitter/></a>
                <a href="/"><FaFacebookF/></a>
                <a href="/"><FaLinkedin/></a>
                <a href="/"><FaInstagram/></a>
              </div>
            </div>
            {titles.map((title, index) => (
              <FooterTitle
                key={index}
                mainTitle = {title.mainTitle}
                titlesArr={title.subTitle}
                link = {title.link}
              />
            ))}
          </div>
        </div>
        <div className="py-7 font-Rokkitt text-base font-light md:text-left text-secondary">
          <p className="text-justify md:text-center">Copyright ©2022 All rights reserved | This template is made with by Colorlib Demo Images: Unsplash , Pexels.com</p>
        </div>
      </Container>
    </footer>
  );
}
