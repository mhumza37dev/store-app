import { ProductCard } from '@/components/product-card/product-card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useDebounceValue } from '@/hooks/use-debounce';
import { useProducts } from '@/hooks/use-products';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useState } from 'react';

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounceValue(searchTerm, 500);

  const limit = 20;
  const skip = page * limit;

  const { data, isLoading, isError } = useProducts(limit, skip, debouncedSearch);

  React.useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage your inventory and pricing.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="h-100 bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl">
          Failed to load products. Please try again.
        </div>
      ) : (
        <>
          {data?.products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500">No products found matching "{debouncedSearch}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {data && data.total > 0 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-500">
                Showing {skip + 1}-{Math.min(skip + limit, data.total)} of {data.total}
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePrev} disabled={page === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button onClick={handleNext} disabled={skip + limit >= data.total}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
