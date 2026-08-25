import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX, Sparkles, Play } from 'lucide-react';
import { voiceEngine } from '../services/voiceService';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunPrompt: (promptText: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onRunPrompt
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('Click microphone to speak your question or command...');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      handleStopAll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleListen = () => {
    if (isListening) {
      voiceEngine.stopListening();
      setIsListening(false);
      setStatusMsg('Listening paused. Review spoken prompt below.');
    } else {
      setErrorMsg('');
      const started = voiceEngine.startListening(
        (text, _isFinal) => {
          setTranscript(text);
          setStatusMsg('Listening to your voice... Speak clearly.');
        },
        (err) => {
          setErrorMsg(err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );

      if (started) {
        setIsListening(true);
        voiceEngine.stopSpeaking();
        setIsSpeaking(false);
      }
    }
  };

  const handleSpeakText = (text: string) => {
    if (isSpeaking) {
      voiceEngine.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      voiceEngine.speak(text, () => setIsSpeaking(false));
    }
  };

  const handleStopAll = () => {
    voiceEngine.stopListening();
    voiceEngine.stopSpeaking();
    setIsListening(false);
    setIsSpeaking(false);
  };

  const handleExecutePrompt = () => {
    if (!transcript.trim()) return;
    const finalPrompt = transcript;
    handleStopAll();
    onRunPrompt(finalPrompt);
    onClose();
  };

  const QUICK_COMMANDS = [
    'Evaluate 3-level ANPC SiC MOSFET inverter efficiency at 10kHz PWM',
    'Audit literature DOIs for high temperature semiconductor thermal limits',
    'Run full quantitative Monte Carlo loss simulation'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-mono select-none">
      <div className="w-full max-w-lg bg-[#0F141C] border border-[#212936] rounded-sm shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="p-3 border-b border-[#212936] bg-[#161D27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider font-mono">
              VOICE AI ASSISTANT & HANDS-FREE CONTROLLER
            </h2>
          </div>
          <button onClick={() => { handleStopAll(); onClose(); }} className="p-1 rounded text-[#94A3B8] hover:text-[#F1F5F9]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center justify-center space-y-5 text-center">
          {/* Animated Microphone Sphere */}
          <div className="relative flex items-center justify-center">
            {isListening && (
              <div className="absolute w-24 h-24 rounded-full bg-[#38BDF8]/20 animate-ping" />
            )}
            <button
              onClick={handleToggleListen}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer border-2 z-10 shadow-lg ${
                isListening
                  ? 'bg-[#38BDF8] text-[#0F141C] border-[#38BDF8] shadow-[#38BDF8]/30 scale-105'
                  : 'bg-[#161D27] text-[#CBD5E1] border-[#212936] hover:border-[#38BDF8]'
              }`}
            >
              {isListening ? (
                <Mic className="w-8 h-8 animate-pulse text-[#0F141C]" />
              ) : (
                <MicOff className="w-8 h-8 text-[#94A3B8]" />
              )}
            </button>
          </div>

          {/* Status Message & Soundwave */}
          <div className="space-y-1">
            <p className={`text-xs font-mono font-bold ${isListening ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`}>
              {statusMsg}
            </p>
            {isListening && (
              <div className="flex items-center justify-center gap-1 h-4 pt-1">
                {[40, 70, 100, 60, 30, 80, 50, 90, 40].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-[#38BDF8] rounded-full animate-bounce"
                    style={{ height: `${h}%`, animationDelay: `${idx * 0.1}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded text-[11px] text-[#EF4444] font-mono">
              {errorMsg}
            </div>
          )}

          {/* Live Transcript Display Box */}
          <div className="w-full bg-[#161D27] border border-[#212936] rounded p-3 text-left min-h-[90px] max-h-[140px] overflow-y-auto space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
              <span>SPOKEN TRANSCRIPT</span>
              {transcript && (
                <button
                  onClick={() => handleSpeakText(transcript)}
                  className="flex items-center gap-1 text-[#38BDF8] hover:underline cursor-pointer"
                >
                  {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  <span>{isSpeaking ? 'Stop Audio' : 'Listen Back'}</span>
                </button>
              )}
            </div>
            <p className="text-xs text-[#F1F5F9] font-sans">
              {transcript ? transcript : <span className="italic text-[#94A3B8]">Your spoken question will appear here in real-time...</span>}
            </p>
          </div>

          {/* Quick Voice Command Chips */}
          <div className="w-full space-y-1.5 text-left font-mono">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold">OR SELECT QUICK VOICE COMMAND</span>
            <div className="space-y-1 text-xs">
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setTranscript(cmd)}
                  className="w-full text-left p-2 bg-[#161D27] hover:bg-[#212936] border border-[#212936] rounded text-[#CBD5E1] text-[11px] font-sans transition-colors truncate cursor-pointer"
                >
                  "{cmd}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#212936] bg-[#161D27] flex items-center justify-between font-mono">
          <button
            onClick={() => { handleStopAll(); onClose(); }}
            className="btn-secondary py-1.5 px-3 text-xs"
          >
            CANCEL
          </button>

          <button
            onClick={handleExecutePrompt}
            disabled={!transcript.trim()}
            className={`btn-primary py-1.5 px-4 text-xs ${!transcript.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>START RESEARCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
