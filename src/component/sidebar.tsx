import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/AuthContext";

export default function Sidebar() {
  const router = useRouter();

    const isTrainingLogsActive = router.pathname === "/training-logs";
    const isAnimalsActive = router.pathname === "/animal_dashboard";
    const isAllTrainingActive = router.pathname === "/all-training";
    const isAllAnimalsActive = router.pathname === "/all-animals";
    const isAllUsersActive = router.pathname === "/all-users";
    const isCreateTrainingLogsActive = router.pathname === "/create_training-log";
    const { user } = useAuth(); 
    const { logout } = useAuth(); 

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-300 p-4">
      <div id="public-view" className="flex flex-col gap-4">
        <Link
          href="/training-logs"
          className={`flex items-center gap-4 rounded-xl px-4 py-3 ${isTrainingLogsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}
        >
          <img
            src={isTrainingLogsActive ? "/images/activeTrainingLogo.png" : "/images/inactiveTrainingLogs.png"}
            alt="Training Logs icon"
          />
          <span>Training Logs</span>
        </Link>
        <Link
          href="/animal_dashboard"
          className={`flex items-center gap-4 rounded-xl px-4 py-3 ${isAnimalsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}
        >
          <img
            src={isAnimalsActive ? "/images/activeAnimalsLogo.png" : "/images/inactiveAnimalLogo.png"}
            alt="Animals icon"
          />
          <span>Animals</span>
        </Link>
      </div>

      {user?.isAdmin && (
        <div id="admin-view" className="mt-8 flex flex-col gap-4 border-t border-gray-300 pt-6">
          <p className="px-4">Admin Access</p>
          <Link
            href="/all-training"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 ${isAllTrainingActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}
          >
            <img
              src={isAllTrainingActive ? "/images/activeAllTrainingLogo.png" : "/images/inactiveAllTrainingLogo.png"}
              alt="All Training Logs icon"
            />
            <span>All training</span>
          </Link>
          <Link
            href="/all_animals"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 ${isAllAnimalsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}
          >
            <img
              src={isAllAnimalsActive ? "/images/activeAllAnimalsLogo.png" : "/images/inactiveAllAnimalsLogo.png"}
              alt="All Animals icon"
            />
            <span>All Animals</span>
          </Link>
          <Link
            href="/all-users"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 ${isAllUsersActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}
          >
            <img
              src={isAllUsersActive ? "/images/activeAllUsersLogo.png" : "/images/inactiveAllUsersLogo.png"}
              alt="All Users icon"
            />
            <span>All Users</span>
          </Link>
        </div>
      )}

      {user && (
        <div id="profileSection" className="mt-auto mb-6 flex flex-row items-center gap-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
            <span className="text-lg font-bold text-white">
              {user.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div id="profileInfo" className="min-w-0">
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.isAdmin ? "Admin" : "User"}</p>
          </div>
          <Link href="/" className="ml-auto">
            <img
              src="/images/logoutLogo.png"
              alt="Logout icon"
              className="cursor-pointer"
              onClick={() => {
                logout();
              }}
            />
          </Link>
        </div>
      )}
    </div>
  );
}
