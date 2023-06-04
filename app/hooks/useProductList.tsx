import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../models/Product";
import { useDispatch } from "react-redux";
import { addProducts, filterProductsByBrand } from "../redux/slices/products";
import { useSelector } from "react-redux";

export default function useProductList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { filteredProducts } = useSelector(
    (state: { products: Product[] }) => ({ filteredProducts: state.products })
  );

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        dispatch(addProducts(productsData));
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
  };
}
