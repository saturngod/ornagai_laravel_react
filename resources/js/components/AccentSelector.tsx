import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PronunciationButton from './PronunciationButton';

interface AccentSelectorProps {
    text: string;
    className?: string;
}

export default function AccentSelector({ text, className = '' }: AccentSelectorProps) {
    const [selectedAccent, setSelectedAccent] = useState<'us' | 'uk'>('us');
    const [isOpen, setIsOpen] = useState(false);

    const accents = [
        { value: 'us', label: 'US English', flag: '🇺🇸' },
        { value: 'uk', label: 'UK English', flag: '🇬🇧' }
    ] as const;

    const currentAccent = accents.find(accent => accent.value === selectedAccent);

    return (
        <div className={`relative inline-flex items-center ${className}`}>
            {/* Pronunciation Button */}
            <PronunciationButton 
                text={text} 
                accent={selectedAccent}
                size="sm"
                className="mr-1"
            />
            
            {/* Accent Selector Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                    <span>{currentAccent?.flag}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                        {selectedAccent.toUpperCase()}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Menu */}
                        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 min-w-[120px]">
                            {accents.map((accent) => (
                                <button
                                    key={accent.value}
                                    onClick={() => {
                                        setSelectedAccent(accent.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                        selectedAccent === accent.value 
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span>{accent.flag}</span>
                                    <span>{accent.label}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
