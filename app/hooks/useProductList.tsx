import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { useDispatch } from "react-redux";
import { addProducts, filterProductsByBrand } from "../redux/slices/products";
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { fetchProducts } from "../services/fetchProducts";

export default function useProductList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { filteredProducts, allProducts } = useSelector(
    (state: AppStore) => state.products
  );

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setLoading(true);
        if (filteredProducts.length === 0) {
          const productsData = await fetchProducts();
          dispatch(addProducts(productsData));
        }
      } catch (error: any) {
        console.error("Error fetching product list:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductList();
  }, []);

  useEffect(() => {
    dispatch(filterProductsByBrand(selectedBrands));
  }, [selectedBrands]);

  return {
    loading,
    selectedBrands,
    setSelectedBrands,
    products: filteredProducts,
    allProducts: allProducts,
  };
}
