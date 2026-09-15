import { useEffect, useState } from "react";
import { validateDestinationQuery } from "@/validation/validation";

const POPULAR_DESTINATIONS = [
  "Dubai",
  "New York",
  "London",
  "Mumbai",
  "Australia",
];

export function useDestinationSearchUI() {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const validationError = validateDestinationQuery(query);

  const handleQueryChange = (value: string) => {
    const sanitizedValue = value.replace(/[^a-zA-ZÀ-ÿ\s.'-]/g, "");

    setQuery(sanitizedValue);
  };

  const handleVoiceResult = (value: string) => {
    handleQueryChange(value);
  };

  const handleClear = () => {
    setQuery("");
  };

  useEffect(() => {
    if (query) return;

    const fullText = `Try searching "${POPULAR_DESTINATIONS[placeholderIndex]}"`;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentPlaceholder(
          fullText.substring(0, currentPlaceholder.length + 1),
        );

        if (currentPlaceholder === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
          setTypingSpeed(100);
        }
      } else {
        setCurrentPlaceholder(
          fullText.substring(0, currentPlaceholder.length - 1),
        );

        if (currentPlaceholder === "") {
          setIsDeleting(false);
          setPlaceholderIndex(
            (previousIndex) =>
              (previousIndex + 1) % POPULAR_DESTINATIONS.length,
          );
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentPlaceholder, isDeleting, placeholderIndex, query, typingSpeed]);

  return {
    query,
    currentPlaceholder,
    validationError,
    handleQueryChange,
    handleVoiceResult,
    handleClear,
  };
}
