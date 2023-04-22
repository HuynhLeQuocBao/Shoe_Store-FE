import Slider from "react-slick";
import { motion } from "framer-motion";
import Link from "next/link";
export function Banner() {
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
    autoplaySpeed: 5000,
  };
  return (
    <div className="font-Rokkitt max-w-full">
      <Slider {...settings}>
        <div className="h-[650px] w-full relative">
          <img
            className="w-full h-full object-cover"
            src="/images/banner/banner1.jpg"
            alt="banner1"
          />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
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
                FOR
              </div>
              <div className="text-4xl md:text-[50px] my-2 md:my-4 font-thin">
                NEW MEMBER
              </div>
              <Link href="/register">
                <button className="bg-[#616161] hover:bg-primary px-[30px] py-[15px] rounded-3xl my-2 md:my-4">
                  Sign Up Now
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="h-[650px] w-full relative ">
          <img
            className="w-full h-full object-cover "
            src="/images/banner/banner2.jpg"
            alt="banner2"
          />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <motion.div
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-3xl md:text-6xl font-bold my-2 md:my-4 ">
                HUGE
              </div>
              <div className="text-xl md:text-3xl font-bold my-2 md:my-4">
                SALES
              </div>
              <div className="text-4xl md:text-[50px] my-2 md:my-4 font-thin">
                <strong>50%</strong> OFF
              </div>
              <div className="text-[#ffffffcc] my-2 md:my-4">
                Big sale sandals
              </div>
              <button className="bg-[#616161] hover:bg-primary px-[30px] py-[15px] rounded-3xl my-2 md:my-4 ">
                SHOP COLLECTION
              </button>
            </motion.div>
          </div>
        </div>
        <div className="h-[650px] w-full relative">
          <img
            className="w-full h-full object-cover"
            src="/images/banner/banner3.jpg"
            alt="banner3"
          />
          <div className="absolute w-full text-white text-center top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
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
              <button className="bg-[#616161] hover:bg-primary px-[30px] py-[15px] rounded-3xl my-2 md:my-4 ">
                SHOP COLLECTION
              </button>
            </motion.div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
