"use client"
import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

const Navbar = () => {
    const { data: session, status } = useSession()
    console.log("session:", session, "status:", status)

    return (
        <nav className='flex text-black items-center justify-between p-4 bg-gray-50 shadow-md sticky top-0 w-full'>
            <div className="flex items-center gap-2">
                <i className="fa-brands fa-apple" />
                <h1>Next Auth</h1>
            </div>

            <div className='flex gap-5 items-center'>
                <div>Home</div>
                <div>About</div>
                <div>Content</div>
                <div>Settings</div>

                {!session && (

                    <Button variant="secondary" asChild>
                        <Link href="/signIn">Sign In</Link>
                    </Button>

                )}

                {session && (
                    <div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div>
                                    {session?.user?.image && (
                                        <img src={session.user.image} alt="User Image" className="w-10 h-10 rounded-full" />
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => signOut()}>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* You can add signOut button here if needed */}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
