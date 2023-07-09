import { useEffect, useState } from "react";
import {
  filterProductsByBrand,
  filterProductsBySubCategory,
} from "../redux/slices/products";
import { useDispatch } from "react-redux";

export default function useFilterProducts() {
  const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLines, setSelectedLines] = useState<string[]>([]);

  useEffect(() => {
    dispatch(filterProductsByBrand(selectedBrands));
  }, [selectedBrands]);
  useEffect(() => {
    dispatch(filterProductsBySubCategory(selectedLines));
  }, [, selectedLines]);

  return { selectedBrands, setSelectedBrands, setSelectedLines, selectedLines };
}
