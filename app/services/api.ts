import axios from "axios";
import { Product } from "../models/Product";
import Papa from "papaparse";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vT76P3wnOtsc2fwB5VdlmmoqAfSVqsbyZfSDzzM1yIvyk9Rhl-xs__ZFNkfqazMWDBo9uNhT68SJLbR/pub?output=csv`,
      {
        responseType: "blob",
      }
    );
    return new Promise<Product[]>((resolve, reject) => {
      Papa.parse(response.data, {
        header: true,
        complete: (results) => {
          console.log(results);
          resolve(results.data as Product[]);
        },
        error: (error) => reject(error.message),
      });
    });
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
