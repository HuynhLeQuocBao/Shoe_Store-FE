import { productApi } from "@/apiClient/product";
import { ProductDetail } from "@/components/section/product";
import { Breadcrumbs } from "@/components/section/title";

export default function productDetailPage({ product }) {
  return (
    <div>
      <Breadcrumbs />
      <ProductDetail data={product} />
    </div>
  );
}

export async function getStaticPaths() {
  const products = await productApi.getAllProducts();

  // Tạo paths cho mỗi ID sản phẩm
  const paths = products.map((product) => ({
    params: { slug: [product._id] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productId = params.slug;
  const product = await productApi.getProductById(productId[0]);

  return {
    props: {
      product,
    },
  };
}
