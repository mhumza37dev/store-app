import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/use-auth';
import { loginSchema, type LoginCredentials } from '@/types/login-types';
import useToast from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Label from '@/components/ui/label';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function LoginPage() {
  const { toast } = useToast();
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '', // emilys
      password: '', // emilyspass
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    mutate(data, {
      onError: (error) => {
        toast({
          title: 'Login Failed',
          description: error.message,
        });
      },
    });
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-in">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-4xl font-display font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">Enter your credentials to access your store dashboard.</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username (e.g., emilys)"
                {...form.register('username')}
                disabled={isPending}
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...form.register('password')}
                disabled={isPending}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full py-3 text-base" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-slate-900 z-10" />
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-200 h-200 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-20 p-12 text-white max-w-xl">
          <h2 className="text-5xl font-display font-bold mb-6 leading-tight">
            Any thing can be shown as banner or visuals
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}
