"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/component/sidebar";
import ProgressBar from "@/component/progressbar";

export default function trainingLogs() {
    return (
        <div className="flex min-h-screen flex-col">
            <ProgressBar/>
        
            <div className="flex flex-1">
                {/* Sidebar */}
                    <aside className="border-l border-gray-300">
                        <Sidebar/>
                    </aside>
            </div>
        </div>    
    )
}