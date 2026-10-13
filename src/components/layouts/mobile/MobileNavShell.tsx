type MobileNavShellProps = {
  children: React.ReactNode;
};

export default function MobileNavShell({ children }: MobileNavShellProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-white/65 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch">{children}</div>
    </nav>
  );
}
