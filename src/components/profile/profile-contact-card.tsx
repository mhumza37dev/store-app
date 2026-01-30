import { Mail, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ContactInfoCard({ user }: { user: any }) {
  return (
    <Card className="border-slate-100 shadow-none bg-slate-50/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Contact Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <InfoRow icon={<Mail />} label="Email Address" value={user.email} />
        <InfoRow icon={<User />} label="Gender" value={user.gender} capitalize />
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
  capitalize,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white p-2 rounded-lg text-primary shadow-sm">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`font-medium text-slate-900 ${capitalize ? 'capitalize' : ''}`}>{value}</p>
      </div>
    </div>
  );
}
