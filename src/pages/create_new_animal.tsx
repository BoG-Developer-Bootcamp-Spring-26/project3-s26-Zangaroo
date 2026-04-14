"Use client";
import { useState } from "react";
import Sidebar from "@/component/sidebar";
import { useRouter } from "next/router";

export default function CreateNewAnimal() {
    const router = useRouter();

    // input form
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        hoursTrained: 0,
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
                hoursTrained: formData.hoursTrained,
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
    
    const inputClass = "w-full h-[70px] rounded-[5px] border-2 border-gray-300 px-4 font-heebo text-[24px] font-medium leading-none text-gray-700 placeholder:font-heebo placeholder:text-[24px] placeholder:font-medium placeholder:leading-none placeholder:text-gray-400";
    const labelClass = "mb-1 block font-heebo text-[26px] font-medium leading-none text-gray-800";

    return (
        <div className=" w-fullrelative flex min-h-screen flex-col ">
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
                    {/* Animals header */}
                    <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200 mb-8">
                        <h2 className="font-heebo text-[30px] font-medium leading-none tracking-[-0.025em] text-neutral-700">
                            Animals
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[881px] space-y-6">
                        {/*Animal Name*/}
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

                        {/*Breed*/}
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
                
                        {/*Total Hours Trained*/}
                        <div>
                            <label className={labelClass}>Total Hours Trained</label>
                            <input
                                type="number"
                                placeholder="Hours"
                                className={inputClass}
                                value={formData.hoursTrained}
                                onChange={(e) => setFormData({ ...formData, hoursTrained: Number(e.target.value) })}
                                required
                            />
                        </div>

                        {/*Birth Date*/}
                        <div className="grid grid-cols-3 gap-4">
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

                        {/*Note*/}
                        <div>
                            <label className={labelClass}>Note</label>
                            <textarea
                                placeholder="Note"
                                rows={4}
                                className={`${inputClass} h-[192px] py-3`}
                                value={formData.Note}
                                onChange={(e) => setFormData({...formData, Note: e.target.value})}
                            />
                        </div>

                        {/*Buttons*/}
                        <div className="flex justify-start gap-10 pt-6">
                            <button type="button" onClick={() => router.back()}
                                className="h-[55px] w-[180px] rounded-[5px] font-heebo text-[28px] font-medium leading-none border border-red-600 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button type="submit"
                                className="h-[55px] w-[180px] rounded-[5px] font-heebo text-[28px] font-medium leading-none bg-red-700 text-white hover:bg-red-800 transition-colors font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </form>         
                </main>
            </div>
        </div>
    );
}