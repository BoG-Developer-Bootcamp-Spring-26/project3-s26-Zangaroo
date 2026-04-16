import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/AuthContext";

type Animal = {
    _id: string;
    name: string;
    breed: string;
};

export default function CreateTrainingLog() {
    const [title, setTitle] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [hours, setHours] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [animals, setAnimals] = useState<Animal[]>([]);
    
    const router = useRouter();

    const handleCreateTrainingLog = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const newTrainingLog = {
                title,
                animalId,
                userId: user?.id,
                hours: Number(hours),
                description,
                date: new Date().toISOString()
            };

            const res = await fetch ("/api/training-log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTrainingLog)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to create training log");
            }

            router.push("/training-logs");

        } catch (error) {
            setError("Failed to create training log");
        } finally {
            setLoading(false);
        }
    }

    const {user} = useAuth()

    async function getAnimals(): Promise<Animal[]> {
        try {
            let res: Response;

            if (user?.isAdmin) {
                res = await fetch("/api/admin/animals");
            } else {
                if (!user?.id) {
                    return [];
                }
                res = await fetch(`/api/animal?ownerId=${user.id}`);
            }       
            
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

    useEffect(() => {
        if (!user) {
            return;
        }

        getAnimals().then((animalData) => {
            setAnimals(animalData);
        });
    }, [user]);

    return (
        <div className="relative flex min-h-screen flex-col">
            <ProgressBar/>
        
            <div className="flex flex-1 flex-col md:flex-row">
                <aside className="shrink-0 md:w-72">
                    <Sidebar/>
                </aside>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-4xl">
                        <div className="mb-6 border-b border-gray-200 px-2 py-3 sm:mb-8 sm:py-4">
                            <h2 className="text-2xl font-semibold text-neutral-700 sm:text-3xl">
                                Training Logs
                            </h2>
                        </div>

                        <form onSubmit={handleCreateTrainingLog} className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm sm:gap-6 sm:p-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold text-[#222222] sm:text-[20px]">Title</label>
                                <input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="h-14 rounded-[10px] border border-[#BDBDBD] bg-white px-4 text-base text-[#555555] outline-none sm:h-16 sm:px-6 sm:text-[18px]"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold text-[#222222] sm:text-[20px]">Select Animal</label>
                                <select
                                    value={animalId}
                                    onChange={(e) => setAnimalId(e.target.value)}
                                    className="h-14 rounded-[10px] border border-[#BDBDBD] bg-white px-4 text-base text-[#555555] outline-none sm:h-16 sm:px-6 sm:text-[18px]"
                                    required
                                >
                                    <option value="">Select animal</option>
                                    {animals.map((animal) => (
                                        <option value={animal._id} key={animal._id}>
                                            {animal.name} - {animal.breed}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold text-[#222222] sm:text-[20px]">Total hours trained</label>
                                <input
                                    type="number"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    placeholder="20"
                                    className="h-14 rounded-[10px] border border-[#BDBDBD] bg-white px-4 text-base text-[#555555] outline-none sm:h-16 sm:px-6 sm:text-[18px]"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold text-[#222222] sm:text-[20px]">Note</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Note"
                                    className="min-h-[170px] resize-none rounded-[10px] border border-[#BDBDBD] bg-white px-4 py-4 text-base text-[#555555] outline-none sm:px-6 sm:py-5 sm:text-[18px]"
                                    required
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
                                <button 
                                    type="button"
                                    className="h-12 w-full rounded-[8px] border border-[#D21312] bg-white px-6 text-lg font-medium text-[#D21312] sm:h-14 sm:w-auto sm:min-w-[160px] sm:text-[20px]"
                                    onClick={() => router.push("/training-logs")}
                               >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-[8px] bg-[#D21312] px-6 text-lg font-medium text-white sm:h-14 sm:w-auto sm:min-w-[160px] sm:text-[20px]"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>

                            {error && <p className="text-red-600">{error}</p>}
                        </form>
                    </div>
                </main>
            </div>
        </div>   
    );
}
