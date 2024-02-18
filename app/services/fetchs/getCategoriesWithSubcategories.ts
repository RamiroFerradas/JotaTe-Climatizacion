"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../../constants";

export async function getCategoriesWithSubcategories() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("category,subcategory");

    if (error) {
      throw error;
    }

    const categoriesWithSubcategories = {};

    data.forEach((product) => {
      const { category, subcategory } = product;

      if (!categoriesWithSubcategories[category]) {
        categoriesWithSubcategories[category] = { options: [] };
      }

      if (
        subcategory &&
        !categoriesWithSubcategories[category].options.includes(subcategory)
      ) {
        categoriesWithSubcategories[category].options.push(subcategory);
      }
    });

    // Ordenar las subcategorías alfabéticamente
    Object.keys(categoriesWithSubcategories).forEach((category) => {
      categoriesWithSubcategories[category].options.sort();
    });

    // Convertir el objeto a un array si es necesario
    const resultArray = Object.keys(categoriesWithSubcategories).map(
      (category) => ({
        category,
        options: categoriesWithSubcategories[category].options,
      })
    );

    // Ordenar el array final por categoría
    resultArray.sort((a, b) => a.category.localeCompare(b.category));

    return resultArray;
  } catch (error) {
    console.error(
      "Error al obtener categorías con subcategorías:",
      error.message
    );
    return [];
  }
}
