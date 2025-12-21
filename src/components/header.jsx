import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { UrlState } from '@/context';
import { logout } from '@/db/apiAuth';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';

const Header = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = UrlState();
    const {loading, fn: fnLogout} = useFetch(logout);

    return (
        <>
        <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#230f0f]/95 backdrop-blur-sm border-b border-[#e7dada] dark:border-[#3a2020]">
            <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="size-8 rounded bg-[#800000] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">link</span>
                    </div>
                    <h2 className="text-[#800000] dark:text-white text-xl font-bold leading-tight tracking-tight">
                        IMM FT UMJ Link
                    </h2>
                </Link>
                
                {/* Auth Actions */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate("/auth")}
                                className="hidden sm:flex min-w-[84px] text-[#800000] dark:text-white hover:bg-[#f8f5f5] dark:hover:bg-white/10"
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate("/auth")}
                                className="min-w-[84px] bg-[#800000] hover:bg-[#5e0000] text-white font-bold shadow-sm"
                            >
                                Register
                            </Button>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#800000] ring-offset-2 ring-offset-background">
                                <Avatar>
                                    <AvatarImage
                                        src={user?.user_metadata?.profile_pic}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-[#800000] text-white">
                                        {user?.user_metadata?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user?.user_metadata?.name}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#e7dada] dark:bg-[#3a2020]" />
                                <DropdownMenuItem asChild>
                                    <Link to={"/dashboard"} className="flex items-center cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4 text-[#800000]" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to={"/dashboard"} className="flex items-center cursor-pointer">
                                        <LinkIcon className="mr-2 h-4 w-4 text-[#800000]" />
                                        My Links
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#e7dada] dark:bg-[#3a2020]" />
                                <DropdownMenuItem 
                                    className="text-red-500 cursor-pointer focus:text-red-500"
                                    onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/");
                                        });
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
        {loading && <BarLoader className="mb-4" width={"100%"} color="#800000" />}
        </>
    );
};

export default Header;