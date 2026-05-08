import { create } from 'zustand';

interface VoiceSessionState {
  isRecording: boolean;
  transcript: string;
  interimTranscript: string;
  aiResponse: string;
  isProcessing: boolean;
  essayContent: string;
  currentStep: 'topic' | 'subject' | 'tone' | 'writing' | 'review';
  
  startRecording: () => void;
  stopRecording: () => void;
  setTranscript: (text: string) => void;
  setInterimTranscript: (text: string) => void;
  setEssayContent: (content: string) => void;
  setStep: (step: VoiceSessionState['currentStep']) => void;
  setAIResponse: (response: string) => void;
  setIsProcessing: (loading: boolean) => void;
}

export const useVoiceStore = create<VoiceSessionState>((set) => ({
  isRecording: false,
  transcript: "",
  interimTranscript: "",
  aiResponse: "Hello! I'm your Eloquence assistant. Tell me, what topic shall we explore for your essay today?",
  isProcessing: false,
  essayContent: "",
  currentStep: 'topic',

  startRecording: () => set({ isRecording: true }),
  stopRecording: () => set({ isRecording: false, interimTranscript: "" }),
  setTranscript: (text) => set({ transcript: text }),
  setInterimTranscript: (text) => set({ interimTranscript: text }),
  setEssayContent: (content) => set({ essayContent: content }),
  setStep: (step) => set({ currentStep: step }),
  setAIResponse: (response) => set({ aiResponse: response }),
  setIsProcessing: (loading) => set({ isProcessing: loading }),
}));
