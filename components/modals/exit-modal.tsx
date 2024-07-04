"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { 
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useExitModal } from "@/store/use-exit-modal";
import { Button } from "../ui/button";

export const ExitModal = () => {
    const router = useRouter();
    const [ client, setClient ] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect( () => setClient(true), [] );

    if(!client) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/mascot_sad.png"
                            alt="Mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait, don't go!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You're about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="secondary" className="w-full" size="lg" onClick={close}>
                            Keep learning
                        </Button>
                        <Button 
                            variant="dangerOutline" 
                            className="w-full" 
                            size="lg" 
                            onClick={() => {
                                close();
                                router.push("/learn");
                            }}
                        >
                            END SESSION
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}