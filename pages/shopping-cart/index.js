import { ShoppingCart } from "@/components/section/orders";
import { Breadcrumbs } from "@/components/section/title";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function CartPage({ session }) {
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);
  return (
    <div>
      <Breadcrumbs />
      <ShoppingCart />
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
