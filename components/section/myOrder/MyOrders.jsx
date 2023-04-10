import { Container } from "@/components/common";
import { ListOrders } from "./ListOrders";

export function MyOrders({ orderList }) {
  return (
    <Container>
      <ListOrders orderList={orderList} />
    </Container>
  );
}
