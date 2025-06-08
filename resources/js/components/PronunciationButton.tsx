import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { ttsService } from '@/services/textToSpeechService';

interface PronunciationButtonProps {
    text: string;
    accent?: 'us' | 'uk';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function PronunciationButton({ 
    text, 
    accent = 'us', 
    className = '',
    size = 'sm'
}: PronunciationButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkSupport = async () => {
            if (!ttsService.isSupported()) {
                setError('Text-to-speech not supported in this browser');
                return;
            }

            setIsSupported(true);
            setIsLoading(true);
            
            try {
                await ttsService.waitForVoices();
                const voice = ttsService.getPreferredVoice(accent);
                if (!voice) {
                    setError(`No ${accent.toUpperCase()} English voice available`);
                }
            } catch (err) {
                setError('Failed to load voices');
            } finally {
                setIsLoading(false);
            }
        };

        checkSupport();
    }, [accent]);

    const handleSpeak = async () => {
        if (!text || isPlaying || error) return;

        setIsPlaying(true);
        setError(null);

        try {
            const voice = ttsService.getPreferredVoice(accent);
            
            await ttsService.speak({
                text,
                voice,
                rate: 0.8, // Slower for pronunciation
                pitch: 1,
                volume: 1
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to play pronunciation');
        } finally {
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        ttsService.stop();
        setIsPlaying(false);
    };

    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const buttonSizeClasses = {
        sm: 'p-1',
        md: 'p-1.5',
        lg: 'p-2'
    };

    if (!isSupported || error) {
        return (
            <button
                disabled
                className={`${buttonSizeClasses[size]} text-gray-400 cursor-not-allowed ${className}`}
                title={error || 'Text-to-speech not supported'}
            >
                <VolumeX className={sizeClasses[size]} />
            </button>
        );
    }

    if (isLoading) {
        return (
            <button
                disabled
                className={`${buttonSizeClasses[size]} text-gray-400 ${className}`}
            >
                <Loader2 className={`${sizeClasses[size]} animate-spin`} />
            </button>
        );
    }

    return (
        <button
            onClick={isPlaying ? handleStop : handleSpeak}
            className={`${buttonSizeClasses[size]} text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ${className}`}
            title={`Play ${accent.toUpperCase()} pronunciation`}
            disabled={isLoading}
        >
            <Volume2 className={`${sizeClasses[size]} ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
    );
}
