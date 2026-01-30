export default function ProfileCover({ user }: { user: any }) {
  return (
    <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-500 relative">
      <div className="absolute -bottom-16 left-8">
        <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
          <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
