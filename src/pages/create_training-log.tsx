import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";
import { useState, useEffect} from "react";
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
    const { user } = useAuth();

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

    async function getAnimals(): Promise<Animal[]> {
        try {
            const res = await fetch("/api/admin/animals");

            if (!res.ok) {
                throw new Error("Failed to fetch animals");
            }

            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error("Failed to fetch animals:", error);
            return [];
        }
    }

    useEffect(() => {
        getAnimals().then((animalData) => {
            setAnimals(animalData);
        });
    }, []);

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
                            </div>

                            <form onSubmit={handleCreateTrainingLog} className="ml-48 flex max-w-[780px] flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[20px] font-semibold text-[#222222]">Title</label>
                                    <input 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Title"
                                        className="h-[64px] rounded-[10px] border border-[#BDBDBD] bg-white px-6 text-[18px] text-[#555555] outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[20px] font-semibold text-[#222222]">Select Animal</label>
                                    <select
                                        value={animalId}
                                        onChange={(e) => setAnimalId(e.target.value)}
                                        className="h-[64px] rounded-[10px] border border-[#BDBDBD] bg-white px-6 text-[18px] text-[#555555] outline-none"
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
                                    <label className="text-[20px] font-semibold text-[#222222]">Total hours trained</label>
                                    <input
                                        type="number"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        placeholder="20"
                                        className="h-[64px] rounded-[10px] border border-[#BDBDBD] bg-white px-6 text-[18px] text-[#555555] outline-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[20px] font-semibold text-[#222222]">Note</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Note"
                                        className="min-h-[170px] rounded-[10px] border border-[#BDBDBD] bg-white px-6 py-5 text-[18px] text-[#555555] outline-none resize-none"
                                    />
                                </div>

                                <div className="mt-2 flex gap-8">
                                    <button 
                                        type="button"
                                        className="h-[56px] w-[160px] rounded-[8px] border border-[#D21312] bg-white text-[20px] font-medium text-[#D21312]"
                                        onClick={() => router.push("/training-logs")}
                                   >
                                        Cancel
                                    </button>

                                    <button type="submit" className="h-[56px] w-[160px] rounded-[8px] bg-[#D21312] text-[20px] font-medium text-white">
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>

                                {error && <p className="text-red-600">{error}</p>}
                            </form>
                        </main>
                    </div>
                </div>   
    )
}