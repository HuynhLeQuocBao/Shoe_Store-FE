import { OrderDetail } from "@/components/section/myOrder/OrderDetail";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, React } from "react";

export default function OrderDetailPage({ session }) {
  const router = useRouter();
  useEffect(() => {
    if (!session) router.push("/login");
  }, [session]);
  return (
    <div>
      <OrderDetail />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
};
