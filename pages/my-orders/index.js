import { orderApi } from "@/apiClient/order";
import { MyOrders } from "@/components/section/myOrder/MyOrders";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { setToken } from "@/apiClient/axiosClient";

export default function MyOrderPage({ orderList }) {
  return (
    <div>
      <MyOrders orderList={orderList} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    setToken(session?.accessToken);
    const data = await orderApi.getAllOrder();
    return {
      props: {
        orderList: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orderList: [],
      },
    };
  }
};
