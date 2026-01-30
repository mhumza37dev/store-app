import { Layout } from '@/components/layout/layout';
import { useAllProductsForChart } from '@/hooks/use-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DollarSign, Package, TrendingUp } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { data, isLoading, error } = useAllProductsForChart();

  if (isLoading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">Error loading dashboard data.</div>
      </Layout>
    );
  }

  const products = data?.products || [];

  // Stats
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / products.length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  // Chart Data: Top 10 most expensive items
  const sortedByPrice = [...products].sort((a, b) => b.price - a.price).slice(0, 10);

  const chartData = {
    labels: sortedByPrice.map((p) => p.title),
    datasets: [
      {
        label: 'Price ($)',
        data: sortedByPrice.map((p) => p.price),
        backgroundColor: 'rgba(79, 70, 229, 0.8)', // Indigo 600
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Inventory</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalStock} units</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Average Price</p>
              <h3 className="text-2xl font-bold text-slate-900">${avgPrice.toFixed(2)}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Value</p>
              <h3 className="text-2xl font-bold text-slate-900">${totalValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>Top {chartData.datasets[0].data.length} Most Expensive Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-100 w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
