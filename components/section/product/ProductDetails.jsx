import { Container } from "@/components/common/index";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaAngleDown, FaAngleUp } from "react-icons/fa";
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
import { connectHits } from "react-instantsearch-dom";
import { Product } from ".";
import Collapse from "@/components/common/Collapse";

export function ProductDetail({ data }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [colorId, setColorId] = useState("");
  const [imageList, setImageList] = useState([]);
  const [sizeInfo, setSizeInfo] = useState();
  const [size, setSize] = useState();
  const [openModal, setOpenModal] = useState(false);
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

  const Hits = ({ hits }) => {
    let count = 0;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hits.map((hit) => {
          if (count == 4) return;
          if (
            data?.listAnotherCate.includes(hit?.style[0]) &&
            hit?._id != data?._id
          ) {
            count++;
            return (
              <div key={hit?._id} className="cursor-pointer">
                <Product
                  id={hit?._id}
                  image={hit?.avatar}
                  name={hit?.name}
                  price={hit?.price}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  const CustomHits = connectHits(Hits);

  return (
    <div className="w-full h-full">
      <LoadingPageComponent loading={loading} />
      <Container>
        <div>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-12 mx-6 lg:mx-0">
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
                  disabled={true}
                />
              </h3>
              <p className=" text-secondary font-light text-justify">
                {data?.introduce}
              </p>
            </div>
            <div className="mb-8 col-span-2">
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
                        blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}/uploadWithRefactorDB/${item}`}
                        placeholder="blur"
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
                    disabled={true}
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
                      className={`hover:border hover:border-black hover:border-solid hover:cursor-pointer duration-300 rounded-lg ${
                        colorId === color.id &&
                        "border border-solid border-black"
                      }`}
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
                <div className="my-5">
                  <Collapse
                    title="Description"
                    className="mb-2 text-2xl font-semibold"
                    openDefault
                  >
                    <div className="overflow-y-auto max-h-96 mb-5">
                      <p>{data?.description}</p>
                    </div>
                  </Collapse>
                  <Collapse
                    title={`Review and Rating (${data?.listUserComment.length})`}
                    className="mb-2 text-2xl font-semibold"
                    openDefault
                  >
                    <div className="overflow-y-auto max-h-96">
                      <Comments
                        commentAndRate={data?.commentAndRate}
                        listUserComment={data?.listUserComment}
                        shoeId={data?._id}
                      />
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
          <Container>
            <h2 className="text-center font-bold text-3xl">Related products</h2>
            <div className="my-10 mx-5 md:mx-0">
              <CustomHits />
            </div>
          </Container>
        </div>
        <Modal isVisible={openModal} onClose={() => setOpenModal(false)}>
          <div className="w-full h-full">
            <Image
              src="/images/banner/size_chart.jpg"
              alt="size-chart"
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
