import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();

    const isTrainingLogsActive = router.pathname === "/training-logs";
    const isAnimalsActive = router.pathname === "/animal_dashboard";
    const isAllTrainingActive = router.pathname === "/all-training";
    const isAllAnimalsActive = router.pathname === "/all-animals";
    const isAllUsersActive = router.pathname === "/all-users";

    return (
        <div className="max-w-84 m-5">
            <div id="public-view" className="flex flex-col gap-4 gap-4">
                <Link href="/training-logs" className = {`flex items-center gap-4 px-4 py-3 rounded-xl  ${isTrainingLogsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}>
                    <img src={isTrainingLogsActive ? "/images/activeTrainingLogo.png" : "/images/inactiveTrainingLogs.png"} alt="Training Logs icon"/>
                    <span>Training Logs</span>
                </Link>
                <Link href="/animal_dashboard" className = {`flex items-center gap-4 px-4 py-3 rounded-xl ${isAnimalsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`}>
                    <img src={isAnimalsActive ? "/images/activeAnimalsLogo.png" : "/images/inactiveAnimalLogo.png"} alt="Animals icon"/>
                    <span>Animals</span>
                </Link>
            </div>
            <div id="admin-view" className="flex flex-col gap-4 gap-4">
                <p className="mt-8 mb-2">Admin Access</p>
                <Link href="/all-training" className = {`flex items-center gap-4 px-4 py-3 rounded-xl ${isAllTrainingActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"}`} >
                    <img src= {isAllTrainingActive ? "/images/activeAllTrainingLogo.png" : "/images/inactiveAllTrainingLogo.png"} alt="All Training Logs icon"/>
                    <span>All training</span>
                </Link>
                <Link
                    href="/all-animals"
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl ${
                        isAllAnimalsActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"
                    }`}
                >
                    <img
                        src={
                            isAllAnimalsActive
                                ? "/images/activeAllAnimalsLogo.png"
                                : "/images/inactiveAllAnimalsLogo.png"
                        }
                        alt="All Animals icon"
                    />
                    <span>All Animals</span>
                </Link>

                <Link
                    href="/all-users"
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl ${
                        isAllUsersActive ? "bg-[#D21312] text-white font-semibold" : "text-gray-600"
                    }`}
                >
                    <img
                        src={
                            isAllUsersActive
                                ? "/images/activeAllUsersLogo.png"
                                : "/images/inactiveAllUsersLogo.png"
                        }
                        alt="All Users icon"
                    />
                    <span>All Users</span>
                </Link>
            </div>
        </div>
    )
}