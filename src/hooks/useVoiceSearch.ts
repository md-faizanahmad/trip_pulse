"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  SpeechRecognitionErrorEvent,
  SpeechRecognitionInstance,
  SpeechRecognitionResultEvent,
  SpeechRecognitionWindow,
} from "@/types/speech-recognition";

type UseVoiceSearchOptions = {
  onResult: (value: string) => void;
  language?: string;
};

type UseVoiceSearchReturn = {
  isSupported: boolean;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
};

export function useVoiceSearch({
  onResult,
  language = "en-US",
}: UseVoiceSearchOptions): UseVoiceSearchReturn {
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onResultRef = useRef(onResult);

  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const speechWindow = window as SpeechRecognitionWindow;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        return;
      }

      onResultRef.current(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);

      switch (event.error) {
        case "not-allowed":
        case "service-not-allowed":
          setError("Microphone access was denied.");
          break;

        case "no-speech":
          setError("No speech was detected. Please try again.");
          break;

        case "audio-capture":
          setError("No microphone was found.");
          break;

        default:
          setError("Voice search is unavailable. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }

      recognitionRef.current = null;
    };
  }, [language]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;

    if (!recognition || isListening) {
      return;
    }

    setError(null);

    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
      setError("Could not start voice search. Please try again.");
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;

    if (!recognition || !isListening) {
      return;
    }

    try {
      recognition.stop();
    } catch {
      setIsListening(false);
      setError("Could not stop voice search. Please try again.");
    }
  }, [isListening]);

  return {
    isSupported,
    isListening,
    error,
    startListening,
    stopListening,
  };
}
