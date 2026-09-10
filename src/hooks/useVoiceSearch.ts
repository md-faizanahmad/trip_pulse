"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  SpeechRecognitionInstance,
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

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const isSupported =
    typeof window !== "undefined" &&
    Boolean(
      (window as SpeechRecognitionWindow).SpeechRecognition ||
      (window as SpeechRecognitionWindow).webkitSpeechRecognition,
    );

  useEffect(() => {
    if (!isSupported) {
      return;
    }

    const speechWindow = window as SpeechRecognitionWindow;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (transcript) {
        onResultRef.current(transcript);
      }
    };

    recognition.onerror = (event) => {
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
  }, [isSupported, language]);

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
      setError("Could not stop voice search.");
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
