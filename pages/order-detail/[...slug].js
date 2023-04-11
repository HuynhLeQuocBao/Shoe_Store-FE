import { orderApi } from "@/apiClient/order";
import { OrderDetail } from "@/components/section/myOrder/OrderDetail";
import { ProductDetail } from "@/components/section/product";
import { Breadcum } from "@/components/section/title";
import React from "react";

export default function About() {
  return (
    <div>
      <OrderDetail />
    </div>
  );
}
// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const orderId = params.slug;
//   try {
//     const orderDetails = await orderApi.getOrderDetail(orderId);
//     return {
//       props: {
//         data: orderDetails,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         data: [],
//       },
//     };
//   }
// };
