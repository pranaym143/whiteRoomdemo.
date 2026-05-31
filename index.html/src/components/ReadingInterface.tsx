import React, { useState, useEffect, useRef } from "react";
import { ArchivesStoreType } from "../data/store";
import { whiteRoomRulesData, strategicScenariosData, humanNatureChaptersData, allRulesIndex, allScenariosIndex, allChaptersIndex } from "../data/books";
import { RuleContent, StrategicScenario, UnderstandingChapter } from "../types";
import { Bookmark, Sparkles, Send, RefreshCw, FileText, CheckCircle, ChevronLeft, ChevronRight, CornerDownRight, ZoomIn, ZoomOut, Type } from "lucide-react";

interface ReadingInterfaceProps {
  store: ArchivesStoreType;
}

export default function ReadingInterface({ store }: ReadingInterfaceProps) {
  const { 
    progress, 
    activeItem, 
    setActiveItem, 
    toggleBookmark, 
    markCompleted, 
    addNote, 
    addHighlight, 
    setActiveTab, 
    setActiveBookId 
  } = store;

  // Reading styling local preferences
  const [fontSize, setFontSize] = useState<number>(14); // in px
  const [useSerifFont, setUseSerifFont] = useState<boolean>(true);

  // Local state for dynamically loaded AI Content
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [aiRule, setAiRule] = useState<RuleContent | null>(null);
  const [aiScenario, setAiScenario] = useState<StrategicScenario | null>(null);
  const [aiChapter, setAiChapter] = useState<UnderstandingChapter | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Notes state
  const [noteText, setNoteText] = useState("");

  // AI Assistant Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([
    { role: "model", text: "Greetings. I am your academic AI Guide. Ask me anything relative to your reading or emotional sifting protocols." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Isolate current item data or pull dynamically
  useEffect(() => {
    if (!activeItem) return;

    // Reset local dynamic cache to prevent layout bleed
    setAiRule(null);
    setAiScenario(null);
    setAiChapter(null);
    setLoadError(null);

    const isStatic = (activeItem.type === "rule" && activeItem.number! <= 4) ||
                     (activeItem.type === "scenario" && activeItem.number! <= 2) ||
                     false; // For chapters, we check if id is nature-chapter-1 or 2

    const isChapterStatic = activeItem.type === "chapter" && (activeItem.id === "nature-chapter-1" || activeItem.id === "nature-chapter-2");

    if (activeItem.type === "rule" && !isStatic) {
      loadDynamicContent("rule", activeItem.number!);
    } else if (activeItem.type === "scenario" && !isStatic) {
      loadDynamicContent("scenario", activeItem.number!);
    } else if (activeItem.type === "chapter" && !isChapterStatic) {
      loadDynamicContent("chapter", undefined, activeItem.id);
    }
  }, [activeItem]);

  const loadDynamicContent = async (type: "rule" | "scenario" | "chapter", number?: number, chapterId?: string) => {
    setLoadingContent(true);
    setLoadError(null);
    try {
      let title = "";
      let category = "";

      if (type === "rule") {
        const itemInfo = allRulesIndex.find(r => r.number === number);
        title = itemInfo?.title || "Discipline Rule";
        category = itemInfo?.category || "Self-Mastery";
      } else if (type === "scenario") {
        const itemInfo = allScenariosIndex.find(s => s.number === number);
        title = itemInfo?.topic || "Strategic Scenario";
        category = "Strategic Reaction";
      } else {
        const itemInfo = allChaptersIndex.find(c => c.id === chapterId);
        title = itemInfo?.title || "Cognitive Behavior";
        category = itemInfo?.category || "Psychology";
      }

      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, number, title, category })
      });

      if (!res.ok) throw new Error("Backend server failed to formulate text.");
      const data = await res.json();

      if (type === "rule") {
        setAiRule({ ...data, id: `rule-${number}`, number: number! });
      } else if (type === "scenario") {
        setAiScenario({ ...data, id: `scenario-${number}`, number: number! });
      } else {
        setAiChapter({ ...data, id: chapterId! });
      }
    } catch (e: any) {
      console.error(e);
      setLoadError("Server latency spiked. Unable to bridge AI Archives. Please retry.");
    } finally {
      setLoadingContent(false);
    }
  };

  if (!activeItem) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
        <FileText className="h-12 w-12 text-neutral-300 mb-4 animate-pulse" />
        <h3 className="font-serif text-lg font-semibold text-neutral-800 dark:text-neutral-200">No Document Initiated</h3>
        <p className="text-xs max-w-sm mt-1">Please browse our Digital Library index, pick a foundational handbook, and select a chapter to load the reader.</p>
        <button
          onClick={() => setActiveTab("library")}
          className="mt-6 border border-neutral-900 bg-neutral-950 px-4 py-2 text-xs font-mono tracking-wider uppercase text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
        >
          Browse Library
        </button>
      </div>
    );
  }

  // Get active textual details
  let pageTitle = "";
  let pageCategory = "";
  let isBookmarked = progress.bookmarks.includes(activeItem.id);
  const isCompleted = progress.completedItems.includes(activeItem.id);

  let staticRule: RuleContent | undefined;
  let staticScenario: StrategicScenario | undefined;
  let staticChapter: UnderstandingChapter | undefined;

  if (activeItem.type === "rule") {
    staticRule = whiteRoomRulesData.find(r => r.number === activeItem.number);
    pageTitle = staticRule ? staticRule.title : (aiRule?.title || "Rule Loading...");
    pageCategory = staticRule ? staticRule.category : (aiRule?.category || "Emotional Regulation");
  } else if (activeItem.type === "scenario") {
    staticScenario = strategicScenariosData.find(s => s.number === activeItem.number);
    pageTitle = staticScenario ? staticScenario.topic : (aiScenario?.topic || "Strategic Scenario...");
    pageCategory = "Decision Making";
  } else {
    staticChapter = humanNatureChaptersData.find(c => c.id === activeItem.id);
    pageTitle = staticChapter ? staticChapter.title : (aiChapter?.title || "Chapter Loading...");
    pageCategory = staticChapter ? staticChapter.category : (aiChapter?.category || "Cognitive Behavior");
  }

  // Handle Text Selection Highlighting
  const handleTextHighlight = () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText && selectedText.length > 3) {
      // Prompt selection
      addHighlight(
        activeItem.type === "rule" ? "white-room-rules" : (activeItem.type === "scenario" ? "strategic-behavior" : "understanding-human-nature"),
        activeItem.id,
        selectedText
      );
      alert(`Highlighted selection flagged: "${selectedText.substring(0, 40)}..." Saving to Dashboard.`);
    } else {
      alert("Highlight Instruction: Please select or select-drag a sentence inside the reading text using your cursor first, then click this button.");
    }
  };

  // Handle Notes Saving
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addNote(
      activeItem.type === "rule" ? "white-room-rules" : (activeItem.type === "scenario" ? "strategic-behavior" : "understanding-human-nature"),
      activeItem.id,
      pageTitle,
      noteText
    );
    setNoteText("");
    alert("Personal note captured and synchronized securely. View in Dashboard tab.");
  };

  // Send message to Gemini Academic Assistant
  const handleSendChatMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const prompt = customPrompt || chatInput;
    if (!prompt.trim() || sendingChat) return;

    const newUserMessage = { role: "user" as const, text: prompt };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput("");
    setSendingChat(true);

    try {
      // Gather chapter reading context to pass onto server as helper metadata
      const context = {
        itemType: activeItem.type,
        itemId: activeItem.id,
        itemTitle: pageTitle,
        itemCategory: pageCategory
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          context,
          history: chatMessages.slice(-6) // Keep last 3 dialogue rounds
        })
      });

      if (!res.ok) throw new Error("Assistant connection failed.");
      const data = await res.json();

      setChatMessages(prev => [...prev, { role: "model", text: data.text }]);
    } catch (error: any) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: "model", text: "My apologies. Our server-side neural relay experienced latency. Please try again." }]);
    } finally {
      setSendingChat(false);
    }
  };

  // Navigating Previous/Next Chapters/Rules
  const navigateBookSibling = (direction: "prev" | "next") => {
    if (activeItem.type === "rule") {
      const currentNum = activeItem.number!;
      const nextNum = direction === "prev" ? currentNum - 1 : currentNum + 1;
      if (nextNum >= 1 && nextNum <= 100) {
        setActiveItem({ id: `rule-${nextNum}`, type: "rule", number: nextNum });
      }
    } else if (activeItem.type === "scenario") {
      const currentNum = activeItem.number!;
      const nextNum = direction === "prev" ? currentNum - 1 : currentNum + 1;
      if (nextNum >= 1 && nextNum <= 50) {
        setActiveItem({ id: `scenario-${nextNum}`, type: "scenario", number: nextNum });
      }
    } else {
      // Chapters 1 to 12
      const currentIdx = allChaptersIndex.findIndex(c => c.id === activeItem.id);
      const nextIdx = direction === "prev" ? currentIdx - 1 : currentIdx + 1;
      if (nextIdx >= 0 && nextIdx < allChaptersIndex.length) {
        const nextChapter = allChaptersIndex[nextIdx];
        setActiveItem({ id: nextChapter.id, type: "chapter" });
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Dynamic hot-zone progress indicator bar */}
      <div className="mb-4 h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden dark:bg-neutral-900">
        <div 
          className="h-full bg-neutral-950 transition-all duration-300 dark:bg-white" 
          style={{ width: isCompleted ? "100%" : "40%" }}
        />
      </div>

      {/* Top Controls: back and preferences */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4 mb-6 dark:border-neutral-900">
        <button
          onClick={() => {
            setActiveItem(null);
            // Re-open library list cleanly
            setActiveBookId(activeItem.type === "rule" ? "white-room-rules" : (activeItem.type === "scenario" ? "strategic-behavior" : "understanding-human-nature"));
          }}
          className="flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-950"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Exit Reader Panel</span>
        </button>

        {/* Display Adjustments */}
        <div className="flex items-center space-x-4">
          <div className="flex border border-neutral-200 bg-white p-0.5 rounded-sm dark:border-neutral-800 dark:bg-neutral-900">
            <button
              onClick={() => setFontSize(Math.max(12, fontSize - 1))}
              className="p-1 hover:bg-neutral-100 rounded-sm dark:hover:bg-neutral-800"
              title="Decrease Font Size"
            >
              <ZoomOut className="h-3.5 w-3.5 text-neutral-500" />
            </button>
            <span className="px-2 text-xs font-mono self-center text-neutral-600 select-none">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(22, fontSize + 1))}
              className="p-1 hover:bg-neutral-100 rounded-sm dark:hover:bg-neutral-800"
              title="Increase Font Size"
            >
              <ZoomIn className="h-3.5 w-3.5 text-neutral-500" />
            </button>
          </div>

          <button
            onClick={() => setUseSerifFont(!useSerifFont)}
            className="flex items-center space-x-1 border border-neutral-200 bg-white px-2.5 py-1 text-xs font-mono text-neutral-600 rounded-sm hover:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-white"
          >
            <Type className="h-3.5 w-3.5" />
            <span>{useSerifFont ? "Serif Academic" : "Sans Minimalist"}</span>
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left/Middle Column: Primary Document Reader (2 cols width) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="border border-neutral-200 bg-white p-6 sm:p-10 dark:border-neutral-800 dark:bg-neutral-950">
            
            {/* Calming dynamic loading trigger */}
            {loadingContent ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <RefreshCw className="h-8 w-8 text-neutral-400 animate-spin mb-4" />
                <h4 className="font-serif text-sm font-semibold text-neutral-800 dark:text-neutral-200">Compiling Sovereign Archives</h4>
                <p className="text-xs text-neutral-400 max-w-xs mt-1">Establishing full-stack pipeline node to formulate structural textual metadata live...</p>
              </div>
            ) : loadError ? (
              <div className="py-20 text-center space-y-4">
                <p className="text-sm text-red-500 font-mono">{loadError}</p>
                <button
                  onClick={() => loadDynamicContent(activeItem.type, activeItem.number, activeItem.id)}
                  className="mx-auto border border-neutral-900 bg-neutral-950 px-4 py-2 text-xs font-mono tracking-wider uppercase text-white dark:border-white dark:bg-white dark:text-neutral-950"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              /* Actual textual body */
              <article 
                className={`${useSerifFont ? "font-serif" : "font-sans"} leading-relaxed text-neutral-800 dark:text-neutral-200`}
                style={{ fontSize: `${fontSize}px` }}
              >
                
                {/* Book Header Meta tags */}
                <div className="border-b border-neutral-100 pb-5 mb-8 dark:border-neutral-900">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest leading-none">{pageCategory}</span>
                  <h1 className="font-serif text-2xl font-bold text-neutral-950 mt-2 leading-tight dark:text-white sm:text-3xl">
                    {activeItem.type === "rule" && `Rule #${activeItem.number}: `}
                    {pageTitle}
                  </h1>
                </div>

                {/* 1. RULE CONTENT DIVISION */}
                {activeItem.type === "rule" && (()=>{
                  const rule = staticRule || aiRule;
                  if (!rule) return null;
                  return (
                    <div className="space-y-6">
                      
                      {/* Text Selection Tip */}
                      <div className="rounded-sm bg-neutral-50 px-3 py-2 text-xs font-sans text-neutral-400 dark:bg-neutral-900/40">
                        💡 <span className="font-medium text-neutral-500 dark:text-neutral-300">Observation Tip</span>: Drag-select phrases with your cursor, then click the floating <span className="underline">Highlight Code</span> to lock quotes into your private Dashboard history.
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">I. Structural Explanation</h3>
                        <p className="leading-relaxed indent-4">{rule.explanation}</p>
                      </div>

                      <div className="space-y-3 py-4 border-t border-b border-neutral-50 dark:border-neutral-900">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">II. Operational Example</h3>
                        <p className="leading-relaxed italic">{rule.realWorldExample}</p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">III. Practical Mission</h3>
                        <p className="leading-relaxed">{rule.practicalExercise}</p>
                      </div>

                      {/* Side reflection questions */}
                      <div className="p-5 bg-neutral-50 border border-neutral-100 rounded-sm dark:bg-neutral-900/30 dark:border-none space-y-3 font-sans">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white flex items-center space-x-1.5">
                          <CornerDownRight className="h-3.5 w-3.5" />
                          <span>Reflection Inquiries</span>
                        </h4>
                        <ul className="list-decimal pl-4 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                          {rule.reflectionQuestions?.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 pt-4 font-sans text-xs border-t border-neutral-100 dark:border-neutral-900">
                        <div>
                          <h4 className="font-bold text-red-500 uppercase">Subtle Trap</h4>
                          <p className="mt-1 text-neutral-500 leading-relaxed dark:text-neutral-400">{rule.commonMistakes}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-emerald-500 uppercase">Long-Term Dividends</h4>
                          <p className="mt-1 text-neutral-500 leading-relaxed dark:text-neutral-400">{rule.longTermBenefits}</p>
                        </div>
                      </div>

                    </div>
                  );
                })()}

                {/* 2. STRATEGIC SCENARIOS DIVISION */}
                {activeItem.type === "scenario" && (()=>{
                  const sc = staticScenario || aiScenario;
                  if (!sc) return null;
                  return (
                    <div className="space-y-6">
                      
                      <div className="space-y-3">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">I. The Workflow Scenario</h3>
                        <p className="leading-relaxed indent-4">{sc.scenario}</p>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2 py-4 border-t border-b border-none dark:border-neutral-900">
                        <div className="bg-neutral-50 p-4 border border-red-100 dark:bg-neutral-950 dark:border-red-900/30 rounded-sm">
                          <h4 className="font-sans text-[10px] font-bold tracking-wider text-red-500 uppercase">Average Sub-optimal Reaction</h4>
                          <p className="mt-1 text-xs text-neutral-500 leading-relaxed dark:text-neutral-400 font-sans">{sc.averageReaction}</p>
                        </div>
                        <div className="bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 p-4 rounded-sm">
                          <h4 className="font-sans text-[10px] font-bold tracking-wider text-emerald-400 dark:text-emerald-600 uppercase">Tactical Strategic Reaction</h4>
                          <p className="mt-1 text-xs leading-relaxed font-sans">{sc.strategicReaction}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">II. Operational Analysis</h3>
                        <p className="leading-relaxed">{sc.analysis}</p>
                      </div>

                      <div className="space-y-3 py-4 border-t border-neutral-100 dark:border-neutral-900">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">III. Cognitive Mechanism</h3>
                        <p className="leading-relaxed text-neutral-500 dark:text-neutral-400 text-sm">{sc.psychologicalExplanation}</p>
                      </div>

                      <div className="p-4 bg-neutral-50 border border-neutral-200 dark:bg-neutral-900/30 dark:border-none font-sans space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">Lessons Accumulated</h4>
                        <ul className="list-disc pl-4 text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5">
                          {sc.lessonsLearned?.map((lesson, i) => (
                            <li key={i}>{lesson}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 border-t border-neutral-100 pt-4 dark:border-neutral-900">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">Copyable Practical Code</h4>
                        <p className="text-xs leading-relaxed p-3 bg-neutral-100 dark:bg-neutral-900 font-mono text-neutral-600 dark:text-neutral-300 rounded-sm">
                          {sc.practicalApplication}
                        </p>
                      </div>

                    </div>
                  );
                })()}

                {/* 3. UNDERSTANDING CHAPTER DIVISION */}
                {activeItem.type === "chapter" && (()=>{
                  const ch = staticChapter || aiChapter;
                  if (!ch) return null;
                  return (
                    <div className="space-y-6">
                      
                      <div className="space-y-3">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">I. Academic Treatise</h3>
                        <p className="leading-relaxed indent-4">{ch.deepExplanation}</p>
                      </div>

                      <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm dark:bg-neutral-900/30 dark:border-none space-y-3">
                        <span className="font-sans text-[10px] font-bold tracking-widest text-neutral-400 uppercase">CASE STUDY DIVISION</span>
                        <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white">{ch.caseStudy?.title}</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-sans dark:text-neutral-400">{ch.caseStudy?.description}</p>
                        
                        <div className="pt-2">
                          <h5 className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Quantifiable Performance Metrics</h5>
                          <div className="grid gap-2 sm:grid-cols-3">
                            {ch.caseStudy?.metrics?.map((m, idx) => (
                              <div key={idx} className="bg-white p-2 text-[10px] rounded-sm font-mono text-neutral-600 border border-neutral-100 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400">
                                {m}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-neutral-100 pt-4 dark:border-neutral-900">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">II. Observational Exercises</h3>
                        <ul className="list-disc pl-4 space-y-2 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                          {ch.exercises?.map((ex, i) => (
                            <li key={i}>{ex}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 pt-4 font-sans">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-950 dark:text-white">III. Self-Searching Realities</h3>
                        <ul className="list-decimal pl-4 space-y-1.5 text-xs text-neutral-400 leading-relaxed">
                          {ch.reflectionQuestions?.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-sm dark:border-neutral-800 space-y-2 font-sans">
                        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider dark:text-white">Abstract Synopsis</h4>
                        <p className="text-xs italic text-neutral-500 dark:text-neutral-400">{ch.summary}</p>
                      </div>

                    </div>
                  );
                })()}

              </article>
            )}

          </div>

          {/* Book Navigation controls (back and forward rules) */}
          <div className="flex items-center justify-between font-mono text-xs border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
            <button
              onClick={() => navigateBookSibling("prev")}
              className="px-3 py-1 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 rounded-sm hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              ← PRIOR DIVISION
            </button>
            <span className="text-[10px] text-neutral-400">UNRESTRICTED TRANSMISSION v2.6</span>
            <button
              onClick={() => navigateBookSibling("next")}
              className="px-3 py-1 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 rounded-sm hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              SUBSEQUENT DIVISION →
            </button>
          </div>

        </div>

        {/* Right Column: Interaction Sidebar (Bookmarks, Highlights, Notes, AI Assistant) */}
        <div className="space-y-6">
          
          {/* Action Hub Panel: Read, Highlight selection, Bookmark */}
          <div className="border border-neutral-200 bg-white p-5 space-y-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="font-serif text-sm font-bold text-neutral-950 dark:text-white uppercase tracking-wider">Operational Panel</h3>
            
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase">
              <button
                id="bookmark-btn"
                onClick={() => toggleBookmark(activeItem.id)}
                className={`flex items-center justify-center space-x-1.5 border py-2.5 transition-colors ${
                  isBookmarked
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-neutral-200 hover:border-neutral-950 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-white"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>

              <button
                id="complete-btn"
                onClick={() => {
                  markCompleted(activeItem.id);
                  alert("Archive officially penetrated. 25 EXP/Points added. Track performance in the Dashboard!");
                }}
                className={`flex items-center justify-center space-x-1.5 border py-2.5 transition-colors ${
                  isCompleted
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-neutral-200 hover:border-neutral-950 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-white"
                }`}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>{isCompleted ? "Read Complete" : "Mark as Read"}</span>
              </button>
            </div>

            <button
              onClick={handleTextHighlight}
              className="flex w-full items-center justify-center space-x-2 border border-neutral-900 bg-neutral-900 text-white py-2 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>Flag Highlighted Selection</span>
            </button>
          </div>

          {/* AI Academic Companion Sidebar Router */}
          <div className="border border-neutral-200 bg-white p-4 h-[420px] flex flex-col justify-between dark:border-neutral-800 dark:bg-neutral-950">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-900 mb-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white flex items-center space-x-1">
                  <Sparkles className="h-3.5 w-3.5 text-neutral-900 dark:text-white" />
                  <span>AI Scholar Relay</span>
                </h4>
                <span className="text-[9px] font-mono text-emerald-500 bg-emerald-50 px-1 dark:bg-neutral-900">SECURE SHELL</span>
              </div>

              {/* Message scroll log */}
              <div className="h-[210px] overflow-y-auto space-y-3 pr-1 text-xs scrollbar-thin scrollbar-thumb-neutral-200">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 max-w-[90%] rounded-sm ${
                      msg.role === 'user'
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white'
                        : 'border border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-900 dark:bg-neutral-950 dark:text-neutral-300'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick action chips triggers */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => handleSendChatMessage(undefined, "Synthesize a business case study for this specific text.")}
                  className="px-1.5 py-0.5 border border-neutral-200 text-[9px] font-mono uppercase hover:border-neutral-900 text-neutral-500 rounded-sm dark:border-neutral-800 dark:hover:border-white"
                >
                  CASE STUDY
                </button>
                <button 
                  onClick={() => handleSendChatMessage(undefined, "Fleshing out a self-correction list for this concept.")}
                  className="px-1.5 py-0.5 border border-neutral-200 text-[9px] font-mono uppercase hover:border-neutral-900 text-neutral-500 rounded-sm dark:border-neutral-800 dark:hover:border-white"
                >
                  SELF-CORRECT LIST
                </button>
                <button 
                  onClick={() => handleSendChatMessage(undefined, "Contrast this logic against standard evolutionary psychology theories.")}
                  className="px-1.5 py-0.5 border border-neutral-200 text-[9px] font-mono uppercase hover:border-neutral-900 text-neutral-500 rounded-sm dark:border-neutral-800 dark:hover:border-white"
                >
                  ACADEMIC CONTRAST
                </button>
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendChatMessage} className="flex border border-neutral-900 dark:border-white">
                <input
                  type="text"
                  placeholder="Pose academic inquiry..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-transparent focus:outline-none text-neutral-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={sendingChat}
                  className="flex h-8 w-8 items-center justify-center text-neutral-900 shrink-0 dark:text-white hover:bg-neutral-100"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Margins Note Pad Card */}
          <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white border-b border-neutral-100 pb-2 mb-3 dark:border-neutral-900">
              Marginal Notes
            </h4>
            <form onSubmit={handleSaveNote} className="space-y-3">
              <textarea
                placeholder="Anchor private thoughts, applications, or real-life audits..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                className="w-full border border-neutral-200 bg-neutral-50 p-2.5 text-xs focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full border border-neutral-900 bg-neutral-950 py-1.5 text-xs font-mono tracking-widest uppercase text-white hover:bg-neutral-850 dark:border-white dark:bg-white dark:text-neutral-950"
              >
                Capture Note
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
