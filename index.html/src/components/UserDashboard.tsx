import React from "react";
import { ArchivesStoreType } from "../data/store";
import { booksList } from "../data/books";
import { Trash2, Bookmark, FileText, Zap, Award, CheckCircle, RefreshCw, Layers } from "lucide-react";

interface UserDashboardProps {
  store: ArchivesStoreType;
}

export default function UserDashboard({ store }: UserDashboardProps) {
  const { progress, deleteNote, deleteHighlight, setActiveTab, setActiveBookId, setActiveItem, resetAllProgress, theme } = store;

  const handleResumeBookMark = (itemId: string, bookId: string) => {
    setActiveBookId(bookId);
    let number: number | undefined;
    let type: "rule" | "scenario" | "chapter";

    if (itemId.startsWith("rule-")) {
      number = parseInt(itemId.replace("rule-", ""));
      type = "rule";
    } else if (itemId.startsWith("scenario-")) {
      number = parseInt(itemId.replace("scenario-", ""));
      type = "scenario";
    } else {
      type = "chapter";
    }

    setActiveItem({ id: itemId, type, number });
    setActiveTab("library");
  };

  // Compute Achievements dynamically
  const achievementsList = [
    {
      id: "ach-1",
      title: "Emotional Shield",
      description: "Marked the Rule of Emotional Buffer Complete",
      unlocked: progress.completedItems.includes("rule-1")
    },
    {
      id: "ach-2",
      title: "Tactical Response",
      description: "Resolved the public disrespect scenario securely",
      unlocked: progress.completedItems.includes("scenario-1")
    },
    {
      id: "ach-3",
      title: "Active Scribe",
      description: "Logged at least 2 detailed marginal research notes",
      unlocked: progress.notes.length >= 2
    },
    {
      id: "ach-4",
      title: "High Scholar",
      description: "Scored more than 150 Personal Growth points",
      unlocked: progress.quizScore >= 150
    }
  ];

  const totalCompleted = progress.completedItems.length;
  // Compute percentage calculations for each book
  const rulesCompleted = progress.completedItems.filter(id => id.startsWith("rule")).length;
  const scenariosCompleted = progress.completedItems.filter(id => id.startsWith("scenario")).length;
  const chaptersCompleted = progress.completedItems.filter(id => !id.startsWith("rule") && !id.startsWith("scenario")).length;

  const growthLevel = Math.floor(progress.quizScore / 150) + 1;
  const xpNeededForNextLevel = 150 - (progress.quizScore % 150);
  const xpProgressPercent = Math.round(((progress.quizScore % 150) / 150) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Visual Header Grid stats banner */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        
        {/* Metric 1: Streak */}
        <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">Incubation Streak</span>
          <div className="flex items-center space-x-2 mt-1">
            <Zap className="h-6 w-6 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{progress.streak} <span className="text-sm font-light text-neutral-400">Days</span></span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">Maintain continuous daily login routines to increase sifting discipline multiplier.</p>
        </div>

        {/* Metric 2: Growth points */}
        <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">Sovereign Focus Score</span>
          <div className="flex items-center space-x-2 mt-1">
            <Zap className="h-6 w-6 text-neutral-900 fill-neutral-900 dark:text-white dark:fill-white" />
            <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{progress.quizScore} <span className="text-sm font-light text-neutral-400">PTS</span></span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400">
            <span>LV {growthLevel}</span>
            <span>{xpNeededForNextLevel} pts to next lvl</span>
          </div>
          <div className="mt-1 h-1 w-full bg-neutral-100 rounded-full overflow-hidden dark:bg-neutral-900">
            <div className="h-full bg-neutral-950 rounded-full dark:bg-white" style={{ width: `${xpProgressPercent}%` }} />
          </div>
        </div>

        {/* Metric 3: Archives Penetrated */}
        <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">Chapters Penetrated</span>
          <div className="flex items-center space-x-2 mt-1">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{totalCompleted} <span className="text-sm font-light text-neutral-400">Docs</span></span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">Combined completed rules, strategic scenarios and psychology case studies.</p>
        </div>

        {/* Metric 4: Academic Notes logged */}
        <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">Marginal Notes Saved</span>
          <div className="flex items-center space-x-2 mt-1">
            <FileText className="h-6 w-6 text-neutral-600" />
            <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{progress.notes.length} <span className="text-sm font-light text-neutral-400">Notes</span></span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">Custom analytical logs captured during active handbooks incubation phases.</p>
        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left Side: Roadmaps, Chapters completed, Bookmarks lists (2 columns width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Bookmarks Division (Immediate Resume triggers) */}
          <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-base font-bold text-neutral-950 mb-4 dark:text-white uppercase tracking-wider">Bookmarked Chapters</h3>
            {progress.bookmarks.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-4">No bookmarks flagged. Set bookmark triggers inside Chapter readers for quick launch options.</p>
            ) : (
              <div className="space-y-2">
                {progress.bookmarks.map(id => {
                  let bookId = "white-room-rules";
                  let displayName = id;
                  let bookTitle = "The White Room Rules";

                  if (id.startsWith("rule-")) {
                    bookId = "white-room-rules";
                    displayName = `Rule #${id.replace("rule-", "")}`;
                    bookTitle = "The White Room Rules";
                  } else if (id.startsWith("scenario-")) {
                    bookId = "strategic-behavior";
                    displayName = `Situation #${id.replace("scenario-", "")}`;
                    bookTitle = "Strategic Behavior";
                  } else {
                    bookId = "understanding-human-nature";
                    displayName = id.includes("-1") ? "Anatomy of Cognitive Biases" : "Deciphering Body Language";
                    bookTitle = "Understanding Human Nature";
                  }

                  return (
                    <div 
                      key={id}
                      className="flex items-center justify-between border border-neutral-100 p-3 hover:border-neutral-900 transition-colors dark:border-neutral-900 dark:hover:border-white"
                    >
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-neutral-950 dark:text-white">{displayName}</h4>
                        <p className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">{bookTitle}</p>
                      </div>
                      <button
                        onClick={() => handleResumeBookMark(id, bookId)}
                        className="border border-neutral-200 hover:border-neutral-900 bg-neutral-50 px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white"
                      >
                        Resume Reading →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Notes Division (Logs list) */}
          <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-base font-bold text-neutral-950 mb-4 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <FileText className="h-5 w-5 text-neutral-800 dark:text-white" />
              <span>Incubation Research Logs</span>
            </h3>
            {progress.notes.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-4">Your private marginal logs are empty. Jot down reflections inside the Reader page notes box.</p>
            ) : (
              <div className="space-y-4">
                {progress.notes.map(note => (
                  <div key={note.id} className="border-l-2 border-neutral-900 pl-4 py-1 space-y-2 dark:border-white">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-serif text-xs font-semibold text-neutral-900 dark:text-white">{note.itemTitle}</span>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">
                          {note.bookId === "white-room-rules" ? "The White Room Rules" : (note.bookId === "strategic-behavior" ? "Strategic Behavior" : "Understanding Human Nature")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-[10px] font-mono text-neutral-400">
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-500 hover:text-red-700 font-mono flex items-center space-x-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Burn</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 p-2 text-justify italic rounded-sm border border-neutral-100 dark:border-none">
                      "{note.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Highlighted selections index log */}
          <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-base font-bold text-neutral-950 mb-4 dark:text-white uppercase tracking-wider">Synchronized Highlights</h3>
            {progress.highlights.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-4">No highlights registered. Drag-select content inside the book page to lock critical formulas.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {progress.highlights.map(hl => (
                  <div key={hl.id} className="border border-neutral-200 p-3 bg-neutral-50 rounded-sm dark:bg-neutral-900/40 dark:border-neutral-850 justify-between flex flex-col">
                    <p className="text-xs text-neutral-700 italic dark:text-neutral-300">"{hl.text}"</p>
                    <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between font-mono text-[9px] text-neutral-400 dark:border-neutral-800">
                      <span>DOC ID: {hl.itemId.toUpperCase()}</span>
                      <button
                        onClick={() => deleteHighlight(hl.id)}
                        className="text-red-500 hover:text-red-700 uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Columns: Achievements & Daily Goals list */}
        <div className="space-y-6">
          
          {/* Daily Goals Checklist module */}
          <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-sm font-bold text-neutral-950 mb-3 dark:text-white uppercase tracking-wider">Sovereign Daily Rituals</h3>
            
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-start space-x-3.5">
                <input
                  type="checkbox"
                  checked={totalCompleted >= 1}
                  readOnly
                  className="mt-0.5 rounded-sm accent-neutral-950 h-3.5 w-3.5"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Incubate Handbook</h4>
                  <p className="text-[10px] text-neutral-400">Sift through at least 1 rule or situation chapter to nourish baseline discipline.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <input
                  type="checkbox"
                  checked={progress.notes.length >= 1}
                  readOnly
                  className="mt-0.5 rounded-sm accent-neutral-950 h-3.5 w-3.5"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Note Logger</h4>
                  <p className="text-[10px] text-neutral-400">Anchor a self-reflection or practical exercise within your marginal note pads.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <input
                  type="checkbox"
                  checked={progress.quizScore > 120}
                  readOnly
                  className="mt-0.5 rounded-sm accent-neutral-950 h-3.5 w-3.5"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Quiz Evaluation</h4>
                  <p className="text-[10px] text-neutral-400">Participate in a custom simulation quiz to audit tactical behavior matrices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Achievements list */}
          <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-sm font-bold text-neutral-950 mb-3 dark:text-white uppercase tracking-wider">Personal Growth Badges</h3>
            
            <div className="space-y-3 font-sans">
              {achievementsList.map(ach => (
                <div 
                  key={ach.id} 
                  className={`flex items-start space-x-3 p-2.5 rounded-sm ${
                    ach.unlocked
                      ? "bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-white"
                      : "opacity-40 text-neutral-400"
                  }`}
                >
                  <Award className={`h-5 w-5 shrink-0 ${ach.unlocked ? 'text-amber-500 fill-amber-500/20' : 'text-neutral-300'}`} />
                  <div>
                    <h4 className="text-xs font-semibold">{ach.title}</h4>
                    <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Progress Danger Zone (clean utility fallback) */}
          <div className="border border-red-200 bg-red-50/20 p-5 rounded-sm dark:border-red-950 dark:bg-neutral-950">
            <h4 className="font-semibold text-xs text-red-600 dark:text-red-400 uppercase tracking-widest">Incubator Danger Zone</h4>
            <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">Need to wipe local storage cache, reset analytical streaks, and delete captured notes? Perform complete ledger wipe:</p>
            <button
              onClick={() => {
                if (confirm("Reset Protocols: This will erase all highlighted selections, notes, bookmarks, and growth multipliers. Do you confirm?")) {
                  resetAllProgress();
                  alert("Archive memory completely Purged. Restarting sovereign incubation.");
                }
              }}
              className="mt-4 border border-red-300 hover:border-red-600 bg-white text-red-500 px-3 py-1.5 text-[10px] font-mono uppercase rounded-sm dark:bg-neutral-900 dark:border-red-950"
            >
              Wipe Scholar memory
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
