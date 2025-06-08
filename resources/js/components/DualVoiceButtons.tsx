import React from 'react';
import { Volume2 } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';

interface DualVoiceButtonsProps {
    text: string;
    className?: string;
}

export default function DualVoiceButtons({ text, className = '' }: DualVoiceButtonsProps) {
    const { speak, isPlaying, isSupported } = useTTS();

    const handleSpeak = (accent: 'us' | 'uk') => {
        if (isSupported && !isPlaying) {
            speak(text, accent);
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {/* US English Button */}
            <button
                onClick={() => handleSpeak('us')}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md transition-colors text-sm font-medium cursor-pointer disabled:cursor-not-allowed"
                title="Play US English pronunciation"
                disabled={isPlaying}
            >
                <span className="text-xs">🇺🇸</span>
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>US</span>
            </button>

            {/* UK English Button */}
            <button
                onClick={() => handleSpeak('uk')}
                className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md transition-colors text-sm font-medium cursor-pointer disabled:cursor-not-allowed"
                title="Play UK English pronunciation"
                disabled={isPlaying}
            >
                <span className="text-xs">🇬🇧</span>
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>UK</span>
            </button>
        </div>
    );
}
