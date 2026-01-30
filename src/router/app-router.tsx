import { Suspense, lazy } from 'react';
import ProtectedRoute from './protected-route';
import { Switch, Route, Redirect } from 'wouter';
import { PageLoader } from '@/components/page-loader/page-loader';

const LoginPage = lazy(() => import('@/pages/login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const ProductsPage = lazy(() => import('@/pages/products'));
const ProductDetailPage = lazy(() => import('@/pages/product-detail'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const NotFound = lazy(() => import('@/pages/not-found'));

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/login" component={LoginPage} />

        {/* Protected Routes */}
        <Route path="/dashboard">
          <ProtectedRoute component={DashboardPage} />
        </Route>
        <Route path="/products">
          <ProtectedRoute component={ProductsPage} />
        </Route>
        <Route path="/products/:id">
          <ProtectedRoute component={ProductDetailPage} />
        </Route>
        <Route path="/profile">
          <ProtectedRoute component={ProfilePage} />
        </Route>

        {/* Default Redirect */}
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
