import { useProfile } from '@/hooks/use-auth';
import ErrorMessage from '@/components/ui/error-message';
import { useAuthStore } from '@/store/auth-store';
import ProfileSkeleton from '@/components/skeleton-loader/profile';
import ProfileHeader from '@/components/profile/profile-header';
import ProfileCard from '@/components/profile/profile-card';

export default function ProfilePage() {
  const authState = useAuthStore((state) => state);
  const { data: user, isLoading, isError } = useProfile();

  const profileUser = user ?? authState.user;

  if (!profileUser && isLoading) return <ProfileSkeleton />;
  if (isError || !profileUser) return <ErrorMessage msg="Failed to load profile." />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProfileHeader />
      <ProfileCard user={profileUser} />
    </div>
  );
}
