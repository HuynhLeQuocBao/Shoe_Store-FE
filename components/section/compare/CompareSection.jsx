import { Container } from "@/components/common/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productApi } from "@/apiClient/product";
import { HiPlus } from "react-icons/hi2";
import Image from "next/image";
import Modal from "../modal/Modal";
import LoadingProduct from "../loading/LoadingProduct";
import ChooseProductTwo from "./ChooseProductTwo";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import CompareProduct from "./CompareProduct";

export function CompareSection() {
  const [productOne, setProductOne] = useState([]);
  const [productTwo, setProductTwo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const router = useRouter();
  const productId = router.query.slug;
  useEffect(() => {
    try {
      const fetchPublic = async () => {
        const dataProduct = await productApi.getProductById(productId);
        setProductOne(dataProduct);
      };
      fetchPublic();
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);
  useEffect(() => {
    if (!openModal) return;
    try {
      const getAllProduct = async () => {
        const result = await productApi.getAllProducts();

        setProductList(
          result.filter((product) => product._id !== productId[0])
        );
      };
      getAllProduct();
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [openModal]);
  const handelGetProductDetailsTwo = async (id) => {
    setIsLoading(true);
    setOpenModal(false);
    try {
      const result = await productApi.getProductById(id);
      setProductTwo(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDelete = () => {
    setProductTwo([]);
    setIsLoading(false);
    setOpenModal(false);
  };
  return (
    <Container>
      <div className="mx-4 md:mx-0">
        <h1 className="text-center text-3xl pb-5">
          Compare product <b>{productOne?.shoeDetail?.name}</b> with product
          <span>{openModal ? <b> Product 2</b> : " ?"}</span>
        </h1>
        <div className="grid grid-cols-9 shadow-product-line">
          <div className="col-span-1 font-bold border-[1px] border-solid">
            <div className="h-10 "></div>
            <div className="h-72 flex-center border-[1px] border-solid border-r-0 ">
              Image
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0 ">
              Name
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Price
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Amount
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Color
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Size
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Description
            </div>
            <div className="h-20 border-[1px] border-solid flex-center border-r-0">
              Brand
            </div>
          </div>
          <CompareProduct product={productOne} />
          {/* <div className="flex flex-col items-start">
            <div className="py-3">
              <div className="mb-2 font-bold">Product Name</div>
              <div>{productOne?.shoeDetail?.name}</div>
            </div>
            <div className="py-3">
              <div className="mb-2 font-bold w-fit">Product Image</div>
              <div className="w-80">
                <Image
                  src={`http://localhost:3010/upload/${productOne?.shoeDetail?.arrayImage[0]?.filename}`}
                  alt="image product"
                  objectFit="cover"
                  layout="responsive"
                  width={500}
                  height={500}
                  priority={true}
                />
              </div>
            </div>
            <div className="py-3">
              <div className="border-b-2 mb-2 font-bold">Product Price</div>
              <div>${parseFloat(productOne?.shoeDetail?.price).toFixed(2)}</div>
            </div>
          </div> */}
          {!openModal && !isLoading && productTwo.length === 0 ? (
            <div className="col-span-4 content-center grid">
              <div className="flex-center">
                <div
                  className="bg-primary rounded-full cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  <HiPlus className="w-10 h-10" />
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingPage />
            </div>
          ) : (
            <CompareProduct
              product={productTwo}
              onDelete={() => handleDelete()}
              isDelete={true}
            />
          )}
        </div>
      </div>
      <Modal isVisible={openModal} onClose={() => setOpenModal(false)}>
        {productList.length === 0 ? (
          <div className="w-full flex gap-10 pb-10 flex-wrap">
            <LoadingProduct numberOfCards={8} />
          </div>
        ) : (
          <ChooseProductTwo
            data={productList}
            itemsPerPage={9}
            getIdProduct={(id) => handelGetProductDetailsTwo(id)}
          />
        )}
      </Modal>
    </Container>
  );
}
