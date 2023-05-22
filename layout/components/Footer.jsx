/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

export function FooterTitle({ mainTitle, titlesArr = [] }, link) {
  return (
    <div className="flex flex-col md:px-5 xl:px-10">
      <div className="mb-3 md:mb-5 uppercase">
        <h4 className="font-Rokkitt whitespace-nowrap text-base text-white font-semibold">
          {mainTitle}
        </h4>
      </div>
      <div>
        {titlesArr.map((title) => (
          <div
            key={title}
            className="font-Rokkitt text-sm text-white font-light text-left mb-2"
          >
            <div>{title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const titles = [
    {
      mainTitle: "Customer Care",
      subTitle: [
        "Contact",
        "Returns/Exchange",
        "Gift Voucher",
        "Wishlist",
        "Special",
        "Customer Services",
        "Site maps",
      ],
      link: "/contact",
    },
    {
      mainTitle: "Information",
      subTitle: [
        "About us",
        "Delivery Information",
        "Privacy Policy",
        "Support",
        "Order Tracking",
      ],
      link: "/contact",
    },
    {
      mainTitle: "News",
      subTitle: ["Blog", "Press", "Exhibitions"],
      link: "/contact",
    },
    {
      mainTitle: "Contact Information",
      subTitle: [
        "273 An Duong Vuong Street, Ward 3, District 5, Ho Chi Minh City, Vietnam",
        "+84 937 192 146",
        "huynhlequocbao2001@gmail.com",
      ],
      link: "/contact",
    },
  ];

  const socials = [
    {
      logo: <FaTwitter />,
      link: "https://www.facebook.com/profile.php?id=100091295227477",
    },
    {
      logo: <FaFacebookF />,
      link: "https://www.facebook.com/profile.php?id=100091295227477",
    },
    {
      logo: <FaLinkedin />,
      link: "https://www.facebook.com/profile.php?id=100091295227477",
    },
    {
      logo: <FaInstagram />,
      link: "https://www.facebook.com/profile.php?id=100091295227477",
    },
  ];

  return (
    <footer className="py-10 px-4 md:px-0 bg-secondary">
      <Container>
        <div className="flex flex-col xl:justify-center flex-wrap md:flex-row xl:flex-nowrap">
          <div className="flex flex-col mb-10 md:px-5 xl:px-10">
            <div className="mb-3 md:mb-5">
              <h4 className="font-Rokkitt whitespace-nowrap text-base text-white md:text-base font-semibold">
                ABOUT FOOTWEAR
              </h4>
            </div>
            <div className="font-Rokkitt text-sm font-light mb-2 md:text-left md:text-xs text-white">
              <p className="leading-loose text-justify md:text-left md:max-w-fit">
                Even the all-powerful Pointing has no control about the blind
                texts it is an almost unorthographic life
              </p>
            </div>
            <div className="flex items-center space-x-4 mb-2">
              {socials.map((item, index) => (
                <a
                  aria-label="logo social"
                  className="text-white"
                  key={index}
                  href={item.link}
                >
                  {item.logo}
                </a>
              ))}
            </div>
          </div>
          {titles.map((title, index) => (
            <FooterTitle
              key={index}
              mainTitle={title.mainTitle}
              titlesArr={title.subTitle}
              link={title.link}
            />
          ))}
        </div>
      </Container>
    </footer>
  );
}
