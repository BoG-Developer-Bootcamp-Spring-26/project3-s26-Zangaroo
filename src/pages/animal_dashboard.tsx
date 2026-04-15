"use client";
import { useState } from "react";
import { AnimalCard } from "../component/animal_card";
import { Animal } from "../types/animal";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import Link from "next/link"; 

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

    useEffect(() => {
        getAnimals().then(setAnimals);
    }, []);

    return (
        <div className=" w-full relative flex min-h-screen flex-col ">
            <div>
                <header className="flex items-center gap-3 border-b border-gray-300 px-10 py-6 shadow-md">
                    <img src="/images/appLogo.png"/>
                    <h1 className="text-5xl font-medium text-black font-oswald">Progress</h1>
                </header>
            </div>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="border-l border-gray-300">
                    <Sidebar/>
                </aside>

                <main className="flex-1 p-8">
                    {/* Animals header and create new button */}
                    <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200 mb-8">
                        <h2 className="font-heebo text-[30px] font-medium leading-none tracking-[-0.025em] text-neutral-700">
                            Animals
                        </h2>

                        <Link href="/create_new_animal">
                            <button className="flex items-center gap-2 font-heebo text-[22px] font-medium leading-none tracking-[-0.025em] text-neutral-500 hover:text-neutral-900 transition-all group">

                                <img src="/images/createNewLogo.png"/>
                                <span>Create new</span>
                            </button>
                        </Link>
                    </div>
                    
                    {/* Animal's card display */}
                    <div className="grid grid-cols-3 gap-6">
                        {animals.map((animal) => (
                            <AnimalCard key={animal._id.toString()} animal={animal}/>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}