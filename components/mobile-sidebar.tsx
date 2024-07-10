import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetTitle>
                <SheetContent className="p-0 w-[256px] z-[100]" side="left">
                    <Sidebar />
                </SheetContent>
            </SheetTitle>
        </Sheet>
    )
} 