import ContactInfoCard from '@/components/profile/profile-contact-card';
import ProfileCover from '@/components/profile/profile-cover';
import ProfileInfo from '@/components/profile/profile-info';
import SecurityCard from '@/components/profile/profile-security-card';

export default function ProfileCard({ user }: { user: any }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <ProfileCover user={user} />

      <div className="pt-20 px-8 pb-8">
        <ProfileInfo user={user} />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <ContactInfoCard user={user} />
          <SecurityCard user={user} />
        </div>
      </div>
    </div>
  );
}
