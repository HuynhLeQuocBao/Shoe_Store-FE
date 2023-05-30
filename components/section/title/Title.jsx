/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/common/index";

export function Title({ ...props }) {
  return (
    <Container>
      <div className="mx-4 md:mx-0 font-Rokkitt text-4xl font-bold text-center py-24">
        <h2>{props.onTitle}</h2>
      </div>
    </Container>
  );
}
