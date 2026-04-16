"use client";
import { useState } from "react";
import { AnimalCard } from "../component/animal_card";
import { Animal } from "../types/animal";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import Link from "next/link";
import ProgressBar from "@/component/progressbar";

async function getAnimals(): Promise<Animal[]> {
    try {
        const ownerId = localStorage.getItem("userId");
        if (!ownerId) {
            return [];
        }
        
        const res = await fetch(`/api/animal?ownerId=${ownerId}`, {
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
      <ProgressBar />

      <div className="flex flex-1 min-h-0">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        <main className="flex-1 min-w-0 p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 px-2 py-3 sm:mb-8 sm:py-4">
            <h2 className="font-heebo text-2xl font-medium leading-none tracking-[-0.025em] text-neutral-700 sm:text-3xl">
              Animals
            </h2>

            <Link href="/create_new_animal">
              <button className="group flex items-center gap-2 font-heebo text-base font-medium leading-none tracking-[-0.025em] text-neutral-500 transition-all hover:text-neutral-900 sm:text-lg lg:text-[22px]">
                <img src="/images/createNewLogo.png" alt="Create new animal" />
                <span>Create new</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal._id.toString()} animal={animal} compact />
            ))}
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
