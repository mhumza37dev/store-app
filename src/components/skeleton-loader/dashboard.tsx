import { DollarSign, Package, TrendingUp } from 'lucide-react';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 font-medium">Total Inventory</p>
            <div className="mt-2 h-6 w-28 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 font-medium">Average Price</p>
            <div className="mt-2 h-6 w-24 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 font-medium">Total Value</p>
            <div className="mt-2 h-6 w-32 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-slate-500 mb-3">Top 10 Most Expensive Products</div>
        <div className="h-100 w-full rounded-lg bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
