export default function ProfileInfo({ user }: { user: any }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-slate-500">@{user.username}</p>
      </div>
    </div>
  );
}
