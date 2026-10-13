type MobileNavShellProps = {
  children: React.ReactNode;
};

export default function MobileNavShell({ children }: MobileNavShellProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/80 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch">{children}</div>
    </nav>
  );
}
