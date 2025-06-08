import React from 'react';
import { Volume2 } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';

interface SimplePronunciationButtonProps {
    text: string;
    accent?: 'us' | 'uk';
    className?: string;
}

export default function SimplePronunciationButton({ 
    text, 
    accent = 'us', 
    className = '' 
}: SimplePronunciationButtonProps) {
    const { speak, isPlaying, isSupported } = useTTS();

    const handleClick = () => {
        if (isSupported && !isPlaying) {
            speak(text, accent);
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <button
            onClick={handleClick}
            className={`p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ${className}`}
            title={`Pronounce "${text}" in ${accent.toUpperCase()}`}
            disabled={isPlaying}
        >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
    );
}
