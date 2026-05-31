import React, { useState, useEffect } from "react";
import { useArchivesStore } from "./data/store";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LibraryExplorer from "./components/LibraryExplorer";
import ReadingInterface from "./components/ReadingInterface";
import UserDashboard from "./components/UserDashboard";
import QuizSystem from "./components/QuizSystem";
import RoadmapsView from "./components/RoadmapsView";
import { BookOpen, Award, Layers, Sparkles, RefreshCw, AlertCircle, Quote } from "lucide-react";

export default function App() {
  const store = useArchivesStore();
  const { activeTab, setActiveTab, activeItem, setActiveBookId, setActiveItem } = store;

  // Statically prepared premium Quotes collection with daily sifting mechanisms
  const quotesList = [
    { text: "He who controls others may be powerful, but he who has mastered himself is mightier still.", author: "Lao Tzu" },
    { text: "Your self-command is a quiet fortress which no public noise or low insult can penetrate.", author: "The White Room Protocol" },
    { text: "The first and greatest victory is to conquer yourself; to be conquered by yourself is of all things most shameful.", author: "Plato" },
    { text: "If you do not rule your own mind, someone else will rule it on your behalf.", author: "Strategic Behavior" }
  ];

  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  // Daily Lesson Widget State - Dynamic AI Psychology Lessons!
  const [dailyLesson, setDailyLesson] = useState<{
    title?: string;
    motto?: string;
    text?: string;
    exercise?: string;
    verificationAlert?: string;
  } | null>(null);
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [lessonDivision, setLessonDivision] = useState<string>("Self-Discipline");

  // Fetch AI daily lesson based on division selection
  const fetchDailyLesson = async (division: string) => {
    setLoadingLesson(true);
    try {
      const res = await fetch("/api/daily-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: division })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDailyLesson(data);
    } catch {
      // Fallback details if server offline
      setDailyLesson({
        title: "The Latency of Subconscious Judgment",
        motto: "Analyze the silence before the reaction spans.",
        text: "In standard human containers, there is high pressure to answer immediately. The strategic agent recognizes that immediate answers are controlled by historic bias. Slower speed resets the dynamic.",
        exercise: "Today, force a 3-second physical delay before opening any doors, answering queries, or entering public elevators.",
        verificationAlert: "Watch out for colleagues rushing you to make sudden timeline consensus agreements without auditing raw ledger balance files."
      });
    } finally {
      setLoadingLesson(false);
    }
  };

  useEffect(() => {
    fetchDailyLesson(lessonDivision);
  }, [lessonDivision]);

  // Rotate quotes on timer every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuoteIdx(prev => (prev + 1) % quotesList.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunchDailyLesson = () => {
    // Navigates directly to the handbook division corresponding to the daily lesson theme
    setActiveBookId("white-room-rules");
    setActiveItem({ id: "rule-1", type: "rule", number: 1 });
    setActiveTab("library");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F8F8] text-neutral-900 transition-colors duration-200 dark:bg-[#0A0A0A] dark:text-neutral-100">
      
      {/* Prime Header navigation block */}
      <Navbar store={store} />

      {/* Main Container Content */}
      <main className="flex-grow">
        
        {/* Render Tab 1: HOME/ARCHIVES HUB */}
        {activeTab === "home" && (
          <div className="space-y-12 pb-16">
            
            {/* Pristine Hero Landing Panel */}
            <HeroSection store={store} />

            {/* Core Interactive Division: Daily AI Lesson + Elite Quote */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-3">
                
                {/* 1. Dynamic AI Daily Psychology Lesson Section (2 Cols width) */}
                <div className="lg:col-span-2 border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950 flex flex-col justify-between space-y-6">
                  
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-3 dark:border-neutral-900 mb-4">
                      <div>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">IN PRODUCTION: 2026</span>
                        <h3 className="font-serif text-lg font-extrabold text-neutral-950 dark:text-white uppercase">Daily Psychology Lesson</h3>
                      </div>
                      
                      {/* Topic Filters for Dynamic AI formulation */}
                      <div className="flex space-x-1.5 font-mono text-[9px] uppercase">
                        {["Self-Discipline", "Tactical Social", "Subconscious bias"].map(division => (
                          <button
                            key={division}
                            onClick={() => setLessonDivision(division)}
                            className={`px-2 py-0.5 border transition-all ${
                              lessonDivision === division
                                ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950"
                                : "border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-400 dark:border-neutral-800"
                            }`}
                          >
                            {division}
                          </button>
                        ))}
                      </div>
                    </div>

                    {loadingLesson ? (
                      <div className="py-12 flex flex-col items-center justify-center text-center">
                        <RefreshCw className="h-6 w-6 text-neutral-400 animate-spin mb-3" />
                        <span className="text-xs text-neutral-400 font-mono uppercase">Re-compiling Neural Daily Lesson Ledger...</span>
                      </div>
                    ) : dailyLesson ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-serif text-base font-bold text-neutral-950 dark:text-white">{dailyLesson.title}</h4>
                          <p className="text-xs text-neutral-400 font-mono italic">"{dailyLesson.motto}"</p>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed text-justify dark:text-neutral-450">{dailyLesson.text}</p>
                        
                        <div className="grid gap-4 sm:grid-cols-2 pt-2 text-xs font-sans">
                          <div className="p-3 bg-neutral-50 border border-neutral-100 dark:bg-neutral-900/40 dark:border-none">
                            <h5 className="font-bold text-neutral-950 dark:text-white text-[10px] uppercase">Daily Practice Mission</h5>
                            <p className="text-neutral-500 mt-1 dark:text-neutral-400 leading-relaxed">{dailyLesson.exercise}</p>
                          </div>
                          <div className="p-3 bg-neutral-50 border border-neutral-100 dark:bg-neutral-900/40 dark:border-none">
                            <h5 className="font-bold text-neutral-950 dark:text-white text-[10px] uppercase">Vigilance Warning</h5>
                            <p className="text-neutral-500 mt-1 dark:text-neutral-400 leading-relaxed">{dailyLesson.verificationAlert}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 mt-6 flex justify-end">
                    <button
                      id="home-lesson-launch-btn"
                      onClick={handleLaunchDailyLesson}
                      className="border border-neutral-900 bg-neutral-950 text-white px-5 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-850 dark:border-white dark:bg-white dark:text-neutral-950"
                    >
                      Open Rules Manual
                    </button>
                  </div>

                </div>

                {/* 2. Quiet Stoic Quote Block + Reader metrics (1 column width) */}
                <div className="space-y-6 flex flex-col justify-between">
                  
                  {/* Stoic Quotes block */}
                  <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 flex flex-col justify-between h-full">
                    <div className="text-neutral-100 dark:text-neutral-900 h-8">
                      <Quote className="h-8 w-8 text-neutral-200 dark:text-neutral-800" />
                    </div>
                    <div className="space-y-3 my-6">
                      <p className="font-serif text-sm tracking-wide text-neutral-800 italic leading-relaxed dark:text-neutral-200 text-justify">
                        "{quotesList[activeQuoteIdx].text}"
                      </p>
                      <p className="font-mono text-[10px] text-right tracking-widest uppercase text-neutral-400">
                        — {quotesList[activeQuoteIdx].author}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-center">
                      {quotesList.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`h-1.5 w-1.5 rounded-full transition-all ${idx === activeQuoteIdx ? 'bg-neutral-900 dark:bg-white w-3' : 'bg-neutral-200 dark:bg-neutral-800'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Learning Roadmap Fast-path shortcut */}
                  <div className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Active Curriculum Map</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Navigate our structural curriculum roadmaps compiling specific discipline milestones.</p>
                    <button
                      onClick={() => setActiveTab("roadmaps")}
                      className="w-full mt-4 text-center border border-neutral-200 py-2 text-[10px] font-mono tracking-wider uppercase text-neutral-800 hover:border-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-white"
                    >
                      Open Roadmaps Portal →
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Testimonials or Academic endorsements */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-neutral-200 pt-12 dark:border-neutral-900">
              <div className="text-center mb-8">
                <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-white">Worldwide Reader Reviews</h3>
                <p className="text-xs text-neutral-400 mt-1">Candid endorsements from academic scholars and corporate strategists globally.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3 font-sans text-xs">
                <div className="bg-white p-5 border border-neutral-205 dark:bg-neutral-950 dark:border-neutral-905">
                  <p className="text-neutral-500 leading-relaxed dark:text-neutral-400 italic">"The Emotional Buffer pause completely transformed how I handle board conflicts. My vocal pitch is low, and other team participants now defer to my consensus. Indispensable!"</p>
                  <h5 className="font-bold text-neutral-900 mt-4 dark:text-white uppercase text-[10px]">— Senior Tech Executive, Tokyo</h5>
                </div>
                <div className="bg-white p-5 border border-neutral-205 dark:bg-neutral-950 dark:border-neutral-905">
                  <p className="text-neutral-500 leading-relaxed dark:text-neutral-400 italic">"Usually, psychology portals try to lock and sell chapter secrets. Having the world's most superior Stoic catalog 100% free with live AI sifting is absolute academic philanthropy."</p>
                  <h5 className="font-bold text-neutral-900 mt-4 dark:text-white uppercase text-[10px]">— Neuro-Psychology Research Fellow, Boston</h5>
                </div>
                <div className="bg-white p-5 border border-neutral-205 dark:bg-neutral-950 dark:border-neutral-905">
                  <p className="text-neutral-500 leading-relaxed dark:text-neutral-400 italic">"Strategic Behaviorsituation checklists solved my client contract creep issue. Instead of snapping defensively, I deployed a modular trial, securing my senior raise cleanly."</p>
                  <h5 className="font-bold text-neutral-900 mt-4 dark:text-white uppercase text-[10px]">— High-Leverage Freelancer, London</h5>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Render Tab 2: DIGITAL LIBRARY VIEW */}
        {activeTab === "library" && (
          <div>
            {activeItem ? (
              <ReadingInterface store={store} />
            ) : (
              <LibraryExplorer store={store} />
            )}
          </div>
        )}

        {/* Render Tab 3: LEARNING ROADMAPS */}
        {activeTab === "roadmaps" && (
          <RoadmapsView store={store} />
        )}

        {/* Render Tab 4: QUIZ AUDITING */}
        {activeTab === "quiz" && (
          <QuizSystem store={store} />
        )}

        {/* Render Tab 5: PROGRESS USER DASHBOARD */}
        {activeTab === "dashboard" && (
          <UserDashboard store={store} />
        )}

      </main>

      {/* Luxury Minimalist Academic Footer */}
      <footer className="border-t border-neutral-200 bg-white py-10 dark:border-neutral-900 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-sans text-xs font-bold tracking-widest text-neutral-900 uppercase dark:text-white">
              THE WHITE ROOM ARCHIVES
            </span>
            <p className="text-[10px] text-neutral-400 font-mono">EST. 2026 • PUBLIC RESEARCH LEDGER • UNRESTRICTED ACCESS</p>
          </div>
          <div className="text-neutral-400 text-[10px] font-sans leading-relaxed text-right md:max-w-md">
            This platform uses high-level server-side artificial intelligence algorithms proxying via Google Cloud. All handbooks, tests, roadmaps, and psychological matrices are completely public, free of charge, of advertisements, and of locked premiums. Master Human Nature, Master Yourself.
          </div>
        </div>
      </footer>

    </div>
  );
}
