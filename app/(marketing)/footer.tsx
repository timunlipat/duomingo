import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden md:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/korea.png" alt="Korean" height={32} width={40} className="mr-4 rounded-md"/>
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/spain.png" alt="Spanish" height={32} width={40} className="mr-4 rounded-md"/>
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/france.png" alt="French" height={32} width={40} className="mr-4 rounded-md"/>
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/japan.png" alt="Japanese" height={32} width={40} className="mr-4 rounded-md"/>
                </Button>
            </div>
        </footer>
    );
};