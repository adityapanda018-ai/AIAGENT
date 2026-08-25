// Web Speech API Voice Engine (Speech-to-Text & Text-to-Speech)

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error?: string;
}

class VoiceEngineService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.isSupported = true;
      }
    }
  }

  public getIsSupported(): boolean {
    return this.isSupported;
  }

  public startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onEnd?: () => void
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser.');
      return false;
    }

    try {
      this.recognition.onresult = (event: any) => {
        let currentTranscript = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          currentTranscript += result[0].transcript;
          if (result.isFinal) isFinal = true;
        }

        onResult(currentTranscript, isFinal);
      };

      this.recognition.onerror = (event: any) => {
        onError(`Voice error: ${event.error || 'Speech input failed.'}`);
      };

      this.recognition.onend = () => {
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      onError(`Could not start microphone: ${e.message || e}`);
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore if already stopped
      }
    }
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) return;

    this.stopSpeaking(); // Cancel any existing speech

    // Clean text of markdown formatting for clear speech
    const cleanText = text
      .replace(/#+/g, '')
      .replace(/\*+/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/`{1,3}.*?`{1,3}/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Prefer natural sounding English voice if available
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

export const voiceEngine = new VoiceEngineService();
