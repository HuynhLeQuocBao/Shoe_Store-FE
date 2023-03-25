import { Title } from '@/components/section/title/index';
import { Gender } from '@/components/section/type/index';
import { BestSeller } from '@/components/section/product/index';

import React from 'react';
import { Banner } from '@/components/section/banner';


export default function Index() {
  return (
    <>
      <Banner />
      <Gender />
      <BestSeller />
    </>
  )
}




