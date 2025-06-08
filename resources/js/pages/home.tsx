import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import HomeLayout from "@/layouts/home-layout";

export default function Home() {

    return (
        <HomeLayout searchValue={""}>
            <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                    <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Start your search</h1>
                    <p className="text-gray-600">Enter your search query in the box above to find what you're looking for.</p>
                </div>
            </div>
        </HomeLayout>

    );
}
