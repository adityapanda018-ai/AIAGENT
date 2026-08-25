import { type FC, type KeyboardEvent, useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, ArrowRight } from 'lucide-react';
import { predictiveEngine, type PredictionResult } from '../services/predictiveTextEngine';
import { voiceEngine } from '../services/voiceService';

interface PredictiveTextareaProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  minRows?: number;
}

export const PredictiveTextarea: FC<PredictiveTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Enter research prompt...',
  minRows = 3
}) => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const res = predictiveEngine.predict(value);
    setPrediction(res);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && prediction?.suggestionSuffix) {
      // Check if cursor is at the end of the text
      const target = e.currentTarget;
      if (target.selectionStart === value.length) {
        e.preventDefault();
        onChange(value + prediction.suggestionSuffix);
        setPrediction(null);
      }
    }
  };

  const handleAcceptCandidate = (candidateText: string) => {
    const trimmed = value.trimEnd();
    onChange(trimmed + (trimmed.endsWith(' ') ? '' : ' ') + candidateText);
  };

  const handleVoiceDictation = () => {
    if (isListening) {
      voiceEngine.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceEngine.startListening(
        (text) => onChange(text),
        () => setIsListening(false),
        () => setIsListening(false)
      );
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Textarea Wrapper with Ghost Overlay */}
      <div className="relative bg-[#0F141C] border border-[#212936] focus-within:border-[#38BDF8] rounded-sm p-3 transition-colors">
        {/* Ghost Text Overlay Background */}
        <div className="absolute inset-0 p-3 text-xs pointer-events-none overflow-hidden font-sans leading-relaxed whitespace-pre-wrap break-words opacity-40 select-none">
          <span className="invisible">{value}</span>
          {prediction && (
            <span className="text-[#38BDF8] font-mono bg-[#38BDF8]/10 px-0.5 rounded">
              {prediction.suggestionSuffix}
            </span>
          )}
        </div>

        {/* Real Interactive Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={minRows}
          className="w-full bg-transparent text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none resize-y relative z-10 font-sans leading-relaxed pr-10"
        />

        {/* Mic Dictation Button */}
        <button
          type="button"
          onClick={handleVoiceDictation}
          className={`absolute right-2 top-2 p-1.5 rounded z-20 transition-all cursor-pointer ${
            isListening
              ? 'bg-[#38BDF8] text-[#0F141C] animate-pulse'
              : 'bg-[#161D27] text-[#94A3B8] hover:text-[#38BDF8] border border-[#212936]'
          }`}
          title={isListening ? 'Listening to voice...' : 'Voice Dictation Input'}
        >
          <Mic className="w-3.5 h-3.5" />
        </button>

        {/* Tab Key Hint Badge */}
        {prediction && (
          <div className="absolute right-2 bottom-2 z-20 flex items-center gap-1 bg-[#161D27] border border-[#38BDF8]/30 px-2 py-0.5 rounded text-[9px] font-mono text-[#38BDF8]">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Press <strong>Tab</strong> or <strong>➔</strong> to accept completion</span>
          </div>
        )}
      </div>

      {/* Candidate Prediction Chips Bar */}
      {prediction && prediction.candidateTokens.length > 0 && (
        <div className="flex items-center gap-1.5 font-mono text-[10px] flex-wrap animate-fade-in">
          <span className="text-[#94A3B8] text-[9px] uppercase font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#38BDF8]" />
            LLM PREDICTIONS ({Math.round(prediction.confidenceScore * 100)}% CONFIDENCE):
          </span>
          {prediction.candidateTokens.map((cand, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAcceptCandidate(cand)}
              className="px-2 py-0.5 bg-[#161D27] hover:bg-[#212936] text-[#CBD5E1] hover:text-[#38BDF8] border border-[#212936] hover:border-[#38BDF8]/40 rounded transition-colors flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>+ {cand}</span>
              <ArrowRight className="w-2.5 h-2.5 opacity-60" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
