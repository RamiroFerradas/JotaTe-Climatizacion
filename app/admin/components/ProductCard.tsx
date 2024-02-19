import { Product } from "@/app/models";

type Props = { product: Product };
export default function ProductCard({ product }: Props) {
  return (
    <div className="">
      <div className="border border-black rounded-lg p-2 flex justify-between">
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
}
