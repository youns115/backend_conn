import { useEffect, useState } from "react";
interface Props {
  category: string;
}
const ProductList = ({ category }: Props) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching products in", category);
    setProducts(["clothings", "houssehold"]);
  }, [category]);

  return (
    <>
      <p>test</p>
    </>
  );
};

export default ProductList;
