import { productApi } from "@/apiClient/product";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import Image from "next/image";
import { cartApi } from "@/apiClient/cartAPI";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addToCartStore } from "store/features/cartSlice";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import { useRouter } from "next/router";

const AddToCart = ({ id, onClose }) => {
  const [productDetails, setProductDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();
  const [current, setCurrent] = useState({
    image: "",
    colorId: "",
    sizesInfo: {},
    sizeList: [],
  });
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/uploadWithRefactorDB/";
  useEffect(() => {
    if (!id) return;
    const getProductDetails = async () => {
      try {
        const result = await productApi.getProductById(id);
        setProductDetails(result);
        setCurrent({
          image: result?.color[0]?.images[0],
          colorId: result?.color[0]?.id,
          sizeList: result?.color[0]?.sizes,
          sizesInfo: result?.color[0]?.sizes[0],
        });
        setSize(result?.color[0]?.sizes[0].sizeName);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    };
    getProductDetails();
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
  const handleChangeImageList = (id) => {
    const colorInfo = productDetails.color.filter((item) => item.id === id);
    setCurrent({
      image: colorInfo[0]?.images[0],
      colorId: colorInfo[0].id,
      sizeList: colorInfo[0]?.sizes,
      sizesInfo: colorInfo[0]?.sizes[0],
    });
  };
  const handleSizeInfo = (sizeCurrent) => {
    const sizeInfo = current.sizeList.filter(
      (item) => sizeCurrent.sizeId === item.sizeId
    );
    setSize(sizeCurrent?.sizeName);
    setCurrent({
      ...current,
      sizesInfo: sizeInfo[0],
    });
  };
  const handleAddToCart = async () => {
    if (session?.user) {
      setLoadingAdd(true);
      try {
        const result = await cartApi.addCart({
          productId: id,
          quantity: quantity,
          sizeId: current.sizesInfo.sizeId,
          colorId: current.colorId,
        });
        if (result) {
          onClose();
          toast.success("Success Add to Cart !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(
            addToCartStore({
              product: result.product,
              cartItem: result.cart,
            })
          );
          setLoadingAdd(false);
        }
      } catch (error) {
        onClose();
        setLoadingAdd(false);
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      onClose();
      toast.warn("Please login to add cart !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push({
          pathname: "/login",
          query: { id: id },
        });
      }, 3000);
    }
  };

  return (
    <div className="h-full w-full p-5">
      {isLoading ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <>
          <LoadingPageComponent loading={loadingAdd} />
          <div className="h-full flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold">
              {productDetails?.name}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="col-span-1">
                <Image
                  src={baseUrl + current.image}
                  width={400}
                  height={400}
                  layout="intrinsic"
                  priority={true}
                  blurDataURL={baseUrl + current.image}
                  placeholder="blur"
                  alt={current.image}
                />
              </div>
              <div className="col-span-1">
                <div className="w-full">
                  <h3 className="font-bold  md:text-lg">Select color</h3>
                  <div className="w-full flex flex-wrap gap-2 py-4">
                    {productDetails.color.map((color, index) => (
                      <Image
                        key={index}
                        src={baseUrl + color.avatar}
                        layout="intrinsic"
                        width={80}
                        height={80}
                        className={`hover:border hover:border-black hover:border-solid hover:cursor-pointer duration-300 rounded-lg ${
                          current.colorId === color.id &&
                          "border border-black border-solid"
                        }`}
                        onClick={() => handleChangeImageList(color.id)}
                        blurDataURL={baseUrl + color.avatar}
                        placeholder="blur"
                        alt={color.avatar}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full my-3 flex gap-5">
                  <h3 className="font-bold  md:text-lg">Price: </h3>
                  <p>${current.sizesInfo.price}.00</p>
                </div>
                <div className="my-3 flex items-center">
                  <h3 className="mr-3 h-10 flex items-center font-bold  md:text-lg">
                    Quantity:{" "}
                  </h3>
                  <button
                    className="w-10 h-10 text-xl hover:bg-primary bg-[#ccc] text-white cursor-pointer rounded-full duration-300 shadow-icon-product"
                    onClick={handleDesc}
                  >
                    <div className="flex-center text-2xl text-secondary">-</div>
                  </button>
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-center outline-none border-[1px] border-solid h-10 w-10 md:w-16 rounded-md mx-2 md:mx-5 shadow-product-line "
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
                <div className="w-full mt-4">
                  <h3 className="font-bold md:text-lg">Select Size: </h3>
                  <div className="flex items-center flex-wrap gap-3 mt-2">
                    {current?.sizeList?.map((item, index) => (
                      <button
                        onClick={() => handleSizeInfo(item)}
                        className={`w-20 lg:w-32 shadow-sm border-[1px] borer-solid hover:border-black hover:borer-solid rounded duration-200 bg-white  cursor-pointer px-4 py-1 ${
                          size === item.sizeName ? "border-black" : ""
                        }`}
                        key={index}
                      >
                        {item.sizeName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full min-h-[1px] bg-black "></div>
            <div className="flex justify-end px-4 pb-8 gap-6">
              <button
                className="bg-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-slate-200 duration-200 hover:cursor-pointer"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                className="bg-cyan-600 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-cyan-800 duration-200 hover:cursor-pointer"
                onClick={handleAddToCart}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
