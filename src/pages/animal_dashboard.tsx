"use client";
import { useState } from "react";
import { AnimalCard } from "./animal_card";
import { Animal } from "../types/animal";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";

async function getAnimals(): Promise<Animal[]> {
    try {
        const res = await fetch("/api/animal", {
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
        <div className="relative flex min-h-screen flex-col">
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
                        <h2 className="text-xl font-semibold text-neutral-700">
                            Animals
                        </h2>

                        <button
                            className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-all group"
                            onClick={() => alert("Create Modal Logic Goes Here")}
                        >
                            <img src="/images/createNewLogo.png"/>
                            <span>Create new</span>
                        </button>
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