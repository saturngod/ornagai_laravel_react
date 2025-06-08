import { useState, useEffect } from 'react';
import { ttsService } from '@/services/textToSpeechService';

export interface UseTTSReturn {
    isSupported: boolean;
    isLoading: boolean;
    isPlaying: boolean;
    error: string | null;
    speak: (text: string, accent?: 'us' | 'uk') => Promise<void>;
    stop: () => void;
    getAvailableVoices: () => { us: SpeechSynthesisVoice[], uk: SpeechSynthesisVoice[] };
}

export function useTTS(): UseTTSReturn {
    const [isSupported, setIsSupported] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initTTS = async () => {
            if (!ttsService.isSupported()) {
                setError('Text-to-speech not supported in this browser');
                setIsLoading(false);
                return;
            }

            try {
                await ttsService.waitForVoices();
                setIsSupported(true);
            } catch (err) {
                setError('Failed to initialize text-to-speech');
            } finally {
                setIsLoading(false);
            }
        };

        initTTS();
    }, []);

    const speak = async (text: string, accent: 'us' | 'uk' = 'us') => {
        if (!text || isPlaying || !isSupported) return;

        setIsPlaying(true);
        setError(null);

        try {
            const voice = ttsService.getPreferredVoice(accent);
            
            await ttsService.speak({
                text,
                voice,
                rate: 0.8,
                pitch: 1,
                volume: 1
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to play pronunciation');
        } finally {
            setIsPlaying(false);
        }
    };

    const stop = () => {
        ttsService.stop();
        setIsPlaying(false);
    };

    const getAvailableVoices = () => {
        return ttsService.getEnglishVoices();
    };

    return {
        isSupported,
        isLoading,
        isPlaying,
        error,
        speak,
        stop,
        getAvailableVoices
    };
}
