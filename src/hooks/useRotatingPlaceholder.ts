"use client";

import { useEffect, useState } from "react";

const POPULAR_DESTINATIONS = [
  "Dubai",
  "New York",
  "London",
  "Mumbai",
  "Australia",
];

export function useRotatingPlaceholder(enabled: boolean) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fullText = `Try searching "${POPULAR_DESTINATIONS[placeholderIndex]}"`;

    const isComplete = currentPlaceholder === fullText;

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = fullText.slice(0, currentPlaceholder.length + 1);

          setCurrentPlaceholder(nextText);

          if (nextText === fullText) {
            setIsDeleting(true);
          }
        } else {
          const nextText = currentPlaceholder.slice(0, -1);

          setCurrentPlaceholder(nextText);

          if (nextText.length === 0) {
            setIsDeleting(false);
            setPlaceholderIndex(
              (previous) => (previous + 1) % POPULAR_DESTINATIONS.length,
            );
          }
        }
      },
      isDeleting && isComplete ? 1500 : isDeleting ? 100 : 150,
    );

    return () => clearTimeout(timer);
  }, [enabled, placeholderIndex, currentPlaceholder, isDeleting]);

  return enabled ? currentPlaceholder : "";
}
