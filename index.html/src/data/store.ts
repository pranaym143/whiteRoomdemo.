import { useState, useEffect } from "react";
import { UserProgressData, UserNote, UserHighlight, QuizQuestion } from "../types";

const LOCAL_STORAGE_KEY = "the_white_room_archives_user_progress_v1";

const defaultProgress: UserProgressData = {
  streak: 3,
  lastActiveDate: new Date().toISOString().split("T")[0],
  bookmarks: ["rule-1", "scenario-1"],
  completedItems: ["rule-1"],
  notes: [
    {
      id: "note-init-1",
      bookId: "white-room-rules",
      itemId: "rule-1",
      itemTitle: "The Rule of the Emotional Buffer",
      text: "Must master this. Apply the 10-second wait whenever receiving critical reviews from supervisors. Slower cadence = higher perceived control.",
      createdAt: new Date().toISOString()
    }
  ],
  highlights: [
    {
      id: "hl-init-1",
      bookId: "white-room-rules",
      itemId: "rule-1",
      text: "High intelligence is muted when emotions spike.",
      createdAt: new Date().toISOString()
    }
  ],
  quizScore: 120,
  completedRoadmapIds: ["map-1-1"]
};

export function useArchivesStore() {
  const [progress, setProgress] = useState<UserProgressData>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Verify we have all fields
        return { ...defaultProgress, ...parsed };
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    return defaultProgress;
  });

  const [activeTab, setActiveTab] = useState<"home" | "library" | "dashboard" | "roadmaps" | "quiz">("home");
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<{ id: string; type: "rule" | "scenario" | "chapter"; number?: number } | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Synchronize with localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Adjust HTML root class representing theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Helper functions to modify user state
  const toggleBookmark = (itemId: string) => {
    setProgress(prev => {
      const exists = prev.bookmarks.includes(itemId);
      const updated = exists
        ? prev.bookmarks.filter(id => id !== itemId)
        : [...prev.bookmarks, itemId];
      return { ...prev, bookmarks: updated };
    });
  };

  const markCompleted = (itemId: string) => {
    setProgress(prev => {
      if (prev.completedItems.includes(itemId)) return prev;
      return {
        ...prev,
        completedItems: [...prev.completedItems, itemId],
        quizScore: prev.quizScore + 25 // Award 25 XP/Points for finishing chapters
      };
    });
  };

  const addNote = (bookId: string, itemId: string, itemTitle: string, text: string, excerpt?: string) => {
    const newNote: UserNote = {
      id: "note-" + Math.random().toString(36).substring(2, 9),
      bookId,
      itemId,
      itemTitle,
      text,
      createdAt: new Date().toISOString(),
      excerpt
    };
    setProgress(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));
  };

  const deleteNote = (noteId: string) => {
    setProgress(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== noteId)
    }));
  };

  const addHighlight = (bookId: string, itemId: string, text: string) => {
    const newHl: UserHighlight = {
      id: "hl-" + Math.random().toString(36).substring(2, 9),
      bookId,
      itemId,
      text,
      createdAt: new Date().toISOString()
    };
    setProgress(prev => ({
      ...prev,
      highlights: [newHl, ...prev.highlights]
    }));
  };

  const deleteHighlight = (hlId: string) => {
    setProgress(prev => ({
      ...prev,
      highlights: prev.highlights.filter(h => h.id !== hlId)
    }));
  };

  const addQuizScore = (points: number) => {
    setProgress(prev => ({
      ...prev,
      quizScore: prev.quizScore + points
    }));
  };

  const completeRoadmapNode = (nodeId: string) => {
    setProgress(prev => {
      if (prev.completedRoadmapIds.includes(nodeId)) return prev;
      return {
        ...prev,
        completedRoadmapIds: [...prev.completedRoadmapIds, nodeId],
        quizScore: prev.quizScore + 50 // Grand 50 roadmap completion points
      };
    });
  };

  const resetAllProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    progress,
    activeTab,
    setActiveTab,
    activeBookId,
    setActiveBookId,
    activeItem,
    setActiveItem,
    theme,
    setTheme,
    toggleBookmark,
    markCompleted,
    addNote,
    deleteNote,
    addHighlight,
    deleteHighlight,
    addQuizScore,
    completeRoadmapNode,
    resetAllProgress
  };
}

export type ArchivesStoreType = ReturnType<typeof useArchivesStore>;
