import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../models/Product";
import { addBrands, addBrandsFiltered } from "../redux/slices/brands";
import { Brand } from "../models";
import { AppStore } from "../redux/store";

export default function useListBrands() {
  const dispatch = useDispatch();

  const { allProducts, filteredProducts, subCategoryActive } = useSelector(
    (state: AppStore) => state.products
  );

  const { allBrands, brandsFiltered } = useSelector(
    (state: AppStore) => state.brands
  );

  useEffect(() => {
    const listBrands = new Set(allProducts.map((prod: Product) => prod.brand));
    const brands = Array.from(listBrands).map((brand) => ({ label: brand }));

    dispatch(addBrands(brands));
  }, [allProducts]);

  useEffect(() => {
    const listBrandsFiltered = new Set(
      allProducts
        .filter((product) => product.subcategory.includes(subCategoryActive))
        .map((prod: Product) => prod.brand)
    );

    const brandsFiltered = Array.from(listBrandsFiltered).map((brand) => ({
      label: brand,
    }));

    dispatch(
      addBrandsFiltered(
        subCategoryActive !== "Todos" ? brandsFiltered : allBrands
      )
    );
  }, [filteredProducts]);

  return { allBrands, brandsFiltered };
}
