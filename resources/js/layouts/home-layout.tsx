import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { router } from '@inertiajs/react'
import { useAppearance } from '@/hooks/use-appearance'

interface OrnagaiAppLayoutProps {
    children: ReactNode,
    searchValue: string
}

export default ({ children, searchValue }: OrnagaiAppLayoutProps) => {

    const [searchQuery, setSearchQuery] = useState(searchValue || "");
    const { appearance } = useAppearance();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <header className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-300">
                <div className="container mx-auto px-4 py-4">
                    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                            <Input
                                name="q"
                                type="text"
                                placeholder="Search anything..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 text-lg border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 selection:bg-gray-500 selection:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                            />
                        </div>
                    </form>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
                {children}
            </main>
        </div>
    );
}
