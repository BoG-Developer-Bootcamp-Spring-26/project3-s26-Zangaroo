"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import TrainingLogsCard from "./training-logs_card";


export default function TrainingLogs() {
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

                        <button
                            className="group flex items-center gap-2 text-sm font-medium text-neutral-500 transition-all hover:text-neutral-900"
                            onClick={() => alert("Create Modal Logic Goes Here")}
                        >
                            <img src="/images/createNewLogo.png"/>
                            <span>Create new</span>
                        </button>
                    </div>

                    {/* Training Logs Card */}
                    <div>
                        <TrainingLogsCard
                            title="Complete sit lessons"
                            date="20"
                            month="October"
                            year="2023"
                            userName="Long Lam"
                            animalName="Lucy"
                            animalBreed="Golden Retriever"
                            hours={20}
                            description="Lucy finishes the sit lessons very well today. Should give her a treat."
                        />
                    </div>
                </main>
            </div>
        </div>    
    )
}