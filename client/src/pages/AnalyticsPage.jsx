import { FilterBar } from "../components/dashboard/FilterBar";
import { StatCardsGrid } from "../components/dashboard/StatCardsGrid";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { OrdersChart } from "../components/dashboard/OrdersChart";
import { CategoryChart } from "../components/dashboard/CategoryChart";
import { OrderStatusChart } from "../components/dashboard/OrderStatusChart";
import { TopProductsTable } from "../components/dashboard/TopProductsTable";
import { SectionErrorBoundary } from "../components/common/SectionErrorBoundary";
import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <BarChart3 className="text-brand-600 dark:text-brand-400" size={22} />
            Analytics & Insights
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Comprehensive business intelligence, revenue trends, product rankings, and order breakdowns.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          <TrendingUp size={14} />
          <span>Real-time aggregations</span>
        </div>
      </div>

      <FilterBar />

      <SectionErrorBoundary label="key metrics">
        <StatCardsGrid />
      </SectionErrorBoundary>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionErrorBoundary label="revenue trends">
          <RevenueChart />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="order volume">
          <OrdersChart />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="category performance">
          <CategoryChart />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="order status distribution">
          <OrderStatusChart />
        </SectionErrorBoundary>
      </div>

      <SectionErrorBoundary label="top products">
        <TopProductsTable />
      </SectionErrorBoundary>
    </div>
  );
}
