import React, { useState } from "react";
import { ArchivesStoreType } from "../data/store";
import { booksList, allRulesIndex, allScenariosIndex, allChaptersIndex } from "../data/books";
import { Search, Compass, BookOpen, AlertCircle, RefreshCw, Bookmark, CheckCircle, Zap } from "lucide-react";

interface LibraryExplorerProps {
  store: ArchivesStoreType;
}

export default function LibraryExplorer({ store }: LibraryExplorerProps) {
  const { 
    progress, 
    activeBookId, 
    setActiveBookId, 
    setActiveItem, 
    setActiveTab 
  } = store;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  const activeBook = booksList.find(b => b.id === activeBookId);

  // Manage rendering of the Table of contents for the selected book
  const renderTableOfContents = () => {
    if (!activeBook) return null;

    if (activeBook.id === "white-room-rules") {
      const filteredRules = allRulesIndex.filter(rule => {
        const matchesQuery = rule.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             rule.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = activeCategoryFilter === "all" || rule.category === activeCategoryFilter;
        return matchesQuery && matchesCat;
      });

      // Categories list for Rule filtering
      const categories = ["all", "Emotional Regulation", "Observation & Perception", "Strategic Thinking", "Discipline & Self-Mastery"];

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4 dark:border-neutral-900">
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">Handbook Index: 100 Rules</h3>
              <p className="text-xs text-neutral-400">Rules 1–4 are pre-loaded. Rules 5–100 will be compiled instantly on-the-fly by our server's artificial intelligence.</p>
            </div>

            {/* Rule Categories Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                    activeCategoryFilter === cat
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400"
                  }`}
                >
                  {cat === "all" ? "All Divisions" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRules.map(rule => {
              const ruleId = `rule-${rule.number}`;
              const isCompleted = progress.completedItems.includes(ruleId);
              const isBookmarked = progress.bookmarks.includes(ruleId);

              return (
                <button
                  key={rule.number}
                  id={`rule-item-${rule.number}`}
                  onClick={() => {
                    setActiveItem({ id: ruleId, type: "rule", number: rule.number });
                    setActiveTab("library");
                  }}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-4 text-left transition-all hover:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 hover:dark:border-white"
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-neutral-400">RULE #{String(rule.number).padStart(2, '0')}</span>
                      <div className="flex items-center space-x-1.5">
                        {isBookmarked && <Bookmark className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        {isCompleted ? (
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        )}
                      </div>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-neutral-900 mt-2 line-clamp-1 dark:text-white group-hover:underline">
                      {rule.title}
                    </h4>
                    <p className="mt-1 font-mono text-[9px] tracking-wider uppercase text-neutral-400">
                      {rule.category}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-50 dark:border-neutral-900">
                    <span>{rule.isStatic ? "ACADEMIC ARCHIVE" : "AI EXPANDABLE"}</span>
                    <span className="text-neutral-900 dark:text-white">Read Rule →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeBook.id === "strategic-behavior") {
      const filteredScenarios = allScenariosIndex.filter(scenario => 
        scenario.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(scenario.number).includes(searchQuery)
      );

      return (
        <div className="space-y-6">
          <div className="border-b border-neutral-100 pb-4 dark:border-neutral-900">
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">The Workbook Index: 50 Scenarios</h3>
            <p className="text-xs text-neutral-400">Situations 1–2 are preloaded. Situations 3–50 are generated on demand to fit modern commercial workflows.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredScenarios.map(sc => {
              const scenarioId = `scenario-${sc.number}`;
              const isCompleted = progress.completedItems.includes(scenarioId);
              const isBookmarked = progress.bookmarks.includes(scenarioId);

              return (
                <button
                  key={sc.number}
                  id={`scenario-item-${sc.number}`}
                  onClick={() => {
                    setActiveItem({ id: scenarioId, type: "scenario", number: sc.number });
                    setActiveTab("library");
                  }}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-4 text-left transition-all hover:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 hover:dark:border-white"
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-neutral-400">SITUATION #{String(sc.number).padStart(2, '0')}</span>
                      <div className="flex items-center space-x-1.5">
                        {isBookmarked && <Bookmark className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        {isCompleted ? (
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        )}
                      </div>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-neutral-900 mt-2 line-clamp-2 dark:text-white">
                      {sc.isStatic ? sc.topic : sc.topic}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-50 dark:border-neutral-900">
                    <span>{sc.isStatic ? "CORE SCENARIO" : "AI WORKBOOK"}</span>
                    <span className="text-neutral-900 dark:text-white">Examine →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeBook.id === "understanding-human-nature") {
      const filteredChapters = allChaptersIndex.filter(ch => 
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ch.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="space-y-6">
          <div className="border-b border-neutral-100 pb-4 dark:border-neutral-900">
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">Textbook Index: 12 Core Chapters</h3>
            <p className="text-xs text-neutral-400">Chapters 1–2 are pre-compiled manually. Chapters 3–12 dynamically formulate high-level neuro-psychology metrics.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredChapters.map((ch, idx) => {
              const orderNum = idx + 1;
              const isCompleted = progress.completedItems.includes(ch.id);
              const isBookmarked = progress.bookmarks.includes(ch.id);

              return (
                <button
                  key={ch.id}
                  id={`chapter-item-${ch.id}`}
                  onClick={() => {
                    setActiveItem({ id: ch.id, type: "chapter" });
                    setActiveTab("library");
                  }}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-5 text-left transition-all hover:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 hover:dark:border-white"
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>CHAPTER {String(orderNum).padStart(2, '0')}</span>
                      <div className="flex items-center space-x-1.5">
                        {isBookmarked && <Bookmark className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        {isCompleted && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                      </div>
                    </div>
                    <h4 className="font-serif text-base font-bold text-neutral-900 mt-2 dark:text-white">
                      {ch.title}
                    </h4>
                    <p className="mt-1 font-mono text-[10px] tracking-wider uppercase text-neutral-400">
                      {ch.category}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-50 dark:border-neutral-900">
                    <span>{ch.isStatic ? "ACADEMIC TREATISE" : "AI REASONING DEPTH"}</span>
                    <span className="text-neutral-950 font-semibold dark:text-white">Open Chapter →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 mb-6">
        <button onClick={() => setActiveBookId(null)} className="hover:text-neutral-900">ARCHIVES ROOT</button>
        {activeBook && (
          <>
            <span>/</span>
            <span className="text-neutral-800 dark:text-neutral-200 uppercase">{activeBook.title}</span>
          </>
        )}
      </div>

      {activeBook ? (
        /* Expanded Book Detail: Table of Contents & Search */
        <div className="space-y-8">
          
          {/* Header Card */}
          <div className="border border-neutral-900 bg-white p-6 dark:border-white dark:bg-neutral-950">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{activeBook.category}</span>
                <h2 className="font-serif text-2xl font-extrabold text-neutral-950 mt-1 dark:text-white">{activeBook.title}</h2>
                <p className="text-sm text-neutral-500 max-w-2xl mt-2 dark:text-neutral-400">{activeBook.description}</p>
              </div>
              <button
                id="library-back-btn"
                onClick={() => {
                  setActiveBookId(null);
                  setSearchQuery("");
                  setActiveCategoryFilter("all");
                }}
                className="shrink-0 border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-mono tracking-wider uppercase text-neutral-800 hover:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white"
              >
                ← Back to Shell
              </button>
            </div>
            
            {/* Search Input Bar inside table of contents */}
            <div className="mt-6 flex items-center space-x-3 border-t border-neutral-100 pt-4 dark:border-neutral-900">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                id="library-search-input"
                type="text"
                placeholder="Search index keywords, principles, titles, subdivisions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none dark:text-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="text-xs text-neutral-400 hover:text-neutral-950"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Actual expanded Chapters grids */}
          {renderTableOfContents()}

        </div>
      ) : (
        /* Root Shell: List 3 Flagship Books */
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-neutral-900 dark:text-white">THE INTELLECTUAL SHELTER</h2>
            <p className="text-sm text-neutral-400 mt-1">Select one of our three foundational handbooks to catalog, read, or cross-compile.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {booksList.map((book) => {
              // Calculate completion percentage or items
              let totalItems = 0;
              let itemsPrefix = "";
              if (book.id === "white-room-rules") { totalItems = 100; itemsPrefix = "rule"; }
              else if (book.id === "strategic-behavior") { totalItems = 50; itemsPrefix = "scenario"; }
              else { totalItems = 12; itemsPrefix = "nature-chapter"; }

              const completedForThisBook = progress.completedItems.filter(id => id.startsWith(itemsPrefix)).length;
              const percentage = Math.round((completedForThisBook / totalItems) * 100);

              return (
                <div
                  key={book.id}
                  id={`library-book-card-${book.id}`}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">{book.category}</span>
                      <span className="text-xl text-neutral-900 dark:text-white">{book.coverSymbol}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-neutral-900 mt-4 dark:text-white leading-tight">
                      {book.title}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                    
                    {/* Compact progress progress slider bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                        <span>LIBRARY PENETRATION</span>
                        <span>{completedForThisBook}/{totalItems} ({percentage}%)</span>
                      </div>
                      <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden dark:bg-neutral-900">
                        <div 
                          className="h-full bg-neutral-950 rounded-full dark:bg-white" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveBookId(book.id)}
                      className="flex w-full items-center justify-center space-x-2 border border-neutral-900 bg-neutral-950 text-white py-2 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Browse Index</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Guidance Alert Box */}
          <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Sovereign Incubation Sandbox</h4>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Every chapter possesses dynamic bookmark hooks, note pads, and a direct pipeline connection to our server-side Gemini AI. When navigating non-loaded rules or chapters, clicking them notifies the server which compiles the exact academic thesis live for you.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
