import { useEffect, useState } from "react";
import { getPreference } from "../services/MercadoPago/getPreference";
import { Product } from "../models";
import { PreferenceMP } from "../models/PreferenceMP";

export default function usePreferenceMP(products: Product[]): {
  preference: PreferenceMP | null;
  loading: boolean;
  error: Error | null;
} {
  const [preference, setPreference] = useState<PreferenceMP | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPreference() {
      try {
        setPreference(null);
        setLoading(true);
        const response = await getPreference(products);

        const data = await response.json();
        setPreference(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    products.length > 0 && fetchPreference();
  }, [products]);

  return { preference, loading, error };
}
