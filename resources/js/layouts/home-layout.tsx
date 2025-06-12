import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Input
                                name="q"
                                type="text"
                                placeholder="Search English or မြန်မာ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-6 pr-16 py-4 text-base border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
                            />
                            <Button 
                                type="submit" 
                                size="sm"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
                                disabled={!searchQuery.trim()}
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </header>
            <main className="container mx-auto px-4 text-gray-900 dark:text-gray-100">
                {children}
            </main>
        </div>
    );
}
