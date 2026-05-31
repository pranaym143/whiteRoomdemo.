import React from "react";
import { ArchivesStoreType } from "../data/store";
import { BookOpen, User, Award, Layers, Sparkles, Sun, Moon, Zap } from "lucide-react";

interface NavbarProps {
  store: ArchivesStoreType;
}

export default function Navbar({ store }: NavbarProps) {
  const { activeTab, setActiveTab, theme, setTheme, progress, setActiveItem, setActiveBookId } = store;

  const tabs = [
    { id: "home", label: "Archives", icon: Sparkles },
    { id: "library", label: "Digital Library", icon: BookOpen },
    { id: "roadmaps", label: "Roadmaps", icon: Layers },
    { id: "quiz", label: "Quiz Lab", icon: Award },
    { id: "dashboard", label: "Dashboard", icon: User },
  ] as const;

  const totalCompleted = progress.completedItems.length;
  // Let's compute a neat Level based on points (every 150 pts is a new level!)
  const growthLevel = Math.floor(progress.quizScore / 150) + 1;

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId !== "library") {
      // Clear active book/item state when navigating away to keep things clean
      setActiveItem(null);
      setActiveBookId(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-edge bg-amber-50/50 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo - 2026 Minimal Elegance */}
        <div 
          onClick={() => handleTabChange("home")}
          className="flex cursor-pointer items-center space-x-2"
        >
          <div className="flex h-8 w-8 items-center justify-center border border-neutral-900 bg-neutral-900 text-xs font-semibold text-white tracking-wider dark:border-white dark:bg-white dark:text-neutral-950">
            W
          </div>
          <span className="font-sans text-sm font-semibold tracking-widest text-neutral-900 uppercase dark:text-white">
            THE WHITE ROOM <span className="font-light text-neutral-400">ARCHIVES</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "font-medium text-neutral-900 border-b border-neutral-900 dark:text-white dark:border-white"
                    : "font-normal text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Tracker Widgets & Theme Toggle */}
        <div className="flex items-center space-x-4">
          
          {/* Growth Tracker Bar */}
          <div className="hidden sm:flex items-center space-x-3 rounded-md bg-neutral-100/80 px-2.5 py-1 text-xs dark:bg-neutral-900/60">
            <div className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300">
              <Zap className="h-3 w-3 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="font-mono">{progress.quizScore} <span className="text-neutral-400">PTS</span></span>
            </div>
            <div className="h-3 w-px bg-neutral-200 dark:bg-neutral-800" />
            <div className="text-neutral-500 dark:text-neutral-400">
              LVL <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{growthLevel}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              title={theme === "light" ? "Activate Dark Mode" : "Activate Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Tab Rail */}
      <div className="md:hidden flex border-t border-neutral-100 bg-white shadow-sm dark:border-neutral-900 dark:bg-neutral-950">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-mob-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 text-[10px] uppercase tracking-tighter transition-colors ${
                isActive
                  ? "text-neutral-900 font-medium dark:text-white bg-neutral-50 dark:bg-neutral-900/40"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              <Icon className="h-4 w-4 mb-0.5" />
              <span>{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
