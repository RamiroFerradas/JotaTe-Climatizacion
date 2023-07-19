import { useEffect, useState } from "react";
import { Product } from "../models";
import useProductList from "./useProductList";

type Props = { selectedProduct: Product };
export default function useConditionProducts({ selectedProduct }: Props) {
  const { loading, allProducts } = useProductList();

  const [conditionProduct, setConditionProduct] = useState<{
    text: string;
    products: Product[];
  }>({
    text: "",
    products: [],
  });

  const isSalamandra =
    selectedProduct?.category === "Salamandras" &&
    selectedProduct?.subcategory !== "Kits de combustion";
  const isFogonero = selectedProduct?.name.includes("Fogonero");
  const kitsCombustion = allProducts.filter(
    (p) => p.subcategory === "Kits de combustion"
  );

  const isChulengon = selectedProduct?.name.includes("Chulengo");
  const isBalconera = selectedProduct?.name.includes("Balconera");
  const isHornito = selectedProduct?.name.includes("Hornito");
  const isDisco = selectedProduct?.name.includes("Disco");

  const estacas = allProducts.filter((p) => p.name === "Estaca Asaparri");
  const braseros = allProducts.filter(
    (p) =>
      p.name.includes("Brasero colgante") || p.name.includes("Brasero de pie")
  );
  const ruedas = allProducts.filter((p) => p.name.includes("Kit ruedas"));
  const baseS = allProducts.filter((p) => p.name.includes("Base ¨S¨"));

  var optionalText: string | undefined;
  var optionalProducts: Product[] = [];

  if (isSalamandra) {
    optionalText =
      "¡Este producto requiere un kit de combustión, te mostramos alunas de nuestras opciones! ";
    optionalProducts = kitsCombustion;
  } else if (isFogonero) {
    optionalText =
      "¡Este producto requiere una estaca, te mostramos alunas de nuestras opciones!";
    optionalProducts = estacas;
  } else if (isChulengon) {
    optionalText = "¡Agrega tambien alguna de estas opciones!";
    optionalProducts = [
      ...braseros,
      ...ruedas,
      ...filterProductsByFundaName("chulengon"),
    ];
  } else if (isHornito) {
    optionalText = "¡Agrega tambien alguna de estas opciones!";
    optionalProducts = [...baseS, ...filterProductsByFundaName("hornito")];
  } else if (isDisco) {
    optionalText = "¡Agrega tambien alguna de estas opciones!";
    optionalProducts = [...baseS];
  } else if (isBalconera) {
    optionalText = "¡Agrega tambien alguna de estas opciones!";
    optionalProducts = [...filterProductsByFundaName("balconera / fogonero")];
  }

  function filterProductsByFundaName(fundaName: string) {
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes("funda") &&
        product.name.toLowerCase().includes(fundaName.toLowerCase())
    );
    return filteredProducts;
  }

  useEffect(() => {
    setConditionProduct({
      text: optionalText || "",
      products: optionalProducts,
    });
  }, [selectedProduct]);

  return { conditionProduct, isSalamandra };
}
