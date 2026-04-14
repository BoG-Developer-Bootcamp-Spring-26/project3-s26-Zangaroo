"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import TrainingLogsCard from "./training-logs_card";
import Link from "next/link";

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

async function getTrainingLogs(): Promise<TrainingLog[]> {
    try {
        const res = await fetch("/api/training-log");
        if (!res.ok) {
            throw new Error("Failed to fetch training log data");
        }

        const data = await res.json();
        return data.data;

    }
    catch(error) {
        console.error("Failed to fetch training logs:", error);
        return [];
    }
}

export default function TrainingLogs() {
    const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);

    useEffect(() => {
        getTrainingLogs().then((logs) => {
            setTrainingLogs(logs);
        });
    }, [])

    return (
        <div className="relative flex min-h-screen flex-col">
            <ProgressBar/>
        
            <div className="flex flex-1">
                <aside className="border-l border-gray-300">
                    <Sidebar/>
                </aside>

                <main className="flex-1 p-8">
                    <div className="mb-8 flex items-center justify-between border-b border-gray-200 px-2 py-4">
                        <h2 className="text-xl font-semibold text-neutral-700">
                            Training Logs
                        </h2>

                        <Link
                            className="group flex items-center gap-2 text-sm font-medium text-neutral-500 transition-all hover:text-neutral-900"
                            href="/create_training-log"
                        >
                            <img src="/images/createNewLogo.png"/>
                            <span>Create new</span>
                        </Link>
                    </div>

                    {/* Training Logs Card */}
                    <div>
                        {trainingLogs.map((log) => {
                            const fullDate = new Date(log.date);
                            const day = String(fullDate.getDate());
                            const month = fullDate.toLocaleString("default", { month: "short" });
                            const year = String(fullDate.getFullYear());

                            return (
                                <TrainingLogsCard
                                    key = {log.id}
                                    title= {log.title}
                                    date= {day}
                                    month= {month}
                                    year= {year}
                                    userName= {log.userName}
                                    animalName= {log.animalName}
                                    animalBreed= {log.animalBreed}
                                    hours={log.hours} 
                                    description={log.description}
                                />
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>    
    )
}