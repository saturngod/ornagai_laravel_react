import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import HomeLayout from "@/layouts/home-layout";
import DualVoiceButtons from "@/components/DualVoiceButtons";
import SimplePronunciationButton from "@/components/SimplePronunciationButton";

interface WordDataExample {
    id: number;
    english_word_data_id: number;
    example: string;
    created_at: string;
    updated_at: string;
}

interface WordData {
    id: number;
    english_word_id: number;
    ipa: string;
    state: string;
    def: string;
    created_at: string;
    updated_at: string;
    examples: WordDataExample[];
}

interface MyanmarWordData {
    id: number;
    myanmar_word_id: number;
    phonetics?: string;
    state?: string;
    meaning?: string;
}

interface EnglishWord {
    id: number;
    word: string;
    created_at: string;
    updated_at: string;
    word_data: WordData[];
}

interface MyanmarWord {
    id: number;
    word: string;
    created_at: string;
    updated_at: string;
    myanmar_word_data: MyanmarWordData[];
}

interface SearchProps {
    query?: string;
    words?: EnglishWord[];
    myWords?: MyanmarWord[];
}

export default function SearchPage({ query, words, myWords }: SearchProps) {
    
    // Debug: Log the received data
    console.log('🔍 Debug - Search Props:', { query, words, myWords });
    

    return (
        <HomeLayout searchValue={query || ""}>
            <div className="py-8">
                {!query && (
                    <div className="text-center mb-8">
                        <p className="text-gray-500 dark:text-gray-400">No search query provided</p>
                    </div>
                )}

                {/* Display English search results */}
                {words && words.length > 0 && (
                    <div className="space-y-6">
                        {words.map((word) => (
                            <div key={word.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {word.word}
                                    </h2>
                                    <DualVoiceButtons text={word.word} />
                                </div>
                                
                                {/* Display word data (definitions, pronunciations, etc.) */}
                                {word.word_data && word.word_data.length > 0 && (
                                    <div className="space-y-4">
                                        {word.word_data.map((data, index) => (
                                            <div key={data.id} className="border-l-4 border-blue-500 pl-4">
                                                {/* IPA Pronunciation */}
                                                {data.ipa && (
                                                    <p className="text-lg text-gray-600 dark:text-gray-400 font-ipa mb-2">
                                                        /{data.ipa}/
                                                    </p>
                                                )}
                                                
                                                {/* Part of speech */}
                                                {data.state && (
                                                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full mb-2">
                                                        {data.state}
                                                    </span>
                                                )}
                                                
                                                {/* Definition */}
                                                <p className="text-gray-800 dark:text-gray-200 mb-3">
                                                    {data.def}
                                                </p>
                                                
                                                {/* Examples */}
                                                {data.examples && data.examples.length > 0 && (
                                                    <div className="ml-4">
                                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                            Examples:
                                                        </h4>
                                                        <ul className="space-y-1">
                                                            {data.examples.map((example) => (
                                                                <li key={example.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 italic">
                                                                    <span>"  {example.example}"</span>
                                                                    <SimplePronunciationButton 
                                                                        text={example.example} 
                                                                        accent="us"
                                                                        className="opacity-70 hover:opacity-100"
                                                                    />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Show message when no word data available */}
                                {(!word.word_data || word.word_data.length === 0) && (
                                    <p className="text-gray-500 dark:text-gray-400 italic">
                                        No definitions available for this word.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Display Myanmar search results */}
                {myWords && myWords.length > 0 && (
                    <div className="space-y-6 mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Myanmar Results
                        </h2>
                        {myWords.map((word) => (
                            <div key={word.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    {word.word}
                                </h2>
                                
                                {/* Display Myanmar word data (meanings, phonetics, etc.) */}
                                {word.myanmar_word_data && word.myanmar_word_data.length > 0 && (
                                    <div className="space-y-4">
                                        {word.myanmar_word_data.map((data, index) => (
                                            <div key={data.id} className="border-l-4 border-green-500 pl-4">
                                                {/* Phonetics */}
                                                {data.phonetics && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-ipa mb-2">
                                                        /{data.phonetics}/
                                                    </p>
                                                )}
                                                
                                                {/* State/Part of speech */}
                                                {data.state && (
                                                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full mb-2">
                                                        {data.state}
                                                    </span>
                                                )}
                                                
                                                {/* Meaning */}
                                                {data.meaning && (
                                                    <p className="text-gray-800 dark:text-gray-200 mb-3">
                                                        {data.meaning}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Show message when no Myanmar word data available */}
                                {(!word.myanmar_word_data || word.myanmar_word_data.length === 0) && (
                                    <p className="text-gray-500 dark:text-gray-400 italic">
                                        No definitions available for this word.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* No results message */}
                {query && (!words || words.length === 0) && (!myWords || myWords.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No results found for "{query}"
                        </p>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}
