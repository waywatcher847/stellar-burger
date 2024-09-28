import React, { useState, useEffect } from "react";

import { expectedStructure } from "./Types";
import { getIngredientListProps } from "./Types";
import { ingredientURL } from "./Constants";

export const getIngredientList = (
  WrappedComponent: React.ComponentType<{
    fetchedData: expectedStructure | null;
    loading: boolean;
    error: string | null;
  }>,
) => {
  return (props: getIngredientListProps) => {
    const [data, setData] = useState<expectedStructure | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(ingredientURL);
          if (!response.ok) {
            setError("ошибка в запросе данных");
          }
          const dataThatWasPromised: expectedStructure = await response.json();
          setData(dataThatWasPromised);
          setLoading(false);
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
