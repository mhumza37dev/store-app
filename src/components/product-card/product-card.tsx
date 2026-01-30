import type { Product } from '@/types/product-types';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Button from '@/components/ui/button';
import { Link } from 'wouter';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="aspect-4/3 bg-slate-50 relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur text-primary font-bold shadow-sm"
          >
            ${product.price}
          </Badge>
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive" className="font-bold shadow-sm">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs text-slate-500 border-slate-200">
            {product.category}
          </Badge>
          <div className="flex items-center text-amber-400 text-xs font-medium">
            <Star className="w-3 h-3 fill-current mr-1" />
            {product.rating}
          </div>
        </div>

        <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.description}</p>

        <Link href={`/products/${product.id}`}>
          <Button className="w-full bg-primary-900 hover:bg-primary transition-colors">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
