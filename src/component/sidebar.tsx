import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/AuthContext";

export default function Sidebar() {
  const router = useRouter();

  const isTrainingLogsActive = router.pathname === "/training-logs";
  const isAnimalsActive = router.pathname === "/animal_dashboard";
  const isAllTrainingActive = router.pathname === "/all-training";
  const isAllAnimalsActive = router.pathname === "/all_animals";
  const isAllUsersActive = router.pathname === "/all-users";
  const isCreateTrainingLogsActive = router.pathname === "/create_training-log";
  const { user, logout } = useAuth();
  

  const publicLinks = [
    {
      href: "/training-logs",
      active: isTrainingLogsActive || isCreateTrainingLogsActive,
      activeIcon: "/images/activeTrainingLogo.png",
      inactiveIcon: "/images/inactiveTrainingLogs.png",
      alt: "Training Logs icon",
      label: "Training Logs",
    },
    {
      href: "/animal_dashboard",
      active: isAnimalsActive,
      activeIcon: "/images/activeAnimalsLogo.png",
      inactiveIcon: "/images/inactiveAnimalLogo.png",
      alt: "Animals icon",
      label: "Animals",
    },
  ];

  const adminLinks = [
    {
      href: "/all-training",
      active: isAllTrainingActive,
      activeIcon: "/images/activeAllTrainingLogo.png",
      inactiveIcon: "/images/inactiveAllTrainingLogo.png",
      alt: "All Training Logs icon",
      label: "All training",
    },
    {
      href: "/all_animals",
      active: isAllAnimalsActive,
      activeIcon: "/images/activeAllAnimalsLogo.png",
      inactiveIcon: "/images/inactiveAllAnimalsLogo.png",
      alt: "All Animals icon",
      label: "All Animals",
    },
    {
      href: "/all-users",
      active: isAllUsersActive,
      activeIcon: "/images/activeAllUsersLogo.png",
      inactiveIcon: "/images/inactiveAllUsersLogo.png",
      alt: "All Users icon",
      label: "All Users",
    },
  ];

  const renderLink = (
    href: string,
    active: boolean,
    activeIcon: string,
    inactiveIcon: string,
    alt: string,
    label: string
  ) => (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors sm:text-base ${
        active ? "bg-[#D21312] font-semibold text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <img
        src={active ? activeIcon : inactiveIcon}
        alt={alt}
        className="h-5 w-5 shrink-0 object-contain"
      />
      <span className="truncate">{label}</span>
    </Link>
  );

  return (
    <div className="border-b border-gray-200 bg-white md:flex md:h-full md:w-72 md:flex-col md:border-b-0 md:border-r md:border-gray-300">
      <div className="flex items-center justify-between gap-3 px-4 py-4 md:hidden">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-neutral-800">Zangaroo</p>
          {user && (
            <p className="truncate text-sm text-gray-500">
              {user.fullName} · {user.isAdmin ? "Admin" : "User"}
            </p>
          )}
        </div>

        {user && (
          <Link href="/" className="shrink-0">
            <img
              src="/images/logoutLogo.png"
              alt="Logout icon"
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                logout();
              }}
            />
          </Link>
        )}
      </div>

      <div className="overflow-x-auto px-4 pb-4 md:flex-1 md:px-4 md:py-4">
        <div className="flex gap-3 md:flex-col md:gap-4">
          {publicLinks.map((link) =>
            renderLink(
              link.href,
              link.active,
              link.activeIcon,
              link.inactiveIcon,
              link.alt,
              link.label
            )
          )}
        </div>

        {user?.isAdmin && (
          <div className="mt-4 border-t border-gray-200 pt-4 md:mt-8 md:pt-6">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 md:px-4">
              Admin Access
            </p>
            <div className="mt-3 flex gap-3 md:flex-col md:gap-4">
              {adminLinks.map((link) =>
                renderLink(
                  link.href,
                  link.active,
                  link.activeIcon,
                  link.inactiveIcon,
                  link.alt,
                  link.label
                )
              )}
            </div>
          </div>
        )}
      </div>

      {user && (
        <div
          id="profileSection"
          className="hidden items-center gap-x-4 border-t border-gray-300 px-4 py-5 md:mt-4 md:flex"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
            <span className="text-lg font-bold text-white">
              {user.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div id="profileInfo" className="min-w-0">
            <p className="truncate font-semibold">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.isAdmin ? "Admin" : "User"}</p>
          </div>
          <Link href="/" className="ml-auto shrink-0">
            <img
              src="/images/logoutLogo.png"
              alt="Logout icon"
              className="h-6 w-6 cursor-pointer"
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
