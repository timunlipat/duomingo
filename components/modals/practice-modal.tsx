"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
import { usePracticeModal } from "@/store/use-practice-modal";
import { Button } from "../ui/button";

export const PracticeModal = () => {
    const [ client, setClient ] = useState(false);
    const { isOpen, close } = usePracticeModal();

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
                            src="/heart.svg"
                            alt="Heart"
                            height={100}
                            width={100}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Practice lesson
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Use practice lessons to regain hearts and points. You cannot lose hearts or points in practice mode.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button 
                            variant="primary" 
                            className="w-full" 
                            size="lg" 
                            onClick={close}
                        >
                            I understand
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}