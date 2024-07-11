import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { ArrowLeftIcon, Loader } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
}

export const Header = ({ title }: Props) => {
    return (
        <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
            <Link href="/courses">
                <Button variant="ghost" size="sm">
                    <ArrowLeftIcon className="h-5 w-5 stroke-2 text-neutral-400"/>
                </Button>
            </Link>
            <h1 className="font-bold text-lg">
                {title}
            </h1>
            <div className="lg:hidden block">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
           </div>
           <div className="lg:block hidden"/>
        </div>
    )
}