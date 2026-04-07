"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [isAdmin, setIsAdmin] = useState(false);
const router = useRouter();

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        password,
        confirmPassword,
        isAdmin,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/training-logs")
    } else {
      setError(data.error);
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center gap-3 border-b border-gray-300 px-10 py-6 shadow-md">
            <img src="/images/appLogo.png"/>
            <h1 className="text-5xl font-medium text-black font-oswald">Progress</h1>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 font-heebo" >
            <h2 className="mb-12 text-5xl font-bold text-black">Create Account</h2>
            <div className="w-full max-w-xl">
                <form className= "flex flex-col gap-10" onSubmit = {handleSignup}>
                    <div>
                        <input id="name" type="name" placeholder="Full Name"  
                        value = {fullName}
                        onChange = {(e) => setFullName(e.target.value)}
                        className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <div>
                        <input id="email" type="email" placeholder="Email" 
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)} 
                        className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <div>
                        <input id="password" type="password" placeholder="Password" 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <div>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password"  
                        value = {confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                        className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent text-xl outline-none"/>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange= {(e) => setIsAdmin(e.target.checked)}
                        className="w-5 h-5 cursor-pointer rounded-none"
                        />
                        Admin Access
                    </label>
                    <button type="submit" 
                    disabled = {loading}
                    className="bg-[#D21312] border rounded-[20px] text-3xl py-2 m-4 text-white font-medium"> {loading ? "Signing Up.. " : "Sign Up"} </button>
                    {error && ( <p style={{ color: "red", marginTop: "10px" }}>{error}</p>)}
                </form>
            </div>
            <p className="mt-4 text-xl font-light text-gray-600">Already have an account?
                <Link href="/" className="font-semibold text-black"> Sign in</Link>
            </p>
        
        </main>
        <div className ="absolute bottom-0 left-0">
            <img src="/images/quarterCircle.png" className =""/>
        </div>
        <footer className="flex flex-col items-center justify-content m-10 font-light">
            <p className="text-lg">Made with ♡ by Long Lam</p>
            <p className="text-lg">© 2023 BOG Developer Bootcamp. All rights reserved.</p>
        </footer>
    </div>
  );
}