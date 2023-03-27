import { Container } from "@/components/common/index";
import { useRouter } from "next/router";

export function CompareSection() {
  const router = useRouter();
  const productId = router.query.slug;
  return (
    <Container>
      <div className="mx-4 md:mx-0">{productId}</div>
    </Container>
  );
}
