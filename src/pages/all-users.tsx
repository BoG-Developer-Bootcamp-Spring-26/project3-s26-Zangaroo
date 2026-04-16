"use client";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import UserCard from "@/component/user_card";
import ProgressBar from "@/component/progressbar";


export default function AllUsersPage() {
    type User = {
    _id: string;
    fullName: string;
    isAdmin: boolean;
};
    const [users, setUsers] = useState<User[]>([]);
    // Search bar state for filtering users by full name
    const [search, setSearch] = useState("");
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

    // Search filtering is applied before rendering the user cards
    const query = search.trim().toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(query)
    );

    return (
        <div className="flex min-h-screen w-full flex-col">
            <ProgressBar
              showSearch={true}
              searchValue={search}
              onSearchChange={setSearch}
            />
            <div className="flex flex-1 flex-col md:flex-row">
                <aside className="shrink-0 md:w-72">
                    <Sidebar />
                </aside>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                     <div className="mb-6 flex items-center justify-between border-b border-gray-200 px-2 py-3 sm:mb-8 sm:py-4">
                        <h2 className="px-2 py-1 font-heebo text-2xl font-medium leading-none tracking-[-0.025em] text-neutral-700 sm:text-[30px]">
                            All users
                        </h2>
                    </div>
                
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredUsers.map((user) => (
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
