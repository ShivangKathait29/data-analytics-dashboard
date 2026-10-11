import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ onOpenMenu }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
      <button
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
      >
        <Menu size={18} />
      </button>

      <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        E Commerce Analytics
      </h1>

      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
