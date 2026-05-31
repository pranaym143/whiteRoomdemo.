import React, { useState } from "react";
import { ArchivesStoreType } from "../data/store";
import { psychologyQuizzes } from "../data/quizzes";
import { Award, CheckCircle, XCircle, ChevronRight, RefreshCw, HelpCircle } from "lucide-react";

interface QuizSystemProps {
  store: ArchivesStoreType;
}

export default function QuizSystem({ store }: QuizSystemProps) {
  const { addQuizScore } = store;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const activeQuestion = psychologyQuizzes[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasChecked) return;
    setSelectedIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedIdx === null || hasChecked) return;
    setHasChecked(true);

    if (selectedIdx === activeQuestion.answerIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < psychologyQuizzes.length) {
      setCurrentIdx(nextIdx);
      setSelectedIdx(null);
      setHasChecked(false);
    } else {
      // Award score in store!
      const totalPointsGained = correctCount * 30; // 30 points per correct answer
      addQuizScore(totalPointsGained);
      setShowSummary(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setHasChecked(false);
    setCorrectCount(0);
    setShowSummary(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">TACTICAL SHIFT AUDITING</span>
        <h2 className="font-serif text-2xl font-extrabold text-neutral-900 mt-1 dark:text-white uppercase">Psychology Quiz Laboratory</h2>
        <div className="mx-auto mt-2 h-px w-10 bg-neutral-900 dark:bg-white" />
      </div>

      {showSummary ? (
        /* Summary view */
        <div className="border border-neutral-900 bg-white p-8 text-center space-y-6 dark:border-white dark:bg-neutral-950">
          <Award className="h-12 w-12 text-amber-500 mx-auto fill-amber-50 fill-amber-500/10" />
          
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white">Audit Protocol Complete</h3>
            <p className="text-xs text-neutral-400">Your social and cognitive matrices have been processed securely.</p>
          </div>

          <div className="py-4 border-t border-b border-neutral-100 dark:border-neutral-900 text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">SCORE ACCUMULATED</span>
            <div className="font-serif text-4xl font-extrabold text-neutral-950 dark:text-white mt-1">
              {correctCount} / {psychologyQuizzes.length}
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-mono uppercase">+{correctCount * 30} Personal Growth Points Awarded!</p>
          </div>

          <p className="text-xs leading-relaxed text-neutral-500 max-w-md mx-auto dark:text-neutral-400">
            {correctCount === psychologyQuizzes.length 
              ? "Flawless Observation. You have demonstrated a near-total decoupling of ego from incoming stimuli. Keep maintaining this posture."
              : "Valuable Practice. Emotional sifting is a life-long discipline. Re-read the chapters to reinforce strategic reaction codes."}
          </p>

          <button
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto border border-neutral-900 bg-neutral-950 text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
          >
            Restart Evaluation
          </button>
        </div>
      ) : (
        /* Active quiz card */
        <div className="space-y-6">
          
          {/* Question card */}
          <div className="border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-4 border-b border-neutral-50 pb-3 dark:border-neutral-900">
              <span className="uppercase tracking-widest bg-neutral-100 px-2 py-0.5 rounded-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">{activeQuestion.category}</span>
              <span>QUESTION {currentIdx + 1} OF {psychologyQuizzes.length}</span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-snug dark:text-white">
              {activeQuestion.question}
            </h3>

            {/* Answer option list */}
            <div className="mt-6 space-y-2.5 font-sans">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedIdx === idx;
                
                // Styling when evaluated
                let optionStyle = "border-neutral-200 hover:border-neutral-950 dark:border-neutral-800 dark:hover:border-white";
                if (isSelected) optionStyle = "border-neutral-950 bg-neutral-50 dark:border-white dark:bg-neutral-900";
                
                if (hasChecked) {
                  if (idx === activeQuestion.answerIndex) {
                    optionStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-300";
                  } else if (isSelected && selectedIdx !== activeQuestion.answerIndex) {
                    optionStyle = "border-red-500 bg-red-50 text-red-950 dark:bg-red-950/20 dark:text-red-300";
                  } else {
                    optionStyle = "border-neutral-200 opacity-40 dark:border-neutral-850";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasChecked}
                    className={`w-full flex items-start space-x-3 p-4 border text-left text-xs text-neutral-700 transition-all rounded-sm dark:text-neutral-300 ${optionStyle}`}
                  >
                    <span className="font-mono font-semibold h-4 w-4 shrink-0 flex items-center justify-center border border-neutral-300 rounded-full text-[9px] dark:border-neutral-700 select-none">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {hasChecked && (
              <div className="mt-6 border-t border-neutral-100 pt-4 dark:border-neutral-900">
                <div className="flex items-start space-x-2 bg-neutral-50 p-4 rounded-sm dark:bg-neutral-900/40">
                  <HelpCircle className="h-4.5 w-4.5 text-neutral-400 shrink-0 mt-0.5" />
                  <div className="font-sans text-xs">
                    <h4 className="font-bold uppercase tracking-wider text-neutral-900 dark:text-white text-[10px]">Strategic Analysis</h4>
                    <p className="mt-1 leading-relaxed text-neutral-500 dark:text-neutral-450">{activeQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Core Controls */}
          <div className="flex justify-end font-mono">
            {!hasChecked ? (
              <button
                id="quiz-verify-btn"
                onClick={handleCheckAnswer}
                disabled={selectedIdx === null}
                className="border border-neutral-900 bg-neutral-950 text-white px-5 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-850 disabled:opacity-40 transition-colors dark:border-white dark:bg-white dark:text-neutral-950"
              >
                Evaluate Selection
              </button>
            ) : (
              <button
                id="quiz-next-btn"
                onClick={handleNextQuestion}
                className="flex items-center space-x-1 border border-neutral-900 bg-neutral-950 text-white px-5 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-850 transition-colors dark:border-white dark:bg-white dark:text-neutral-950"
              >
                <span>{currentIdx + 1 === psychologyQuizzes.length ? "Finish Evaluation" : "Subsequent Inquiry"}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
