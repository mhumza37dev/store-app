import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1">Manage your profile</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-500 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="h-6 w-64 rounded bg-slate-200 animate-pulse" />
              <div className="mt-2 h-4 w-32 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="border-slate-100 shadow-none bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
                  </div>
                  <div className="w-full">
                    <div className="h-3 w-32 rounded bg-slate-200 animate-pulse" />
                    <div className="mt-2 h-4 w-56 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
                  </div>
                  <div className="w-full">
                    <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
                    <div className="mt-2 h-4 w-40 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-none bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
                  </div>
                  <div className="w-full">
                    <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
                    <div className="mt-2 h-4 w-32 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
                  </div>
                  <div className="w-full">
                    <div className="h-3 w-36 rounded bg-slate-200 animate-pulse" />
                    <div className="mt-2 h-4 w-24 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
