import { useApiData } from "./useApiData";
import { getCustomers } from "../api/customersApi";

export function useCustomersList({ search, page, limit }) {
  const { data, loading, error, refetch } = useApiData(
    () => getCustomers({ search, page, limit }),
    [search, page, limit]
  );

  return {
    customers: data?.data || [],
    pagination: data?.pagination || { page, limit, total: 0, totalPages: 0 },
    loading,
    error,
    refetch,
  };
}
