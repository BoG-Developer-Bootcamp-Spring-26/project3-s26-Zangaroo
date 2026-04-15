import Image from "next/image";
import { Animal } from "../types/animal";

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard = ({ animal }: AnimalCardProps) => {
    return (
        <div className="w-[400px] h-[374px] bg-white rounded-xl shadow-sm border border-hidden overflow-hidden group hover:shadow-md transition-all">
            {/* Image Container */}
            <div className="relative w-full h-[260px] overflow-hidden rounded-t-[20px] bg-gray-100">
                <Image 
                    src={animal.profilePicture} 
                    alt={`${animal.name} - ${animal.breed}`} 
                    fill className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            </div>

            {/* Info Section */}
            <div className="pl-[25px] py-[25px] flex items-center gap-[24px]">
                {/* Owner Avater */}
                <div className="flex-shrink-0 w-[50px] h-[50px] bg-[#d13a2f] rounded-full flex items-center
                            justify-center text-white font-bold text-[24px]">
                    {/* Owner Name's first character */}
                    {animal.owner.fullName.charAt(0)}
                </div>

                <div className="flex flex-col min-w-0">
                    <h3 className="font-heebo text-gray-900 leading-none truncate flex items-baseline gap-[10px]">
                        <span className="text-[27px] font-bold tracking-tight">
                            {animal.name}
                        </span>
                        <span className="text-[27px] font-bold">
                            - {animal.breed}
                        </span>
                    </h3>
                    <p className="font-heebo text-[18px] font-medium leading-[1.2] text-gray-600 truncate mt-[12px]">
                        {animal.owner.fullName} • Trained: {animal.hoursTrained} hours
                    </p>
                </div>
            </div>
        </div>
    );
}