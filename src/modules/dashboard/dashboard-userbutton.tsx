"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAVatar } from "@/components/generate-avatar";
import { ChevronDownIcon, CreditCardIcon, LogInIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const DashBoardUserButton = () => {
    
    const router = useRouter();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        });
    }

    const { data, isPending } = authClient.useSession();
    if(isPending || !data?.user){
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
             className="rounded-lg border border-border/10 p-3 gap-1 w-full flex items-center justify-between bg-white/5
             hover:bg-white/10 overflow-hidden" >
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image}/>
                    </Avatar>
                ) : (
                <GeneratedAVatar
                    seed={data.user.name}
                    variant="initials"
                    className="size-9 mr-3"
                 />
                 )}
                 <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email}
                    </p>
                 </div>
                 <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between" 
                >
                    Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer flex items-center justify-between" 
                >
                    Logout
                    <LogInIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

