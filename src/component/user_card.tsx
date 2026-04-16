type UserCardProps = {
  fullName: string;
  isAdmin: boolean;
};

export default function UserCard({ fullName, isAdmin }: UserCardProps) {
  const initial = fullName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="h-full w-full rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold text-white">
          {initial}
        </div>

        <div className="min-w-0">
          <div className="truncate font-bold text-gray-900">{fullName}</div>
          <div className="text-xs text-gray-500">{isAdmin ? "Admin" : "User"}</div>
        </div>
      </div>
    </div>
  );
}
