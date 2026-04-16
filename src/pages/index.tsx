"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/AuthContext";
import ProgressBar from "@/component/progressbar";

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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_55%,#fff4f1_100%)]">
      <ProgressBar showSearch={false} />
      <main className="flex flex-1 items-center justify-center px-4 py-6 font-heebo sm:px-6 sm:py-8 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="w-full rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(210,19,18,0.08)] backdrop-blur sm:p-8 lg:p-10">
            <h2 className="flex flex-1 items-center justify-center mb-2 text-3xl font-bold text-black sm:text-4xl">
              Login
            </h2>
            <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleLogin}>
              <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent pb-3 text-lg outline-none sm:text-xl"
              />
              </div>
              <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 border-b-2 border-[#d13a2f] bg-transparent pb-3 text-lg outline-none sm:text-xl"
              />
              </div>
              <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[20px] bg-[#D21312] px-8 py-3 text-xl font-medium text-white sm:text-2xl"
              >
              {loading ? "Logging in ..." : "Log in"}
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </form>
            <p className="mt-6 text-center text-base font-light text-gray-600 sm:text-lg">
              Don&apos;t have an account?
              <Link href="/signup" className="font-semibold text-black">
                {" "}Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <div className="pointer-events-none absolute bottom-0 left-0 w-24 opacity-70 sm:w-32 lg:w-auto">
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
