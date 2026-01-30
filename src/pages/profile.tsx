import { Layout } from '@/components/layout/layout';
import { useProfile } from '@/hooks/use-auth';
import { Mail, User, Shield, Key } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';

export default function ProfilePage() {
  const authState = useAuthStore((state) => state);
  const { data: user, isLoading, isError } = useProfile();

  if (!authState.user && isLoading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  if (isError || (!user && !authState)) {
    return (
      <Layout>
        <div className="text-red-500">Failed to load profile.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500 mt-1">Manage your profile</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-500 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
                <img
                  src={user?.image || authState.user?.image}
                  alt={user?.username || authState.user?.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-slate-500">@{user?.username || authState.user?.username}</p>
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
                    <div className="bg-white p-2 rounded-lg text-primary shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <p className="font-medium text-slate-900">
                        {user?.email || authState.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-primary shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Gender</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {user?.gender || authState.user?.gender}
                      </p>
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
                    <div className="bg-white p-2 rounded-lg text-amber-500 shadow-sm">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">User ID</p>
                      <p className="font-medium text-slate-900">
                        #{user?.id || authState.user?.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-emerald-500 shadow-sm">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Access Token Status</p>
                      <p className="font-medium text-emerald-600">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
