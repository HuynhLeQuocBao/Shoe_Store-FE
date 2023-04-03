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

export function CompareSection() {
  const [productOne, setProductOne] = useState([]);
  const [productTwo, setProductTwo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const router = useRouter();
  const DOMAIN_URL = "";
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
        setProductList(result);
      };
      getAllProduct();
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [openModal]);
  useEffect(() => {
    if (idProduct.length === 0) return;
    setIsLoading(true);
    setOpenModal(false);
    try {
      const getProductTwo = async () => {
        const result = await productApi.getProductById(idProduct);
        setProductTwo(result);
        setIsLoading(false);
      };
      getProductTwo();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [idProduct]);

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
        <div className="flex items-center justify-around shadow-product-line">
          <div className="flex flex-col items-start">
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
          </div>
          {!openModal && !isLoading && productTwo.length === 0 ? (
            <div
              className="bg-primary rounded-full cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <HiPlus className="w-10 h-10" />
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingPage />
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <button className="bg-red-500" onClick={handleDelete}>
                delete temp
              </button>
              <div className="py-3">
                <div className="mb-2 font-bold">Product Name</div>
                <div>{productTwo?.shoeDetail?.name}</div>
              </div>
              <div className="py-3">
                <div className="mb-2 font-bold w-fit">Product Image</div>
                <div className="w-80">
                  <Image
                    src={`http://localhost:3010/upload/${productTwo?.shoeDetail?.arrayImage[0]?.filename}`}
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
                <div>
                  ${parseFloat(productTwo?.shoeDetail?.price).toFixed(2)}
                </div>
              </div>
            </div>
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
            getIdProduct={(id) => setIdProduct(id)}
          />
        )}
      </Modal>
    </Container>
  );
}
