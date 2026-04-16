"use client";
import { useState } from "react";
import { AnimalCard } from "../component/animal_card";
import { Animal } from "../types/animal";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";

async function getAnimals(): Promise<Animal[]> {
    try {
        const res = await fetch("/api/admin/animals", {
            method: "GET"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch animals");
        }
        const data = await res.json();
        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Failed to fetch animals:", error);
        return [];
    }
}

export default function Home() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    // Search bar state for filtering animals by name
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAnimals().then(setAnimals);
    }, []);

    // Search filtering is applied before rendering the animal cards
    const query = search.trim().toLowerCase();
    const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(query)
    );

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <ProgressBar
                showSearch={true}
                searchValue={search}
                onSearchChange={setSearch}
            />

            <div className="flex flex-1 flex-col md:flex-row">
                <aside className="shrink-0 md:w-72">
                    <Sidebar/>
                </aside>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 px-2 py-3 sm:mb-8 sm:py-4">
                        <h2 className="px-2 py-1 font-heebo text-2xl font-medium leading-none tracking-[-0.025em] text-neutral-700 sm:text-[30px]">
                            All Animals
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredAnimals.map((animal) => (
                            <AnimalCard key={animal._id.toString()} animal={animal} compact />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
