import { RotateCcw } from "lucide-react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mt-6 flex flex-col items-center justify-center gap-3 bg-(--destination-secondary)/2 p-6 text-center"
    >
      <p className="text-sm font-medium text-(--destination-secondary)">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--destination-primary) px-4 text-sm font-medium text-white transition-colors hover:bg-(--destination-secondary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--destination-primary)/50 focus-visible:ring-offset-2"
      >
        <RotateCcw size={15} aria-hidden="true" />
        <span>Retry</span>
      </button>
    </div>
  );
}
