"use client";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import TrainingLogsCard from "./training-logs_card";


export default function TrainingLogs() {
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
              Training Logs
            </h2>

            <button
              className="group flex items-center gap-2 font-heebo text-base font-medium leading-none tracking-[-0.025em] text-neutral-500 transition-all hover:text-neutral-900 sm:text-lg lg:text-[22px]"
              onClick={() => alert("Create Modal Logic Goes Here")}
            >
              <img src="/images/createNewLogo.png" alt="Create new training log" />
              <span>Create new</span>
            </button>
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-3 lg:space-y-4">
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
          </div>
        </main>
      </div>
    </div>
  );
}
