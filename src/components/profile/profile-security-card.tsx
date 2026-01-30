import { Shield, Key } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SecurityCard({ user }: { user: any }) {
  return (
    <Card className="border-slate-100 shadow-none bg-slate-50/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Security
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SecurityRow icon={<Shield />} label="User ID" value={`#${user.id}`} />
        <SecurityRow
          icon={<Key />}
          label="Access Token Status"
          value="Active"
          valueClass="text-emerald-600"
        />
      </CardContent>
    </Card>
  );
}

function SecurityRow({
  icon,
  label,
  value,
  valueClass = '',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white p-2 rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`font-medium ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
