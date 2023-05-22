import { orderApi } from "@/apiClient/order";
import { MyOrders } from "@/components/section/myOrder/MyOrders";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { setToken } from "@/apiClient/axiosClient";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MyOrderPage({ orderList, session }) {
  const router = useRouter();
  useEffect(() => {
    if (!session) router.push("/login");
  }, [session]);
  return (
    <div>
      <MyOrders orderList={orderList} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  try {
    setToken(session?.accessToken);
    const data = await orderApi.getAllOrder();
    return {
      props: {
        orderList: data,
        session,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orderList: [],
        session,
      },
    };
  }
};
