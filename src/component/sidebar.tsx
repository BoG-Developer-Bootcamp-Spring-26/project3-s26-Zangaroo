import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();

    const isTrainingLogsActive = router.pathname === "/training-logs";
    const isAnimalsActive = router.pathname === "/animals";
    const isAllTrainingActive = router.pathname === "/all-training";
    const isAllAnimalsActive = router.pathname === "/all-animals";
    const isAllUsersActive = router.pathname === "/all-users";

    return (
        <div>
            <div id="public-view">
                <Link href="/training-logs" className = {`flex items-center gap-4 ${isTrainingLogsActive ? "text-white font-semibold" : "text-gray-600"}`}>
                    <img src={isTrainingLogsActive ? "/images/activeTrainingLogo.png" : "/images/inactiveTrainingLogo.png"} alt="Training Logs icon"/>
                    <span>Training Logs</span>
                </Link>
                <Link href="/animals" className = {`flex items-center gap-4 ${isAnimalsActive ? "text-white font-semibold" : "text-gray-600"}`}>
                    <img src={isAnimalsActive ? "/images/activeAnimalsLogo.png" : "/images/inactiveAnimalsLogo.png"} alt="Animals icon"/>
                    <span>Animals</span>
                </Link>
            </div>
            <div id="admin-view">
                <Link href="/all-training" className = {`flex items-center gap-4 ${isAllTrainingActive ? "text-white font-semibold" : "text-gray-600"}`} >
                    <img src= {isAllTrainingActive ? "/images/activeAllTrainingLogo.png" : "/images/inactiveAllTrainingLogo.png"} alt="All Training Logs icon"/>
                    <span>All training</span>
                </Link>
                <Link
                    href="/all-animals"
                    className={`flex items-center gap-4 ${
                        isAllAnimalsActive ? "text-white font-semibold" : "text-gray-600"
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
                    className={`flex items-center gap-4 ${
                        isAllUsersActive ? "text-white font-semibold" : "text-gray-600"
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