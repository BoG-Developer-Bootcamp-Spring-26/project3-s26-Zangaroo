import Image from "next/image";
import { Animal } from "../types/animal";

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard = ({ animal }: AnimalCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
            {/* Image Container */}
            <div className="relative h-52 w-full bg-gray-100">
                <Image 
                    src={animal.profilePicture} 
                    alt={`${animal.name} - ${animal.breed}`} 
                    fill className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            </div>

            {/* Info Section */}
            <div className="p-4 flex items-center gap-3">
                {/* Owner Avater */}
                <div className="flex-shrink-0 w-10 h-10 bg-[#d13a2f] rounded-full flex items-center
                            justify-center text-white font-bold shadoe-inner">
                    {/* Owner Name's first character */}
                    {animal.name.charAt(0)}
                </div>

                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-white truncate">
                        {animal.name} - {animal.breed}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Trained: {animal.hoursTrained} hours
                    </p>
                </div>
            </div>
        </div>
    );
}