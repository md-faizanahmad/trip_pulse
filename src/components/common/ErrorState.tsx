type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border border-(--destination-secondary)/30 bg-(--destination-secondary)/5 p-5 sm:flex-row">
      <p className="text-sm font-medium text-(--destination-secondary)">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--destination-primary) px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--destination-secondary)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
          <path d="M4 5v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
          <path d="M20 19v-4h-4" />
        </svg>

        <span>Retry</span>
      </button>
    </div>
  );
}
