"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(data);
        localStorage.setItem("userId", data.userid);
        localStorage.setItem("isAdmin", String(data.isAdmin));
        router.push("/training-logs");
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
      <header className="flex items-center gap-3 border-b border-gray-300 px-4 py-4 shadow-md sm:px-6 sm:py-5 lg:px-10 lg:py-6">
        <img
          src="/images/appLogo.png"
          alt="App logo"
          className="h-10 w-auto sm:h-12"
        />
        <h1 className="text-3xl font-medium text-black font-oswald sm:text-4xl lg:text-5xl">
          Progress
        </h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-6 font-heebo sm:px-6 sm:py-8">
        <h2 className="mb-6 text-3xl font-bold text-black sm:mb-8 sm:text-4xl lg:text-5xl">
          Login
        </h2>
        <div className="w-full max-w-md lg:max-w-xl">
          <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleLogin}>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent pb-2 text-lg outline-none sm:text-xl"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent pb-2 text-lg outline-none sm:text-xl"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mx-auto w-full min-w-[200px] rounded-[20px] bg-[#D21312] px-8 py-3 text-xl font-medium text-white sm:w-auto sm:text-2xl lg:text-3xl"
            >
              {loading ? "Logging in ..." : "Log in"}
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
        <p className="mt-4 text-center text-base font-light text-gray-600 sm:text-lg lg:text-xl">
          Don&apos;t have an account?
          <Link href="/signup" className="font-semibold text-black">
            {" "}Sign up
          </Link>
        </p>
      </main>
      <div className="pointer-events-none absolute bottom-0 left-0 w-24 sm:w-32 lg:w-auto">
        <img src="/images/quarterCircle.png" alt="" />
      </div>
      <footer className="px-4 pb-4 text-center font-light sm:px-6 sm:pb-6">
        <p className="text-sm sm:text-base lg:text-lg">Made with ♡ by Long Lam</p>
        <p className="text-sm sm:text-base lg:text-lg">
          © 2023 BOG Developer Bootcamp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
