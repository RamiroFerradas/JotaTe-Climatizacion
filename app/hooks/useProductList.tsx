// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addProducts } from "../redux/slices/products";
// import { useSelector } from "react-redux";
// import { AppStore } from "../redux/store";
// import { fetchProducts } from "../services/fetchs/fetchProducts";

// export default function useProductList() {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

//   const { filteredProducts, allProducts, searchPerformed, subCategoryActive } =
//     useSelector((state: AppStore) => state.products);

//   useEffect(() => {
//     const fetchProductList = async () => {
//       try {
//         setLoading(true);
//         if (filteredProducts.length === 0) {
//           const productsData = await fetchProducts();
//           dispatch(addProducts(productsData));
//         }
//         setLoading(false);
//       } catch (error: any) {
//         console.error("Error fetching product list:", error.message);
//         setLoading(true);
//       }
//     };

//     fetchProductList();
//   }, []);

//   return {
//     loading,
//     selectedBrands,
//     setSelectedBrands,
//     products: filteredProducts,
//     allProducts: allProducts,
//     searchPerformed,
//     subCategoryActive,
//   };
// }
