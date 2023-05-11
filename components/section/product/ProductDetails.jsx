import { productApi } from "@/apiClient/product";
import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { useSession } from "next-auth/react";
import { cartApi } from "@/apiClient/cartAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCartStore } from "../../../store/features/cartSlice";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import PreviewImage from "./PreviewImage";
import Modal from "../modal/Modal";
import Stars from "../reviews/Stars";
import Comments from "../reviews/Comments";

export function ProductDetail({ data }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState("");
  const [imageList, setImageList] = useState([]);
  const [sizeInfo, setSizeInfo] = useState();
  const [size, setSize] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();
  const productId = router.query.slug;
  const dispatch = useDispatch();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  useEffect(() => {
    setColorId(data?.color[0]?.id);
    setSize(data?.color[0].sizes[0].sizeName);
    setImageList(data.color[0].images);
    setSizeInfo({
      currentSize: data.color[0].sizes[0],
      currentSizeListOfColor: data.color[0].sizes,
    });
  }, []);

  const handleAsc = () => {
    if (quantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDesc = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    if (session?.user) {
      if (quantity <= 0) {
        toast.warn("Quantity must be larger zero !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (size === null) {
        toast.warn("Please choose size !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setLoading(true);
        try {
          const result = await cartApi.addCart({
            productId: productId[0],
            quantity: quantity,
            sizeId: sizeInfo?.currentSize.sizeId,
            colorId,
          });
          if (result) {
            toast.success("Success Add to Cart !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(
              addToCartStore({
                product: result.product,
                cartItem: result.cart,
              })
            );
            setLoading(false);
          }
        } catch (error) {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        }
      }
    } else {
      toast.warn("Please login to add cart !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        router.push({
          pathname: "/login",
          query: { id: productId },
        });
      }, 3000);
    }
  };

  const handleChangeImageList = (id) => {
    setColorId(id);
    data.color.map((item) => {
      if (item.id === id) {
        setImageList(item.images);
        setSizeInfo({
          currentSize: item.sizes[0],
          currentSizeListOfColor: item.sizes,
        });
      }
    });
  };
  const handleSizeInfo = (item) => {
    setSize(item?.sizeName);
    setSizeInfo({
      ...sizeInfo,
      currentSize: item,
    });
  };
  return (
    <div className="w-full h-full">
      <LoadingPageComponent loading={loading} />
      <Container>
        <div>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-12 mx-6 lg:mx-0 py-10">
            <div className="flex flex-col justify-between lg:hidden">
              <h2 className="mb-2 text-3xl font-semibold">{data?.name}</h2>
              <h3 className="mb-2 text-lg">
                ${parseFloat(sizeInfo?.currentSize?.price).toFixed(2)}
              </h3>
              <h3 className="mb-4 text-xs">
                <Stars
                  stars={data?.rateScore}
                  reviews={data?.listUserComment?.length}
                  className="w-4 h-4"
                />
              </h3>
              <p className=" text-secondary font-light text-justify">
                {data?.introduce}
              </p>
            </div>
            <div className="mb-8 col-span-2 ">
              <div className="block lg:hidden">
                <Slider {...settings}>
                  {imageList?.map((item, index) => (
                    <div key={index}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploadWithRefactorDB/${item}`}
                        alt={item}
                        layout="responsive"
                        width={250}
                        height={250}
                        priority={true}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="hidden lg:flex flex-wrap gap-2">
                {imageList?.map((item, index) => (
                  <PreviewImage
                    key={item.position}
                    arrayImage={imageList}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col justify-between">
                <h2 className="mb-2 text-3xl font-semibold hidden lg:block">
                  {data?.name}
                </h2>
                <h3 className="mb-2 text-lg hidden lg:block">
                  ${parseFloat(sizeInfo?.currentSize?.price).toFixed(2)}
                </h3>
                <h3 className="mb-4 text-xs hidden lg:block">
                  <Stars
                    stars={data?.rateScore}
                    reviews={data?.listUserComment?.length}
                  />
                </h3>
                <p className=" text-secondary font-light text-justify hidden lg:block">
                  {data?.introduce}
                </p>
                <div className="w-full flex flex-wrap gap-2 p-4">
                  {data.color.map((color) => (
                    <Image
                      key={color.id}
                      src={BASE_URL + color?.avatar}
                      layout="intrinsic"
                      width={80}
                      height={80}
                      className="hover:border-[1px] hover:border-black hover:border-solid hover:cursor-pointer duration-300 rounded-lg"
                      onClick={() => handleChangeImageList(color.id)}
                    />
                  ))}
                </div>
                <div className="my-3 flex items-center">
                  <h3 className="mr-3 h-10 flex items-center">Quantity: </h3>
                  <button
                    className="w-10 h-10 text-xl hover:bg-primary bg-[#ccc] text-white cursor-pointer rounded-full duration-300 shadow-icon-product"
                    onClick={handleDesc}
                  >
                    <div className="flex-center text-2xl text-secondary">-</div>
                  </button>
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-center outline-none border-[1px] border-solid h-10 w-16 rounded-md mx-5 shadow-product-line "
                    type="number"
                    min="1"
                    value={quantity}
                  />
                  <button
                    className="w-10 h-10 text-xl hover:bg-primary bg-[#ccc] text-white cursor-pointer rounded-full duration-300 shadow-icon-product"
                    onClick={handleAsc}
                  >
                    <div className="flex-center h-full text-2xl text-secondary">
                      +
                    </div>
                  </button>
                </div>
                <div className="w-full mt-4 mb-8">
                  <div className="flex items-center justify-between">
                    <h3 className="pb-2">Select Size</h3>
                    <h3 className="pb-2">
                      <a
                        onClick={() => setOpenModal(true)}
                        className="font-bold underline cursor-pointer hover:text-primary"
                      >
                        Size chart
                      </a>
                    </h3>
                  </div>
                  <div className="flex items-center justify-evenly md:justify-between flex-wrap gap-1 md:gap-3">
                    {sizeInfo?.currentSizeListOfColor?.map((item, index) => (
                      <button
                        onClick={() => handleSizeInfo(item)}
                        className={`w-36 md:w-40 shadow-sm border-[1px] borer-solid hover:border-black hover:borer-solid rounded duration-200 bg-white  cursor-pointer px-4 py-1 ${
                          size === item.sizeName ? "border-black" : ""
                        }`}
                        key={index}
                      >
                        {item.sizeName}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full ">
                  <button
                    className="flex-center  items-center  hover:bg-zinc-700 rounded-2xl bg-black text-white px-3 py-3 duration-300"
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
          </div>
          <div className="text-justify mx-6 md:mx-0">
            <div className="grid grid-cols-3 gap-1 w-fit text-sm md:text-base text-black">
              <button
                onClick={() => setContent(1)}
                className={`${
                  content == 1 ? "bg-secondary text-white" : "bg-[#F2F2F2]"
                } hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}
              >
                Description
              </button>
              <button
                onClick={() => setContent(2)}
                className={`${
                  content == 2 ? "bg-secondary text-white" : "bg-[#F2F2F2]"
                } hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}
              >
                Manufacturer
              </button>
              <button
                onClick={() => setContent(3)}
                className={`${
                  content == 3 ? "bg-secondary text-white" : "bg-[#F2F2F2]"
                } hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white rounded-sm px-3 py-2`}
              >
                Reviews
              </button>
            </div>
            {content == 1 && (
              <div className="w-full border border-[#dee2e6] mt-4 px-8 py-8">
                <h3 className="text-sm text-secondary pb-6">
                  {data?.description}
                </h3>
              </div>
            )}
            {content == 2 && (
              <div className="w-full border border-[#dee2e6] mt-4 px-8 py-8">
                <h3 className="text-sm text-secondary pb-6">
                  Chưa có API Manufacturer
                </h3>
              </div>
            )}
            {content == 3 && (
              <div className="w-full border border-[#dee2e6] mt-4 p-3 overflow-hidden">
                <Comments
                  isEditComment={data?.isEditComment}
                  listUserComment={data?.listUserComment}
                />
              </div>
            )}
          </div>
        </div>
        <Modal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
          className="h-[80%] md:h-full"
        >
          <div>
            <Image
              src="/images/banner/size_chart.jpg"
              alt=""
              width={500}
              height={500}
              layout="responsive"
            />
          </div>
        </Modal>
      </Container>
    </div>
  );
}
