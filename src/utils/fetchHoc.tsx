import React, { useState, useEffect } from "react";

import { ExpectedStructure } from "./propTypes";
import { WithFetchProps } from "./propTypes";
import { ingredientURL } from "./Constants";

export const withFetch = (
  WrappedComponent: React.ComponentType<{
    fetchedData: ExpectedStructure | null;
    loading: boolean;
    error: string | null;
  }>,
) => {
  return (props: WithFetchProps) => {
    const [data, setData] = useState<ExpectedStructure | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(false);
        setError(null);
        try {
          const response = await fetch(ingredientURL);
          if (!response.ok) {
            throw new Error("ответ:не ок");
          }
          const dataThatWasPromised: ExpectedStructure = await response.json();
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
    });

    return (
      <WrappedComponent fetchedData={data} loading={loading} error={error} />
    );
  };
};
