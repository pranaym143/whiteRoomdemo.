import React from "react";
import { ArchivesStoreType } from "../data/store";
import { learningRoadmaps } from "../data/roadmaps";
import { Layers, Bookmark, CheckCircle, RefreshCw, Star, Play } from "lucide-react";

interface RoadmapsViewProps {
  store: ArchivesStoreType;
}

export default function RoadmapsView({ store }: RoadmapsViewProps) {
  const { progress, completeRoadmapNode, setActiveBookId, setActiveItem, setActiveTab } = store;

  const handleLaunchRoadmapNode = (node: typeof learningRoadmaps[0]) => {
    // Identify target details
    setActiveBookId(node.bookId);
    let number: number | undefined;
    let type: "rule" | "scenario" | "chapter";

    if (node.targetId.startsWith("rule-")) {
      number = parseInt(node.targetId.replace("rule-", ""));
      type = "rule";
    } else if (node.targetId.startsWith("scenario-")) {
      number = parseInt(node.targetId.replace("scenario-", ""));
      type = "scenario";
    } else {
      type = "chapter";
    }

    setActiveItem({ id: node.targetId, type, number });
    
    // Register completion of roadmap node in user logs!
    completeRoadmapNode(node.id);

    // Swap to reading tab
    setActiveTab("library");
  };

  const totalNodes = learningRoadmaps.length;
  const completedNodesCount = progress.completedRoadmapIds.length;
  const roadmapPercentage = Math.round((completedNodesCount / totalNodes) * 100);

  // Group roadmaps by theme/book for clean directory viewing
  const mapsByBook = [
    {
      title: "Division I: Emotional Impenetrability & Base Self-Mastery",
      desc: "Based on the 100 Rules handbook covering initial sensory embargo and radical ownership.",
      bookId: "white-room-rules",
      nodes: learningRoadmaps.filter(node => node.bookId === "white-room-rules")
    },
    {
      title: "Division II: Strategic Decision Making & Interpersonal Sifting",
      desc: "Based on the 50 Strategic scenarios workbook detailing social workspace response patterns.",
      bookId: "strategic-behavior",
      nodes: learningRoadmaps.filter(node => node.bookId === "strategic-behavior")
    },
    {
      title: "Division III: Anatomy of Human Biases & Micro-Expressions",
      desc: "Based on the Understanding Human Nature textbook covering evolutionary motivation.",
      bookId: "understanding-human-nature",
      nodes: learningRoadmaps.filter(node => node.bookId === "understanding-human-nature")
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">PEDAGOGICAL PIPELINE</span>
        <h2 className="font-serif text-2xl font-extrabold text-neutral-900 mt-1 dark:text-white uppercase">Learning Roadmaps</h2>
        <div className="mx-auto mt-2 h-px w-10 bg-neutral-900 dark:bg-white" />
      </div>

      {/* Progress banner */}
      <div className="border border-neutral-200 bg-white p-5 mb-8 dark:border-neutral-800 dark:bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-sm font-bold text-neutral-950 dark:text-white">Curriculum Penetration Progress</h3>
          <p className="text-xs text-neutral-450 mt-1">Sustain standard curriculum modules to accumulate overall cognitive leverage points.</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-lg font-serif font-extrabold text-neutral-950 dark:text-white">{roadmapPercentage}% Complete</div>
          <span className="text-[10px] font-mono text-neutral-400">{completedNodesCount} / {totalNodes} Milestone nodes</span>
          <div className="mt-1 h-1.5 w-40 bg-neutral-100 rounded-full overflow-hidden dark:bg-neutral-900">
            <div className="h-full bg-neutral-950 rounded-full dark:bg-white" style={{ width: `${roadmapPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Dynamic Milestones vertical Timeline */}
      <div className="space-y-10">
        {mapsByBook.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            
            {/* Division header */}
            <div className="border-b border-neutral-100 pb-2 dark:border-neutral-900">
              <h3 className="font-serif text-base font-bold text-neutral-950 dark:text-white">{section.title}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{section.desc}</p>
            </div>

            {/* List of nodes */}
            <div className="space-y-4 relative pl-4 border-l border-neutral-200 dark:border-neutral-850">
              {section.nodes.map((node, nIdx) => {
                const isCompleted = progress.completedRoadmapIds.includes(node.id);
                
                return (
                  <div key={node.id} className="relative group pl-6">
                    {/* Circle Node status indicator */}
                    <div className={`absolute left-[-22px] top-1 h-4 w-4 rounded-full border flex items-center justify-center text-[8px] font-semibold text-white transition-colors-opacity ${
                      isCompleted 
                        ? "bg-neutral-950 border-neutral-950 dark:bg-white dark:border-white text-neutral-950" 
                        : "bg-white border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700"
                    }`}>
                      {isCompleted && "✓"}
                    </div>

                    <div className="border border-neutral-200 bg-white p-4 group-hover:border-neutral-900 transition-all dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        {/* Tags */}
                        <div className="flex items-center space-x-2 text-[9px] font-mono mb-1.5">
                          <span className={`${node.difficulty === "Expert" ? "text-red-500" : (node.difficulty === "Intermediate" ? "text-amber-500" : "text-neutral-400")}`}>{node.difficulty}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-400">{node.estimatedMinutes} MIN STUDY</span>
                        </div>
                        
                        <h4 className="font-serif text-sm font-bold text-neutral-900 dark:text-white">{node.title}</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed mt-1">{node.description}</p>
                      </div>

                      <button
                        onClick={() => handleLaunchRoadmapNode(node)}
                        className={`shrink-0 flex items-center justify-center space-x-1 border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider ${
                          isCompleted
                            ? "border-neutral-200 bg-neutral-50 text-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 hover:dark:border-white"
                            : "border-neutral-900 bg-neutral-950 text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
                        }`}
                      >
                        <Play className="h-3 w-3 shrink-0" />
                        <span>{isCompleted ? "Re-Incubate" : "Launch Target"}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
