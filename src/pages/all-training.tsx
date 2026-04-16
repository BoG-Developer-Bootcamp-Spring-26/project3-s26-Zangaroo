"use client";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import TrainingLogsCard from "./training-logs_card";
import { useEffect, useState } from "react";

type TrainingLog = {
    id: string;
    title: string;
    date: string;
    userName: string;
    animalName: string;
    animalBreed: string;
    hours: number;
    description: string;
};

async function getAllTrainingLogs(): Promise<TrainingLog[]> {
    try {
      const res = await fetch("/api/training-log");

      if (!res.ok) {
        throw new Error("Failed to fetch training logs");
      }

      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error("Failed to fetch all training logs:", error);
      return [];
    }
}

export default function Home() {
    const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
    // Search bar state for filtering training logs by title
    const [search, setSearch] = useState("");

    useEffect(() => {
      getAllTrainingLogs().then(setTrainingLogs);
    }, []);

    // Search filtering is applied before rendering the training log cards
    const query = search.trim().toLowerCase();
    const filteredTrainingLogs = trainingLogs.filter((log) =>
      log.title.toLowerCase().includes(query)
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
                            All Trainings
                        </h2>
                    </div>

                    <div className="mx-auto w-full max-w-6xl space-y-3 lg:space-y-4">
                        {filteredTrainingLogs.map((log) => {
                            const fullDate = new Date(log.date);
                            const day = String(fullDate.getDate());
                            const month = fullDate.toLocaleString("default", { month: "short" });
                            const year = String(fullDate.getFullYear());

                            return (
                                <TrainingLogsCard
                                    key={log.id}
                                    id={log.id}
                                    title={log.title}
                                    date={day}
                                    month={month}
                                    year={year}
                                    userName={log.userName}
                                    animalName={log.animalName}
                                    animalBreed={log.animalBreed}
                                    hours={log.hours}
                                    description={log.description}
                                />
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
