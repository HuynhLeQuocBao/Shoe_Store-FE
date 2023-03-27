import { Container } from "@/components/common/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productApi } from "@/apiClient/product";
import { HiPlus } from "react-icons/hi2";

export function CompareSection() {
  const [data, setData] = useState([]);
  const [chooseProduct, setchooseProduct] = useState(false);

  const router = useRouter();
  const productId = router.query.slug;
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
      <div className="mx-4 md:mx-0">
        <h1 className="text-center text-3xl pb-5">
          Compare product <b>{data?.shoeDetail?.name}</b> with product
          <span>{chooseProduct ? <b> Product 2</b> : " ?"}</span>
        </h1>
        <div className="flex items-center justify-around shadow-product-line">
          <div className="flex flex-col items-start">
            <div className="py-3">
              <div className="mb-2 font-bold">Product Name</div>
              <div>{data?.shoeDetail?.name}</div>
            </div>
            <div className="py-3">
              <div className="mb-2 font-bold w-fit">Product Image</div>
              <div className="w-80">
                <img
                  src={`https://shoestore-backend-0uam.onrender.com/upload/${data?.shoeDetail?.arrayImage[0]?.filename}`}
                  alt="image product"
                />
              </div>
            </div>
            <div className="py-3">
              <div className="border-b-2 mb-2 font-bold">Product Price</div>
              <div>${parseFloat(data?.shoeDetail?.price).toFixed(2)}</div>
            </div>
          </div>
          {!chooseProduct ? (
            <div
              className="bg-primary rounded-full cursor-pointer"
              onClick={() => setchooseProduct(true)}
            >
              <HiPlus className="w-10 h-10" />
            </div>
          ) : (
            "Chưa làm"
          )}
        </div>
      </div>
    </Container>
  );
}
