/* eslint-disable @next/next/no-img-element */
import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/router';
import Slider from "react-slick";
import { useSession } from "next-auth/react";
import { cartApi } from "@/apiClient/cartAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ProductDetail() {

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [content, setContent] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();
  const productId = router.query.slug;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const sizes = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "9", "10"];

  const handleAsc = () => {
    if (quantity < 1) {
      setQuantity(1);
    }
    else {
      setQuantity(quantity + 1);
    }
  }

  const handleDesc = () => {
    if (quantity <= 1) {
      setQuantity(1);
    }
    else {
      setQuantity(quantity - 1);
    }
  }

  const addToCart = async () => {
    if (session) {
      if (quantity <= 0) {
        toast.warn('Quantity must be larger zero !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else if (size === null) {
        toast.warn('Please choose size !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else {
        try {
          const result = await cartApi.addCart({ "productId": productId[0], "quantity": quantity, "size": size });
          if (result) {
            toast.success('Success Add to Cart !', {
              position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => {
              router.reload(window.location.pathname)
            }, 100);
          }
        } catch (error) {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
          });
        }

      }
    }
    else {
      toast.warn('Please login to add cart !', {
        position: toast.POSITION.TOP_RIGHT
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }

  useEffect(() => {
    try {
      const fechPublic = async () => {
        const dataProduct = await productApi.getProductById(productId);
        setData(dataProduct);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, []);

  return (
    <Container>
      <ToastContainer />
      <div className="grid grid-cols-1 xl:grid-cols-8 md:gap-12 mx-6 md:mx-0 py-24">
        <div className="mb-8 col-span-5">
          <Slider {...settings}>
            {
              data?.arrayImage?.map((item, index) => (
                <div key={index} className="w-full">
                  <img className="w-full h-full object-cover" src={`http://localhost:3010/upload/${item?.filename}`} />
                </div>
              ))
            }
          </Slider>
        </div>
        <div className="col-span-3">
          {
            <div className="flex flex-col justify-between">
              <h2 className="mb-4 text-xl font-semibold">{data.name}</h2>
              <h3 className="mb-2 text-lg">${parseFloat(data.price).toFixed(2)}</h3>
              <h3 className="mb-4 text-xs">RATING</h3>
              <p className="text-sm text-secondary font-light text-justify">{data.introduce}</p>
              <div className="w-full mt-4 mb-8">
                <h3 className="pb-2">SIZE</h3>
                {
                  sizes.map((item, index) => (
                    <button onClick={() => setSize(item)} className={`w-10 h-10 mr-1 mb-1 hover:bg-primary rounded-sm  text-white cursor-pointer ${size === item ? "bg-primary" : "bg-[#ccc]"}`} key={index}>{item}</button>
                  ))
                }
              </div>
              <div className="grid grid-cols-2 text-xl mb-8">
                <div className="">
                  <button className="w-10 h-10 mr-1 hover:bg-primary rounded-sm bg-[#ccc] text-white cursor-pointer"
                    onClick={handleDesc} > -
                  </button>
                  <input onChange={(e) => setQuantity(e.target.value)} className="text-center w-16 h-full outline-none" type="number" min="1" value={quantity} />
                  <button className="w-10 h-10 mr-1 hover:bg-primary rounded-sm bg-[#ccc] text-white cursor-pointer"
                    onClick={handleAsc} > +
                  </button>
                </div>
                <div>
                  <button
                    className="flex flex-row items-center w-fit hover:bg-primary rounded-sm bg-secondary text-white px-3 py-2"
                    onClick={addToCart}
                  >
                    <div className="text-xl">
                      <FaShoppingCart />
                    </div>
                    <p className="mx-2 text-base">Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>

          }
        </div>
      </div>
      <div className="text-justify mx-6 md:mx-0">
        <div className="grid grid-cols-3 gap-1 w-fit text-sm md:text-base text-black">
          <button onClick={() => setContent(1)} className={`${content == 1 ? "bg-secondary text-white" : "bg-[#F2F2F2]"} hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}>
            Description
          </button>
          <button onClick={() => setContent(2)} className={`${content == 2 ? "bg-secondary text-white" : "bg-[#F2F2F2]"} hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}>
            Manufacturer
          </button>
          <button onClick={() => setContent(3)} className={`${content == 3 ? "bg-secondary text-white" : "bg-[#F2F2F2]"} hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}>
            Review
          </button>
        </div>
        {content == 1 &&
          <div className="w-full border border-[#dee2e6] mt-4 px-8 py-8">
            <h3 className="text-sm text-secondary pb-6">{data?.description}</h3>
          </div>
        }
        {content == 2 &&
          <div className="w-full border border-[#dee2e6] mt-4 px-8 py-8">
            <h3 className="text-sm text-secondary pb-6">Chưa có API Manufacturer</h3>
          </div>
        }
        {content == 3 &&
          <div className="w-full border border-[#dee2e6] mt-4 px-8 py-8">
            <h3 className="text-sm text-secondary pb-6">Chưa có API Review</h3>
          </div>
        }
      </div>
    </Container>
  );
}
