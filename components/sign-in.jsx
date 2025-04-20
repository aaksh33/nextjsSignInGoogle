"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner2 } from "react-icons/im"

export default function SignInButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Initialize useRouter

  const handleSignIn = async () => {
    setLoading(true)
    const result = await signIn("google")
    if (result?.ok) {
      router.push("/") // Redirect to home page on success
    } else {
      setLoading(false) // Stop loading if sign-in fails
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      className="w-full mt-1 bg-white text-black hover:bg-gray-100 border flex items-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <ImSpinner2 className="animate-spin text-xl" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      {loading ? "Redirecting..." : "Sign in with Google"}
    </Button>
  )
}
