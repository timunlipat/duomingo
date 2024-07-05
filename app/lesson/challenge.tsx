import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options: typeof challengeOptions.$inferInsert[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOptions?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
}

export const Challenge = ({ options, onSelect, status, selectedOptions, disabled, type }: Props) => {
    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
            {options.map((option, index) => (
                <Card
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortcut={`${index + 1}`}
                    selected={selectedOptions === option.id}
                    onClick={() => onSelect(option.id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                />
            ))} 
        </div>
    )
}