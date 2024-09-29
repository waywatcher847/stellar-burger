import React, { useState, useEffect } from "react";

import { ExpectedStructure } from "./Types";
import { GetIngredientListProps } from "./Types";
import { ingredientURL } from "./Constants";

export const GetIngredientList = (
  WrappedComponent: React.ComponentType<{
    fetchedData: ExpectedStructure | null;
    loading: boolean;
    error: string | null;
  }>,
) => {
  return (props: GetIngredientListProps) => {
    const [data, setData] = useState<ExpectedStructure | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(ingredientURL);
          if (!response.ok) {
            return Promise.reject(`Ошибка ${response.status}`);
          }
          const dataThatWasPromised: ExpectedStructure = await response.json();
          setData(dataThatWasPromised);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "ошибка в запросе данных",
          );
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [ingredientURL]);

    return (
      <WrappedComponent fetchedData={data} loading={loading} error={error} />
    );
  };
};
