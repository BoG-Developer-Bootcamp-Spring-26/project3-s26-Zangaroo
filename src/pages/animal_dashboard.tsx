"use client";
import { useState } from "react";
import { AnimalCard } from "../component/animal_card";
import { Animal } from "../types/animal";
import { useEffect } from "react";
import Sidebar from "@/component/sidebar";
import Link from "next/link";
import ProgressBar from "@/component/progressbar";
import { useAuth } from "@/AuthContext";

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  // Search bar state for filtering animals by name
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setAnimals([]);
      return;
    }

    const fetchAnimals = async () => {
      try {
        const res = await fetch(`/api/animal?ownerId=${user.id}`, {
          method: "GET"
        });
        if (!res.ok) {
          throw new Error("Failed to fetch animals");
        }
        const data = await res.json();
        setAnimals(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch animals:", error);
        setAnimals([]);
      }
    };

    fetchAnimals();
  }, [user]);

  // Search filtering is applied before rendering the animal cards
  const query = search.trim().toLowerCase();
  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(query)
  );

  return (
    <div className="relative flex min-h-screen flex-col">
      <ProgressBar
        showSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="shrink-0 md:w-72">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 px-2 py-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:py-4">
              <h2 className="px-2 py-1 font-heebo text-2xl font-medium leading-none tracking-[-0.025em] text-neutral-700 sm:text-[30px]">
                Animals
              </h2>

              <Link
                href="/create_new_animal"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-gray-200 px-4 py-2 font-heebo text-sm font-medium leading-none tracking-[-0.025em] text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 sm:text-base lg:text-lg"
              >
                <img
                  src="/images/createNewLogo.png"
                  alt="Create new animal"
                  className="h-5 w-5"
                />
                <span>Create new</span>
              </Link>
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
