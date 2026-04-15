"use client";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import Link from "next/link"; 
import UserCard from "@/component/user_card";


export default function AllUsersPage() {
    type User = {
    _id: string;
    fullName: string;
    isAdmin: boolean;
};
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();

        if (data.success) {
          setUsers(data.users); 
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);
    

    return (
        <div className="w-full flex min-h-screen flex-col">
            
            <header className="flex items-center gap-3 border-b border-gray-300 px-10 py-6 shadow-md">
                <img src="/images/appLogo.png" />
                <h1 className="text-5xl font-medium text-black font-oswald">
                    Progress
                </h1>
            </header>
            <div className="flex flex-1">
                <aside className="border-r border-gray-300">
                    <Sidebar />
                </aside>

                <main className = "flex-1 p-8">
                     <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200 mb-8">
                        <h2 className="font-heebo text-[30px] font-medium leading-none tracking-[-0.025em] text-neutral-700">
                            All users
                        </h2>
                        </div>
                
                    <div className="flex flex-wrap gap-3 content-start p-6 w-full">
                        {users.map((user) => (
                        <UserCard
                            key={user._id}
                            fullName={user.fullName}
                            isAdmin={user.isAdmin}
                        />
                        ))}
                    </div>
                </main>

            </div>
        </div>
);
}