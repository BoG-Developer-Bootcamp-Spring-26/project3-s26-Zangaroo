"Use client";
import { useState } from "react";
import Sidebar from "@/component/sidebar";
import { useRouter } from "next/router";
import ProgressBar from "@/component/progressbar";

export default function CreateNewAnimal() {
    const router = useRouter();

    // input form
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        hoursTrained: "",
        birthMonth: "",
        birthDay: "",
        birthYear: "",
        Note: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ownerId = localStorage.getItem("userId");

        if (!ownerId) {
            alert("No logged in user found");
            return;
        }

        const response = await fetch("/api/animal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                breed: formData.breed,
                ownerId: ownerId,
                hoursTrained: Number(formData.hoursTrained),
                profilePicture: "/images/_.jpeg"
            }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Failed to create animal");
            return;
        }
        // return to dashboard after saving
        router.push("/animal_dashboard");
    };
    
    const inputClass = "h-12 w-full rounded-[5px] border-2 border-gray-300 px-4 font-heebo text-lg font-medium leading-none text-gray-700 placeholder:font-heebo placeholder:text-lg placeholder:font-medium placeholder:leading-none placeholder:text-gray-400";
    const labelClass = "mb-1 block font-heebo text-lg font-medium leading-none text-gray-800";

    return (
        <div className="relative flex min-h-screen flex-col">
            <ProgressBar />

            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
                <aside className="shrink-0 md:w-72">
                    <Sidebar/>
                </aside>

                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 px-2 py-3 sm:mb-8 sm:py-4">
                            <h2 className="font-heebo text-2xl font-medium leading-none tracking-[-0.025em] text-neutral-700 sm:text-3xl">
                                Animals
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl space-y-4 rounded-2xl bg-white p-4 shadow-sm sm:space-y-5 sm:p-6">
                            <div>
                                <label className={labelClass}>Animal Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={inputClass}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Breed</label>
                                <input
                                    type="text"
                                    placeholder="Breed"
                                    className={inputClass}
                                    value={formData.breed}
                                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                    required
                                />
                            </div>
                
                            <div>
                                <label className={labelClass}>Total Hours Trained</label>
                                <input
                                    type="number"
                                    placeholder="Hours"
                                    className={inputClass}
                                    value={formData.hoursTrained}
                                    onChange={(e) => setFormData({ ...formData, hoursTrained: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className={labelClass}>Birth Month</label>
                                    <select className={inputClass} 
                                        value={formData.birthMonth}
                                        onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                                    >
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Date</label>
                                    <input type='text' 
                                        className={inputClass} 
                                        value={formData.birthDay}
                                        onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Year</label>
                                    <input 
                                        type='text' 
                                        className={inputClass} 
                                        value={formData.birthYear}
                                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Note</label>
                                <textarea
                                    placeholder="Note"
                                    rows={4}
                                    className="w-full rounded-[5px] border-2 border-gray-300 px-4 py-3 font-heebo text-lg font-medium leading-normal text-gray-700 placeholder:font-heebo placeholder:text-lg placeholder:font-medium placeholder:text-gray-400"
                                    value={formData.Note}
                                    onChange={(e) => setFormData({...formData, Note: e.target.value})}
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-start sm:gap-6">
                                <button type="button" onClick={() => router.back()}
                                    className="h-11 w-full rounded-[5px] border border-red-600 font-heebo text-lg font-medium leading-none text-red-600 transition-colors hover:bg-red-50 sm:w-36 sm:text-xl"
                                >
                                    Cancel
                                </button>

                                <button type="submit"
                                    className="h-11 w-full rounded-[5px] bg-red-700 font-heebo text-lg font-medium leading-none text-white transition-colors hover:bg-red-800 sm:w-36 sm:text-xl"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
