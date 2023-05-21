/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";
import { useRouter } from "next/router";
import Link from "next/link";
export function Breadcrumbs() {
  const router = useRouter();
  const navigation = [
    {
      name: "Men",
      href: "/shoes-for-men",
    },
    {
      name: "Women",
      href: "/shoes-for-women",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Product Detail",
      href: "/product-detail/[...slug]",
    },
    {
      name: "Shopping Cart",
      href: "/shopping-cart",
    },
    {
      name: "Checkout",
      href: "/checkout",
    },
    {
      name: "Order Complete",
      href: "/order-complete",
    },
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Register",
      href: "/register",
    },
    {
      name: "Compare",
      href: "/compare/[...slug]",
    },
  ];
  return (
    <Container>
      <div className="py-8 mx-4 md:mx-0 text-base font-Rokkitt text-teal-600">
        <Link href="/">
          <div className="cursor-pointer uppercase max-w-fit">
            Home /
            {navigation.map((item) => {
              if (router.pathname === item.href) {
                return (
                  <span key={item.name} className="text-black ml-1">
                    {item.name}
                  </span>
                );
              }
            })}
          </div>
        </Link>
      </div>
    </Container>
  );
}
