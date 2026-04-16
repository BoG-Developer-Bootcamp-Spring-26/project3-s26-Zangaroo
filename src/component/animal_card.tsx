import Image from "next/image";
import { Animal } from "../types/animal";

interface AnimalCardProps {
  animal: Animal;
  compact?: boolean;
}

export const AnimalCard = ({ animal, compact = false }: AnimalCardProps) => {
    return (
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all group hover:shadow-md">
            {/* Image Container */}
            <div className={`relative w-full overflow-hidden rounded-t-[20px] bg-gray-100 ${compact ? "h-40 lg:h-44" : "h-56 sm:h-60 lg:h-64"}`}>
                <Image 
                    src={animal.profilePicture} 
                    alt={`${animal.name} - ${animal.breed}`} 
                    fill className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            </div>

            {/* Info Section */}
            <div className={`flex items-start ${compact ? "gap-3 px-4 py-4" : "gap-4 px-5 py-5 lg:gap-6 lg:px-6 lg:py-6"}`}>
                {/* Owner Avater */}
                <div className={`flex flex-shrink-0 items-center justify-center rounded-full bg-[#d13a2f] font-bold text-white ${compact ? "h-10 w-10 text-lg" : "h-12 w-12 text-xl lg:h-[50px] lg:w-[50px] lg:text-[24px]"}`}>
                    {/* Owner Name's first character */}
                    {animal.owner.fullName.charAt(0)}
                </div>

                <div className="flex flex-col min-w-0">
                    <h3
                      className={`font-heebo leading-tight text-gray-900 ${compact ? "truncate text-xl" : "truncate text-2xl lg:text-[27px]"}`}
                      title={`${animal.name} - ${animal.breed}`}
                    >
                        <span className="font-bold tracking-tight">
                            {animal.name}
                        </span>
                        <span className="font-bold">
                            {` - ${animal.breed}`}
                        </span>
                    </h3>
                    <p className={`font-heebo font-medium leading-[1.2] text-gray-600 ${compact ? "mt-2 text-sm" : "mt-3 text-base lg:mt-[12px] lg:text-[18px]"} truncate`}>
                        {animal.owner.fullName} • Trained: {animal.hoursTrained} hours
                    </p>
                </div>
            </div>
        </div>
    );
}
