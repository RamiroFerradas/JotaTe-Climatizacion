import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../models/Product";
import { addBrands } from "../redux/slices/brands";
import { Brand } from "../models";

export default function useListBrands() {
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state: { products: Product[] }) => ({
    allProducts: state.products,
  }));

  const { allBrands } = useSelector(
    (state: { brands: { allBrands: Brand[] } }) => state.brands
  );

  useEffect(() => {
    const listBrands = new Set(allProducts.map((prod: Product) => prod.brand));
    const brands = Array.from(listBrands).map((brand) => ({ label: brand }));

    dispatch(addBrands(brands));
  }, [allProducts, dispatch]);

  return { allBrands };
}
