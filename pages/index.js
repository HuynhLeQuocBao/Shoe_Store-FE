import { Title } from "@/components/section/title/index";
import { Gender } from "@/components/section/type/index";
import { BestSeller } from "@/components/section/product/index";

import React from "react";
import { Banner } from "@/components/section/banner";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";

export default function Index() {
  return (
    <>
      <Banner />
      <Gender />
      <BestSeller />
      <MessengerCustomerChat pageId="123346977339174" appId="545750767434299" />
    </>
  );
}
