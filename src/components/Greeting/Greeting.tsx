"use client";

type GreetingProps = {
  name?: string;
  title?: "Mr" | "Mrs" | "Ms" | "Dr";
};

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
}

export default function Greeting({ name, title }: GreetingProps) {
  const greeting = getGreeting(new Date().getHours());
  const displayName = [title, name].filter(Boolean).join(" ");

  return (
    <section className="w-full">
      <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
        <span className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-(--theme-primary) sm:text-[10px] sm:tracking-widest">
          {greeting}
        </span>

        <h2 className="truncate text-base font-bold tracking-tight text-(--theme-text) sm:text-lg md:text-xl">
          {displayName || "Traveler"}
        </h2>
      </div>
    </section>
  );
}
