type UserCardProps = {
  fullName: string;
  isAdmin: boolean;
};

export default function UserCard({ fullName, isAdmin }: UserCardProps) {
  const initial = fullName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="bg-white rounded-xl p-4 w-64 h-20 shadow-md hover:shadow-lg transition">
      
      <div className="flex items-center gap-3">
        
        
        <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
          {initial}
        </div>

        
        <div>
          <div className="font-bold text-gray-900">
            {fullName}
          </div>

          <div className="text-xs text-gray-500">
            {isAdmin ? "Admin" : "User"}
          </div>
        </div>
      </div>
    </div>
  );
}