import { useState } from "react";
import { useCustomersList } from "../hooks/useCustomersList";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { SearchInput } from "../components/common/SearchInput";
import { Pagination } from "../components/common/Pagination";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";
import { TableSkeleton } from "../components/ui/TableSkeleton";
import { Card } from "../components/ui/Card";
import { formatDateDisplay } from "../utils/formatters";
import { Users, Mail, MapPin } from "lucide-react";

export default function CustomersPage() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const search = useDebouncedValue(searchInput, 400);

  // Reset to page 1 when search query changes
  const [lastKey, setLastKey] = useState("");
  const key = `${search}`;
  if (key !== lastKey) {
    setLastKey(key);
    if (page !== 1) setPage(1);
  }

  const { customers, pagination, loading, error, refetch } = useCustomersList({
    search,
    page,
    limit,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Customers & Consumers
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and search all registered customers and client locations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Users size={16} className="text-brand-600 dark:text-brand-400" />
          <span>
            {pagination.total > 0 ? `${pagination.total} registered users` : "0 users"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search by customer name or email…"
          ariaLabel="Search customers"
        />
      </div>

      <Card>
        {loading ? (
          <TableSkeleton rows={10} columns={4} />
        ) : error ? (
          <ErrorState title="Unable to load customers" message={error} onRetry={refetch} />
        ) : customers.length === 0 ? (
          <EmptyState message="No customers found. Try a different search term." />
        ) : (
          <>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Location</th>
                    <th className="px-5 py-3 font-medium text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {customers.map((c) => {
                    const initials = c.name
                      ? c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "U";

                    return (
                      <tr
                        key={c._id || c.email}
                        className="transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                              {initials}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                            <Mail size={14} className="shrink-0 text-slate-400" />
                            {c.email}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                            <MapPin size={14} className="shrink-0 text-slate-400" />
                            {c.city}, {c.country}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right text-xs text-slate-500 dark:text-slate-400">
                          {formatDateDisplay(c.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>
    </div>
  );
}
