"use client"
import { useSession, signIn } from "next-auth/react";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-2xl">Home Page</h1>
        <Link href='/signIn' className="hover:underline">LogIn</Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-2xl font-semibold">Welcome, {session.user.name}!</h1>
        {session.user.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mt-4"
          />
        )}
        <p className="mt-2 text-gray-600">{session.user.email}</p>
      </div>
    </>
  );
}
