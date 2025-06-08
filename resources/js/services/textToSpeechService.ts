export interface Voice {
    name: string;
    lang: string;
    localService: boolean;
    default: boolean;
    voiceURI: string;
}

export interface TTSOptions {
    text: string;
    voice?: SpeechSynthesisVoice | null;
    rate?: number;
    pitch?: number;
    volume?: number;
}

export class TextToSpeechService {
    private synthesis: SpeechSynthesis;
    private voices: SpeechSynthesisVoice[] = [];
    private isLoaded = false;

    constructor() {
        this.synthesis = window.speechSynthesis;
        this.loadVoices();
    }

    private loadVoices(): void {
        const loadVoices = () => {
            this.voices = this.synthesis.getVoices();
            this.isLoaded = true;
        };

        loadVoices();

        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = loadVoices;
        }
    }

    public async waitForVoices(): Promise<void> {
        if (this.isLoaded && this.voices.length > 0) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const checkVoices = () => {
                if (this.voices.length > 0) {
                    resolve();
                } else {
                    setTimeout(checkVoices, 100);
                }
            };
            checkVoices();
        });
    }

    public getVoices(): SpeechSynthesisVoice[] {
        return this.voices;
    }

    public getEnglishVoices(): { us: SpeechSynthesisVoice[], uk: SpeechSynthesisVoice[] } {
        const usVoices = this.voices.filter(voice => 
            voice.lang === 'en-US' || 
            voice.lang.startsWith('en-US') ||
            (voice.lang === 'en' && voice.name.toLowerCase().includes('us'))
        );

        const ukVoices = this.voices.filter(voice => 
            voice.lang === 'en-GB' || 
            voice.lang.startsWith('en-GB') ||
            (voice.lang === 'en' && voice.name.toLowerCase().includes('uk')) ||
            (voice.lang === 'en' && voice.name.toLowerCase().includes('british'))
        );

        return { us: usVoices, uk: ukVoices };
    }

    public getPreferredVoice(accent: 'us' | 'uk'): SpeechSynthesisVoice | null {
        const { us, uk } = this.getEnglishVoices();
        
        if (accent === 'us') {
            // Prefer high-quality voices
            return us.find(voice => voice.localService) || us[0] || null;
        } else {
            return uk.find(voice => voice.localService) || uk[0] || null;
        }
    }

    public speak(options: TTSOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.synthesis) {
                reject(new Error('Speech synthesis not supported'));
                return;
            }

            // Stop any ongoing speech
            this.synthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(options.text);
            
            // Set voice if provided
            if (options.voice) {
                utterance.voice = options.voice;
            }

            // Set speech parameters
            utterance.rate = options.rate || 0.9; // Slightly slower for pronunciation
            utterance.pitch = options.pitch || 1;
            utterance.volume = options.volume || 1;

            utterance.onend = () => resolve();
            utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

            this.synthesis.speak(utterance);
        });
    }

    public stop(): void {
        this.synthesis.cancel();
    }

    public isSupported(): boolean {
        return 'speechSynthesis' in window;
    }
}

// Create a singleton instance
export const ttsService = new TextToSpeechService();
