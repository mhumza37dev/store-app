import { useProduct } from '@/hooks/use-products';
import { useRoute } from 'wouter';
import Button from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, ShoppingCart, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import ProductDetailsSkeleton from '@/components/skeleton-loader/product-details';

export default function ProductDetailPage() {
  const [, params] = useRoute('/products/:id');
  const id = params?.id || '';
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <Link href="/products">
          <Button className="mt-4 underline bg-transparent cursor-pointer">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link href="/products">
        <Button className="transition-all text-slate-500 mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply p-4"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-100 cursor-pointer hover:border-primary transition-colors"
              >
                <img src={img} className="w-full h-full object-cover" alt={`View ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/80 text-primary-900 hover:bg-primary/90 border-none">
                {product.brand}
              </Badge>
              <Badge variant="outline" className="text-slate-500">
                {product.category}
              </Badge>
            </div>
            <h1 className="text-4xl font-display font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-5 h-5 text-amber-400 fill-current mr-1" />
                <span className="font-bold text-amber-700">{product.rating}</span>
              </div>
              <span className="text-slate-400 text-sm">Review rating</span>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="flex items-end gap-4">
            <span className="text-4xl font-bold text-slate-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-slate-400 line-through mb-1.5">
                ${Math.round(product.price / (1 - product.discountPercentage / 100))}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <Badge variant="destructive" className="mb-2">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <span className="text-slate-500">Stock Status</span>
              <span
                className={
                  product.stock < 10 ? 'text-red-600 font-bold' : 'text-emerald-600 font-bold'
                }
              >
                {product.stock} units available
              </span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <span className="text-slate-500">SKU</span>
              <span className="font-mono text-slate-900">PROD-{product.id}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button className="flex-1 bg-primary-900 hover:bg-primary transition-colors text-lg">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Order
            </Button>
            <Button className="px-3  bg-primary">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
