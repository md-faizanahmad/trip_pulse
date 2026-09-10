"use client";

import { useEffect, useState } from "react";
import { useDestinationSearch } from "@/hooks/useDestinationSearch";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";
import DestinationSearchResults from "@/components/destinations/DestinationSearchResults";
import { validateDestinationQuery } from "@/validation/validation";
import SearchSkeleton from "./SearchSkeleton";

const POPULAR_DESTINATIONS = [
  "Dubai",
  "New York",
  "London",
  "Mumbai",
  "Australia",
];

export default function DestinationSearch() {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { destinations, status, error } = useDestinationSearch(query);

  const {
    isSupported: isVoiceSearchSupported,
    isListening,
    error: voiceError,
    startListening,
    stopListening,
  } = useVoiceSearch({
    onResult: setQuery,
  });

  const isLoading = status === "loading";
  const validationError = validateDestinationQuery(query);

  const showResults = status === "success" && destinations.length > 0;

  const showEmpty =
    status === "success" &&
    validationError === null &&
    destinations.length === 0;

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
            (prev) => (prev + 1) % POPULAR_DESTINATIONS.length,
          );
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentPlaceholder, isDeleting, placeholderIndex, query, typingSpeed]);

  function handleQueryChange(value: string) {
    const sanitizedValue = value.replace(/[^a-zA-ZÀ-ÿ\s.'-]/g, "");

    setQuery(sanitizedValue);
  }

  function handleClear() {
    setQuery("");
  }

  function handleVoiceSearch() {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  }

  return (
    <section
      className={
        status === "idle" ? "flex min-h-[calc(100vh-4rem)] items-center" : ""
      }
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Where to?
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Enter a destination or search with your voice.
          </p>
        </div>

        <form onSubmit={(event) => event.preventDefault()} className="mt-6">
          <label htmlFor="destination-search" className="sr-only">
            Search destination
          </label>

          <div className="relative">
            <input
              id="destination-search"
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={
                query ? "" : currentPlaceholder || "Search a destination..."
              }
              autoComplete="off"
              aria-busy={isLoading || isListening}
              className="w-full rounded-md border border-zinc-200/80 bg-white/75 px-4 py-3.5 pr-24 text-base font-medium text-zinc-950 shadow-sm shadow-zinc-900/5 backdrop-blur-md outline-none transition duration-200 placeholder:text-zinc-500 focus:border-zinc-400 focus:bg-white/90 focus:shadow-md focus:shadow-zinc-900/10 focus:ring-1 focus:ring-zinc-300 sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
            />

            <div className="absolute inset-y-0 right-3 flex items-center gap-1">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M5 5l10 10M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}

              {isVoiceSearchSupported && (
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  aria-label={
                    isListening ? "Stop voice search" : "Search by voice"
                  }
                  aria-pressed={isListening}
                  className={`rounded-md p-2 transition focus:outline-none focus:ring-2 focus:ring-zinc-300 ${
                    isListening
                      ? "bg-red-50 text-red-600"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`}
                  >
                    <rect
                      x="9"
                      y="3"
                      width="6"
                      height="12"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    />
                    <path
                      d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}

              {isLoading && (
                <span
                  aria-label="Searching"
                  role="status"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700"
                />
              )}
            </div>
          </div>
        </form>

        {validationError && query.trim().length > 0 && (
          <p className="mt-3 text-sm text-zinc-500" role="status">
            {validationError}
          </p>
        )}

        {voiceError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {voiceError}
          </p>
        )}

        {isListening && (
          <p className="mt-3 text-sm text-zinc-600" role="status">
            Listening...
          </p>
        )}

        {isLoading && <SearchSkeleton />}

        {status === "error" && (
          <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3" role="alert">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {showResults && (
          <DestinationSearchResults destinations={destinations} />
        )}

        {showEmpty && <DestinationSearchResults destinations={[]} />}
      </div>
    </section>
  );
}
