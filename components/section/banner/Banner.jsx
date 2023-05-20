import Slider from "react-slick";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function Banner() {
  const { data: session } = useSession();
  const variants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: -250,
      opacity: 1,
      transition: { ease: "easeOut", duration: 2 },
    },
  };
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };
  return (
    <div className="font-Rokkitt max-w-full">
      <Slider {...settings}>
        <div className="banner">
          <Image src="/images/banner/banner1.jpg" alt="banner1" layout="fill" />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ">
            <motion.div
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-3xl md:text-6xl font-bold my-2 md:my-4 ">
                {!session
                  ? "GIVE A VOUCHER"
                  : `WELCOME ${session?.user?.fullname}`}
              </div>
              <div className="text-xl md:text-3xl font-bold my-2 md:my-4 ">
                {!session ? "FOR" : "TO FOOTWEAR"}
              </div>
              <div className="text-4xl md:text-[50px] my-2 md:my-4 font-thin">
                {!session ? "NEW MEMBER" : "THE VOUCHER IS SENT YOUR EMAIL"}
              </div>
              <Link href={!session ? "/register" : "#best-seller"}>
                <button className="bg-primary hover:bg-teal-600 px-[30px] py-[15px] rounded-3xl my-2 md:my-4">
                  {!session ? "SIGN UP" : "SHOP COLLECTION"}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="banner">
          <Image src="/images/banner/banner2.jpg" alt="banner2" layout="fill" />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ">
            <motion.div
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-3xl md:text-6xl font-bold my-2 md:my-4 ">
                GIVE A VOUCHER
              </div>
              <div className="text-xl md:text-3xl font-bold my-2 md:my-4 ">
                ON
              </div>
              <div className="text-4xl md:text-[50px] my-2 md:my-4 font-thin">
                EACH ORDER COMPLETED
              </div>
              <Link href="#best-seller">
                <button className="bg-primary hover:bg-teal-600 px-[30px] py-[15px] rounded-3xl my-2 md:my-4 ">
                  SHOP COLLECTION
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="banner">
          <Image src="/images/banner/banner3.jpg" alt="banner3" layout="fill" />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-3xl md:text-6xl font-bold my-2 md:my-4 ">
                NEW
              </div>
              <div className="text-xl md:text-3xl font-bold my-2 md:my-4">
                ARRIVAL
              </div>
              <div className="text-4xl md:text-[50px] my-2 md:my-4 font-thin">
                UP TO <strong>30%</strong> OFF
              </div>
              <div className="text-[#ffffffcc] my-2 md:my-4">
                New stylish shoes for men
              </div>
              <Link href="#best-seller">
                <button className="bg-primary hover:bg-teal-600 px-[30px] py-[15px] rounded-3xl my-2 md:my-4 ">
                  SHOP COLLECTION
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
