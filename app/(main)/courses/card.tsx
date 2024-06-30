import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
    id: number;
    title: string;
    imageSrc: string;
    onClick: (id:number)=>void;
    disabled?: boolean;
    activeCourseId?: boolean;
}

export const Card = ({ id, title, imageSrc, onClick, disabled, activeCourseId }: Props) => {
    return (
        <div 
        onClick={()=>onClick(id)}
        className={cn(
            "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center jusfify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
            disabled && "pointer-events-none opacity-50"
        )}
        >
            <div className="min-h-[50px] w-full flex items-center justify-end">
                {activeCourseId && (
                    <div className="bg-green-600 rounded-md items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] h-4 w-4"/>
                    </div>
                )}
            </div>
            <Image 
                src={imageSrc} 
                alt={title} 
                height={70} 
                width={93.33} 
                className="rounded-lg drop-shadow-md border object-cover"
            />
            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
            </p>
        </div>
    )
}