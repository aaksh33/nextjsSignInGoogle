"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner2 } from "react-icons/im"
import { FaGithub } from "react-icons/fa"

export default function SignInButton() {
    const [googleLoading, setGoogleLoading] = useState(false)
    const [githubLoading, setGithubLoading] = useState(false)
    const router = useRouter()

    const handleSignIn = async (provider) => {
        if (provider === "google") setGoogleLoading(true)
        if (provider === "github") setGithubLoading(true)

        const result = await signIn(provider)
        if (result?.ok) {
            router.push("/") // Redirect to home page on success
        } else {
            if (provider === "google") setGoogleLoading(false)
            if (provider === "github") setGithubLoading(false)
        }
    }

    return (
        <>
            {/* Google Sign-In Button */}
            <Button
                onClick={() => handleSignIn("google")}
                className="w-full mt-1 bg-white text-black hover:bg-gray-100 border flex items-center gap-2"
                disabled={googleLoading || githubLoading}
            >
                {googleLoading ? (
                    <ImSpinner2 className="animate-spin text-xl" />
                ) : (
                    <FcGoogle className="text-xl" />
                )}
                {googleLoading ? "Redirecting..." : "Sign in with Google"}
            </Button>

            {/* GitHub Sign-In Button */}
            <Button
                onClick={() => handleSignIn("github")}
                className="w-full mt-1 bg-black text-white hover:bg-gray-800 border flex items-center gap-2"
                disabled={googleLoading || githubLoading}
            >
                {githubLoading ? (
                    <ImSpinner2 className="animate-spin text-xl" />
                ) : (
                    <FaGithub className="text-xl" />
                )}
                {githubLoading ? "Redirecting..." : "Sign in with GitHub"}
            </Button>
        </>
    )
}
