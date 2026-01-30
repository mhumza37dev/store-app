export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-8 w-32 rounded bg-slate-200" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="space-y-4">
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden border border-slate-100" />
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-slate-200 rounded-xl" />
            <div className="aspect-square bg-slate-200 rounded-xl" />
            <div className="aspect-square bg-slate-200 rounded-xl" />
            <div className="aspect-square bg-slate-200 rounded-xl" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 rounded bg-slate-200" />
              <div className="h-6 w-24 rounded bg-slate-200" />
            </div>
            <div className="h-10 w-3/4 rounded bg-slate-200" />
            <div className="flex items-center gap-4 pt-2">
              <div className="h-8 w-20 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="flex items-end gap-4">
            <div className="h-10 w-28 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded bg-slate-200" />
            <div className="h-6 w-12 rounded bg-slate-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-slate-50">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-36 rounded bg-slate-200" />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <div className="h-12 flex-1 rounded bg-slate-200" />
            <div className="h-12 w-12 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
