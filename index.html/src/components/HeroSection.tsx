import React, { useState } from "react";
import { ArchivesStoreType } from "../data/store";
import { booksList } from "../data/books";
import { BookOpen, Award, ShieldAlert, Sparkles, AlertCircle, ArrowRight, BookMarked, Brain } from "lucide-react";

interface HeroSectionProps {
  store: ArchivesStoreType;
}

export default function HeroSection({ store }: HeroSectionProps) {
  const { setActiveTab, setActiveBookId, setActiveItem } = store;
  const [showManifesto, setShowManifesto] = useState(false);

  const startReadingBook = (bookId: string) => {
    setActiveBookId(bookId);
    setActiveTab("library");
    // Default to the first entry (Rule 1 or Scenario 1 etc)
    if (bookId === "white-room-rules") {
      setActiveItem({ id: "rule-1", type: "rule", number: 1 });
    } else if (bookId === "strategic-behavior") {
      setActiveItem({ id: "scenario-1", type: "scenario", number: 1 });
    } else {
      setActiveItem({ id: "nature-chapter-1", type: "chapter" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-950/40">
      
      {/* Decorative luxury architectural grid backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28 lg:px-8">
        
        {/* Core Manifesto Alert Bar */}
        <div className="mx-auto max-w-3xl text-center mb-8">
          <div className="inline-flex items-center space-x-2 border border-neutral-300 bg-white px-3 py-1 text-xs tracking-wider uppercase text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>2026 Academic Catalog</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Free Forever</span>
          </div>
        </div>

        {/* Hero Copywriting */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white leading-none">
            THE WHITE ROOM ARCHIVES
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-sans tracking-wide text-neutral-600 dark:text-neutral-300">
            Master Human Nature. <span className="font-light text-neutral-400">Master Yourself.</span>
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            A premium full-scale digital library dedicated to behavioral psychology, self-mastery, cognitive science, personal discipline, emotional regulation, and tactical social dynamics. Designed exclusively for uninterrupted intellectual incubation.
          </p>

          <div className="mt-8 flex justify-center space-x-3">
            <button
              id="hero-start-reading"
              onClick={() => {
                setActiveTab("library");
                setActiveBookId("white-room-rules");
                setActiveItem({ id: "rule-1", type: "rule", number: 1 });
              }}
              className="flex items-center space-x-2 border border-neutral-950 bg-neutral-950 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-white hover:bg-neutral-800 transition-colors dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
            >
              <BookOpen className="h-4 w-4" />
              <span>Start Reading</span>
            </button>
            <button
              id="hero-view-manifesto"
              onClick={() => setShowManifesto(!showManifesto)}
              className="flex items-center space-x-2 border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950 transition-all dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Free Will Manifesto</span>
            </button>
          </div>
        </div>

        {/* Dynamic Manifesto Drawer Alert */}
        {showManifesto && (
          <div className="mx-auto max-w-3xl mt-8 border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-neutral-900 mt-0.5 dark:text-white" />
              <div className="space-y-2">
                <h4 className="font-serif text-sm font-semibold text-neutral-950 dark:text-white">Our Sovereign Commitment</h4>
                <p className="text-xs text-neutral-500 leading-relaxed dark:text-neutral-400">
                  We believe that elite knowledge represents a universal human legacy, which must never be hoarded under artificial locks. The White Room Archives proudly maintains these strict protocols:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono uppercase text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-500">✓</span>
                    <span>No Paywalls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-500">✓</span>
                    <span>No Subscriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-500">✓</span>
                    <span>No Advertisements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-500">✓</span>
                    <span>No Locked Chapters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Flagship Book Catalogs */}
        <div className="mx-auto max-w-6xl mt-16 sm:mt-24">
          <div className="text-center mb-8">
            <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Flagship Core Manuals
            </h2>
            <div className="mx-auto mt-2 h-px w-12 bg-neutral-900 dark:bg-neutral-200" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {booksList.map((book) => (
              <div
                key={book.id}
                className="group flex flex-col justify-between border border-neutral-200 bg-white p-6 shadow-sm hover:translate-y-[-2px] transition-all hover:border-neutral-950 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-600 dark:hover:shadow-neutral-900/10"
              >
                <div>
                  {/* Book Spine Icon Theme */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-neutral-100 bg-neutral-50 text-xl text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
                    {book.coverSymbol}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-neutral-950 dark:text-white">
                    {book.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    {book.category}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {book.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 font-mono mb-3">
                    <span>TIMELINE</span>
                    <span>{book.estimatedReadingTime.split("(")[0]}</span>
                  </div>

                  <button
                    onClick={() => startReadingBook(book.id)}
                    className="flex w-full items-center justify-between border border-neutral-200 bg-neutral-50 px-3 py-2 text-[10px] font-mono tracking-wider uppercase text-neutral-800 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-950"
                  >
                    <span>Initiate Incubation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 Platform Highlights - Grid Highlights */}
        <div className="mx-auto max-w-6xl mt-16 sm:mt-24 border-t border-neutral-200 pt-12 dark:border-neutral-900">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-950 dark:text-white">AI Reading Companion</h4>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Interact with our server-side cognitive engine. Highlight book selections to ask deep queries, parse case studies, and trigger dynamic rules generation.
                </p>
              </div>
            </div>
            <div className="flex space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-950 dark:text-white">Interactive Quiz Lab</h4>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Assess your situational social reasoning and emotional boundaries under simulated scenarios. Earn points to level up your Personal Growth index.
                </p>
              </div>
            </div>
            <div className="flex space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white">
                <BookMarked className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-950 dark:text-white">Personal Growth Logs</h4>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Review bookmarks, manage rich marginal notes, study milestones, and watch your discipline streak grow dynamically in our clean dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
