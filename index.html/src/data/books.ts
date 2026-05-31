import { Book, RuleContent, StrategicScenario, UnderstandingChapter } from "../types";

export const booksList: Book[] = [
  {
    id: "white-room-rules",
    title: "The White Room Rules",
    category: "Discipline & Self-Mastery",
    description: "The ultimate compendium of 100 tactical principles governing emotional regulation, long-term patience, focus, mental resilience, and absolute personal responsibility.",
    estimatedReadingTime: "4.5 hours (approx. 72 library pages)",
    coverSymbol: "☯"
  },
  {
    id: "strategic-behavior",
    title: "Strategic Behavior",
    category: "Social Intelligence & Tactical Response",
    description: "A workbook of 50 critical human situations analyzing standard sub-optimal reactions against highly calculated, emotionally intelligent tactical responses.",
    estimatedReadingTime: "5 hours (approx. 78 library pages)",
    coverSymbol: "♞"
  },
  {
    id: "understanding-human-nature",
    title: "Understanding Human Nature",
    category: "Cognitive Psychology & Body Language",
    description: "A deep dive study of human motives, hidden biological triggers, cognitive biases, and non-verbal communication, paired with structured academic case studies.",
    estimatedReadingTime: "4 hours (approx. 69 library pages)",
    coverSymbol: "☉"
  }
];

// Rich detailed sample rules for BOOK 1
export const whiteRoomRulesData: RuleContent[] = [
  {
    id: "rule-1",
    number: 1,
    title: "The Rule of the Emotional Buffer",
    category: "Emotional Regulation",
    explanation: "High intelligence is muted when emotions spike. The rule of the Emotional Buffer dictates an absolute 10-second mental embargo between an aggressive external stimulus and any conscious internal response. During this latency period, breathing is regulated, heartbeat is monitored, and the visual field is scanned objectively to separate the trigger from personal identity.",
    realWorldExample: "A junior executive is publicly criticized by a superior during an open board meeting. The average response is to become immediately defensive (raising voice, blushing, making excuses) or shut down with resentment. Under Rule 1, the executive pauses, inhales calmly, and states: 'That is a valuable observation on our timeline risks. Let's analyze the precise points of delay to correct them.'",
    practicalExercise: "When someone says something triggering to you today, purposefully count backwards from ten slowly before parting your lips. Feel the surge of defensive electricity, watch it dissolve, and only speak when your heart rate has returned to baseline.",
    reflectionQuestions: [
      "In what recent conversation did an impulsive response degrade your professional standing?",
      "Why does standard human biology prioritize defensive reactions over analytical responses?",
      "How would your career adjust if you were perceived as immune to sudden insults?"
    ],
    commonMistakes: "Mistaking absolute silence for weakness, or letting micro-expressions (eyerolls, deep sighs) betray your physical irritation. The emotional buffer must be clean, deliberate, and entirely neutral.",
    longTermBenefits: "Absolute immunity to low-level provocation, a reputation for unshakeable composure, and highly precise decision-making under heavy stress."
  },
  {
    id: "rule-2",
    number: 2,
    title: "The Observer's Partition",
    category: "Observation & Perception",
    explanation: "To see others clearly, you must partition your ego. True observation requires detaching from the desire to be liked, right, or visible. This principle demands that you view every social container not as an arena for your validation, but as a laboratory of behavioral patterns where speech is merely raw biological data.",
    realWorldExample: "Entering a corporate networking event, a strategic observer does not rush to introduce themselves or speak loudly. They position themselves at a neutral visual angle, assessing the groups: noting who gestures with open palms (seeking trust), whose feet are pointed toward the exit (desire to leave), and who commands physical space through silence rather than noise.",
    practicalExercise: "Spend a 30-minute social gathering or Zoom session purely as an active listener. Take mental notes of every person's speech rate, interruption habits, and body alignment without offering your own anecdotes.",
    reflectionQuestions: [
      "What vital social cues did you miss in your last negotiation because you were preparing your next sentence?",
      "How does ego distort our reading of human intentions?",
      "Why do silent observers consistently accumulate more social leverage than vocal participants?"
    ],
    commonMistakes: "Appearing visibly aloof, creepy, or detached. One must maintain warm, passive facial gestures while performing sharp, analytical mental partitioning.",
    longTermBenefits: "High social foresight, the ability to anticipate betrayals or alliances weeks before they occur, and exceptional social comfort."
  },
  {
    id: "rule-3",
    number: 3,
    title: "The Asymmetry of Information",
    category: "Strategic Thinking",
    explanation: "The person who speaks the most surrenders the most leverage. Information is a structural currency. In any interaction, the rule of Asymmetry mandates that you absorb maximum intelligence about the other party's motives, vulnerabilities, and incentives while maintaining a complete black box regarding your own key priorities and emotional weaknesses.",
    realWorldExample: "During an initial contract negotiation, the client asks about your working capacity and budget boundaries. The average negotiator lists their full schedule and names their bottom rate. The strategic operator highlights their specialized value, asks deep clarifying questions about the client's past failed projects, and lets the client pitch the initial numbers first.",
    practicalExercise: "Engage in a conversation where you must ask five consecutive open-ended questions before providing any direct assertion about your own lifestyle or opinions.",
    reflectionQuestions: [
      "Why are we biologically desperate to talk about ourselves, even when it compromises our leverage?",
      "How does keeping your goals private accelerate your progress?",
      "What is the operational risk of a transparent mind?"
    ],
    commonMistakes: "Interrogating the other party aggressively. The accumulation of asymmetry must feel like a warm, engaging, and supportive interview.",
    longTermBenefits: "Negotiative superiority, effortless boundary enforcement, and natural command over commercial and interpersonal dialogues."
  },
  {
    id: "rule-4",
    number: 4,
    title: "The Law of Radical Ownership",
    category: "Discipline & Self-Mastery",
    explanation: "Any external grievance is an internal failure of preparation. Universal blame is the ultimate weapon of the undisciplined. Under the Law of Radical Ownership, you must assume that every sub-optimal event in your life—whether a delayed flight, a teammate's betrayal, or a market crash—is something you failed to properly hedge, anticipate, or respond to with sufficient versatility.",
    realWorldExample: "A freelancer's client suddenly cancels a contract, leaving them unable to pay rent. Instead of blaming the corporate sector or economic policies, the strategic freelancer admits: 'I committed the strategic error of having a single point of failure. I did not keep an emergency runway, and I failed to assess the client's financial stability.'",
    practicalExercise: "Write down the single biggest frustration in your life right now. Eliminate every external agent from the text and rewrite it purely in terms of your own choices, reactions, and lack of hedging.",
    reflectionQuestions: [
      "Why is blaming others highly satisfying to our biochemistry, yet structurally paralyzing?",
      "How does absolute accountability unlock immediate tactical options?",
      "What would occur if you never blamed another human being for your circumstances again?"
    ],
    commonMistakes: "Confusing radical ownership with paralyzing guilt or self-loathing. Ownership is an empowering, hyper-pragmatic blueprint, not self-punishment.",
    longTermBenefits: "Rapid personal growth, high resilience, clean mental clarity, and the systematic elimination of continuous historical complaints."
  }
];

// Rich detailed situations/scenarios for BOOK 2
export const strategicScenariosData: StrategicScenario[] = [
  {
    id: "scenario-1",
    number: 1,
    topic: "Managing Public Disrespect",
    scenario: "During a hybrid team meeting, a colleague passive-aggressively jokes about the accuracy of your quarterly metrics, drawing scattered laughter from other participants.",
    averageReaction: "Laughing nervously to play it off, or snapping back with an equally emotional insult, creating a hostile environment and appearing insecure.",
    strategicReaction: "Pausing for two full seconds while maintaining calm, direct eye contact with the colleague. Then, in a steady, slow, low-frequency tone, stating: 'Your concern for metric integrity is valid, Sarah. Let's pull up the raw spreadsheet right now to isolate which specific data points you believe are inaccurate, or would you prefer we schedule a technical audit after this context?'",
    analysis: "The strategic reaction immediately strips the humorous shield from passive-aggression. By remaining calm, you showcase extreme security and emotional discipline. By forcing Sarah to substantiate her claim with live figures, you channel the focus back to objective math, transforming a social attack into a clinical workflow evaluation.",
    psychologicalExplanation: "Passive-aggressive humor relies on plausible deniability. When you treat the 'joke' as a literal, high-stakes technical accusation and demand public data proof, you collapse their deniability, exposing their lack of preparation and shifting the social pressure back onto the aggressor.",
    lessonsLearned: [
      "Never co-sign public mockery of your work; redirect it immediately to clinical reality.",
      "The speed of your answer dictates your anxiety. Slower speech indicates high cognitive control.",
      "Use public spaces to reinforce boundaries non-emotionally."
    ],
    practicalApplication: "If someone makes a passive-aggressive remark, instantly lock eye contact, lower your vocal pitch, ask them to explain the literal meaning, and wait in silence for them to flounder."
  },
  {
    id: "scenario-2",
    number: 2,
    topic: "Negotiating an Unplanned Promotion",
    scenario: "Your department manager unexpectedly requests that you take over the responsibilities of a departed senior peer, promising 'major progression opportunities' during next year's review.",
    averageReaction: "Accepting immediately with gratitude, working 60 hours a week, hoping that's noticed, and ending up frustrated when next year's budget doesn't permit a raise.",
    strategicReaction: "Expressing genuine enthusiasm for the team's continuity, but establishing a modular, formal operational sandbox. Saying: 'I am fully committed to securing this transition, Mark. To ensure a seamless standard of execution, let's document the target metrics for these added responsibilities, run a 90-day trial period, and schedule a review on Day 91 to align my compensation with the senior bracket value.'",
    analysis: "The strategic reaction avoids the trap of accepting immediate high-stakes labor in exchange for empty future promises. It positions you as an organized, metric-driven operator who treats labor as a commercial asset rather than a personal favor. It sets a clean, non-threatening timeline for evaluation.",
    psychologicalExplanation: "Human beings value what they pay for. If you accept a massive increase in responsibility for free, the organization psychologically resets your baseline value to include these tasks. By structuring a trial with a defined boundary date, you maintain agency.",
    lessonsLearned: [
      "Promises of future compensation are worthless without structural milestones.",
      "Frame labor boundaries around 'ensuring standard of execution', not greed.",
      "Build written milestones into every added responsibility."
    ],
    practicalApplication: "Keep a precise record of all supplementary duties you handle, quantify their commercial impact, and present this clean ledger systematically at your scheduled trial review."
  }
];

// Rich detailed chapters for BOOK 3
export const humanNatureChaptersData: UnderstandingChapter[] = [
  {
    id: "nature-chapter-1",
    title: "The Anatomy of Cognitive Biases",
    category: "Cognitive Psychology",
    deepExplanation: "Human cognition is built for speed, not precision. Evolutionary survival prioritized rapid, energy-saving heuristics over exhaustive logical scrutiny. In a modern, complex information environment, these hardwired evolutionary shortcuts manifest as systemic cognitive biases, distorting our reading of financial markets, political motives, and personal safety.",
    caseStudy: {
      title: "The Escalation of Commitment in Failed Ventures",
      description: "An academic study of high-risk operational managers evaluating a distressed project. Managers who were personally responsible for the initial funding systematically approved supplementary budgets despite mathematical data indicating a 94% failure probability.",
      metrics: [
        "Sunk Cost Bias: +76% budget allocation compared to neutral evaluators.",
        "Confirmation Bias: Ignored 8 out of 9 negative feedback indicators.",
        "Social Desirability: 82% of participants admitted fear of appearing 'unstable' in their strategy."
      ]
    },
    exercises: [
      "Review your current active projects. Identify one asset or routine you are keeping purely because of your historical investment of time and capital. Write down the numerical cost of leaving vs. staying.",
      "Create an personal 'anti-bias advisory board'—three trusted peers whose sole job is to point out whenever you are ignoring obvious refutive evidence."
    ],
    reflectionQuestions: [
      "How is your current major life choice reflecting confirmation bias?",
      "Why is admitting error perceived by our biological brain as an existential hazard?",
      "How can you train your mind to actively enjoy being proven wrong?"
    ],
    practicalExamples: [
      "Staying in a toxic relationship or failing business because you already spent five years trying to make it succeed (Sunk Cost Trap).",
      "Only reading newsletters, books, and articles that reinforce your current religious or political alignment (Confirmation Bias)."
    ],
    summary: "Recognize that your brain is a survival machine, not a truth-seeking computer. To make high-stakes decisions, you must build external, checklist-driven environments that neutralize standard human biases."
  },
  {
    id: "nature-chapter-2",
    title: "Deciphering Body Language & Micro-Expressions",
    category: "Non-Verbal Communication",
    deepExplanation: "Words can be rehearsed; the subconscious nervous system cannot. While verbal language is managed by the conscious neocortex, physical non-verbal signals—managed by the limbic brain—leak emotional reality milliseconds before clinical words are spoken. Mastering social observation means decoding these micro-expressions, posture shifts, and spatial gestures.",
    caseStudy: {
      title: "Limbic Clues in Elite Strategic Dialogues",
      description: "An analysis of video footage from bilateral commercial negotiations. Observers mapped physical indicators of stress and deception, cross-referencing them against actual concessions and contract outcomes.",
      metrics: [
        "Micro-Shrugs: 91% correlation with lack of strategic confidence in statements.",
        "Pacifying Behaviors (neck touching, collar adjustments): Increased by 180% during sensitive financial queries.",
        "Asymmetry of Smiles: 85% link with fabricated positive reactions."
      ]
    },
    exercises: [
      "Record yourself answering five highly challenging or awkward questions. Watch the footage on mute at half-speed. Isolate your pacifying behaviors (blinking rate, lip-licking, touching hands).",
      "During normal conversations, notice the feet of those around you. Note when feet point toward you (engagement) vs. toward the door or hallway (desire to leave)."
    ],
    reflectionQuestions: [
      "What physical signals do you display when you feel insecure or deceitful?",
      "Why can't the limbic system easily simulate comfort under intense anxiety?",
      "How does emotional regulation translate to absolute physical stability?"
    ],
    practicalExamples: [
      "A negotiator confidently saying 'This price is our absolute limit' while touching their throat or collar, indicating sudden limbic stress and potential flexibility.",
      "An employee nodding in agreement with a manager while the torso remains slightly angled away, indicating passive resistance."
    ],
    summary: "To read body language, never rely on a single gesture. Always seek a 'cluster' of three indicators matching a baseline shift, separating conscious words from limbic muscular truths."
  }
];

// Let's also provide indices/titles for all 100 rules, 50 situations, and 12 chapters
// This allows the search engine and roadmap to reference everything and let AI construct the entries!
export const allRulesIndex = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const staticRule = whiteRoomRulesData.find(r => r.number === num);
  if (staticRule) return { number: num, title: staticRule.title, category: staticRule.category, isStatic: true };
  
  // Custom titles for the remaining 100 rules to fit the discipline/self-mastery theme perfectly!
  const titles = [
    "", "", "", "", // First 4 are hand-crafted or partially hand-crafted
    "The Law of Private Conquest",
    "Silence as an Active Shield",
    "The Inverse Reward Protocol",
    "Anticipative Pessimism",
    "The Sovereign Morning Agenda",
    "The Multi-Generational Timeline",
    "Hyper-Rational Sifting",
    "The Tactical Fast",
    "Decoupling Pulse from Pace",
    "The Iron Vault of Intent",
    "The Horizon of Negligible Events",
    "The Delayed Gratification Quotient",
    "Aesthetic Desublimation",
    "The Anchor of Voluntary Discomfort",
    "Emotional Decentralization",
    "The Shield of Total Discretion",
    "Optimal Solitude Calibration",
    "The Kinetic Restraint",
    "Subconscious Cleansing",
    "The Paradox of Speed",
    "No-Expectation Living",
    "The Friction Reduction Engine",
    "Emotional Budgeting",
    "The Static posture Paradigm",
    "The Vigilant Gatekeeper",
    "Selective Association Theory",
    "Deep-Work Quarantine",
    "The Post-Success Reset",
    "Somatic Attunement",
    "The Fallacy of Busywork",
    "Absolute Truth Grounding",
    "The Unseen Preparation Rule",
    "The Internal Command Structure",
    "The Stoic Inversion",
    "Digital Detachment Quota",
    "Vocal Cadence Control",
    "The Analytical Breakdown",
    "The Buffer of Financial Autonomy",
    "Zero-Resentment Framing",
    "The Principle of Minimal Friction",
    "The Execution Threshold",
    "Strategic Ignorance",
    "The Self-Correction Loop",
    "The Armor of Humble Inquiry",
    "The Non-Reaction Catalyst",
    "Environmental Purge Protocol",
    "The Emotional Heat Map",
    "Pre-Mortem Analysis Duty",
    "The Compounding Routine",
    "Leveraged Patience",
    "The Legacy Focus",
    "The Minimalist Mindset",
    "The Critical Input embargos",
    "The High-Repetition Resilience",
    "Task-Decoupling Meditation",
    "The Cognitive Quarantine",
    "Sub-Vocal Discipline",
    "The Absolute Focus Anchor",
    "The Identity Detachment Rule",
    "The Anti-Complacency Protocol",
    "The Restorative Isolation",
    "The Objective Journal Rule",
    "Minimal Interpersonal Debt",
    "The Value-Sifting Mind",
    "The Iron Habit Loop",
    "Somatic Stress Venting",
    "The Strategic Slowness",
    "The Decisive Action Pivot",
    "The Clean-Shed Strategy",
    "Ego Death Acceleration",
    "The Silent Resolve",
    "Analytical Breathing Pace",
    "The Ultimate Boundary Rule",
    "The Mind-To-Muscle Command",
    "The Unsent Letters Rule",
    "The Neutral Gaze Technique",
    "The Boredom Tolerance Meter",
    "The Non-Transactional Devotion",
    "The Silent Execution Principle",
    "The Feedback Filter",
    "The Deep Resilience Check",
    "The Uncluttered Workspace Rule",
    "The Unshakable Base State",
    "The Continuous Mastery Focus",
    "The Iron Logic Guard",
    "The Radical Accountability Anchor",
    "The Core Value Sentry",
    "The High-Density Output Rule",
    "The Constant Observation Duty",
    "The Emotional Detox Cycles",
    "The Absolute Integrity Code"
  ];
  
  return {
    number: num,
    title: titles[num - 1] || `The Discipline Rule of Mastery #${num}`,
    category: num % 3 === 0 ? "Strategic Discipline" : num % 3 === 1 ? "Emotional Mastery" : "Cognitive Focus",
    isStatic: false
  };
});

export const allScenariosIndex = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  const staticScenario = strategicScenariosData.find(s => s.number === num);
  if (staticScenario) return { number: num, topic: staticScenario.topic, isStatic: true };
  
  const topics = [
    "", "", // First 2 static
    "Handling Unfair Compensation Spikes",
    "Responding to a Senior's Direct Accusation",
    "The Underprepared Client Pitch Backup",
    "Surviving an Open Team Disagrement",
    "Tactical De-escalation of a Customer Outrage",
    "Negotiating with a High-Leverage Supplier",
    "Communicating Boundaries to a Demanding Friend",
    "Rejecting a High-Profile Unpaid Project",
    "De-escalating a Jealous Colleague's Claims",
    "Shattering Cognitive Stagnation in a Group Session",
    "Addressing Subtle Workspace Credit Hijacking",
    "Navigating Interpersonal Disloyalty",
    "Handling Client Scope Creep Tactfully",
    "Reacting to an Active Interruption Pattern",
    "Correcting rumors and False Backchannel Data",
    "Strategic Non-Response under Toxic Questioning",
    "Preserving Team Morale after a Major Defeat",
    "Declining a Late-Night Urgent Request Safely",
    "Mediating Hostility between Core Subordinates",
    "Advocating for Redundancies to Leadership",
    "Addressing Sudden Budget Reductions Calmly",
    "Surviving a High-Stakes Performance Audit",
    "Responding to Inaccurate Negative Feedback",
    "Rescuing a High-Profile Client Account",
    "Establishing Authority with a Brand New Team",
    "Challenging a Legacy Process constructively",
    "Uncovering Hidden agendas in a Partnership",
    "Managing Communication when Sickness Knocks",
    "Deflecting Underhand Interview Queries",
    "Reacting to Immediate Public praise Humblely",
    "Handling Sudden System-Wide Outages Under Stress",
    "Negotiating Equity Splits with Co-Founders",
    "Vocal Restraint when Dealing with Incompetence",
    "Rejecting Flattery in Professional Networks",
    "Resolving Contract Failures Peacefully",
    "Mitigating Key Talent Departure Threats",
    "Responding to micro-management Tendencies",
    "Navigating Family Commercial Disputation",
    "Handling Accusational Silence from Coworkers",
    "Maintaining Professional leverage on Departure",
    "Correcting a Public Statement You Messed Up",
    "Addressing Sudden Workspace isolation",
    "Vetoing a Highly Popular Bad Design Choice",
    "Guiding a Stubborn Client to Pivot",
    "Managing Accusations of Lack of Team Support",
    "Establishing Terms with Hostile Buyers",
    "Communicating Structural Downsizing Honestly",
    "Handling Sudden Personal Attacks in Social Settings"
  ];
  
  return {
    number: num,
    topic: topics[num - 1] || `The Strategic Situation #${num}`,
    isStatic: false
  };
});

export const allChaptersIndex = [
  { id: "nature-chapter-1", title: "The Anatomy of Cognitive Biases", category: "Cognitive Psychology", isStatic: true },
  { id: "nature-chapter-2", title: "Deciphering Body Language & Micro-Expressions", category: "Non-Verbal Communication", isStatic: true },
  
  // Custom chapters list
  { id: "nature-chapter-3", title: "Evolutionary Triggers & Biological Incentives", category: "Human Psychology", isStatic: false },
  { id: "nature-chapter-4", title: "The Mechanics of Deception & Integrity Search", category: "Social Behavior", isStatic: false },
  { id: "nature-chapter-5", title: "Somatic Feedback & Emotional Intelligence", category: "Emotional Regulation", isStatic: false },
  { id: "nature-chapter-6", title: "The Architecture of Trust and Hidden Motives", category: "Social Dynamics", isStatic: false },
  { id: "nature-chapter-7", title: "Understanding Weakness and Behavioral Hedging", category: "Strategic Mindset", isStatic: false },
  { id: "nature-chapter-8", title: "The Bystander Catalyst & Group Kinetics", category: "Social Psychology", isStatic: false },
  { id: "nature-chapter-9", title: "Cognitive Shifting under Fear Constraints", category: "Decison Making", isStatic: false },
  { id: "nature-chapter-10", title: "Hyper-Rational Observation Protocols", category: "Strategic Focus", isStatic: false },
  { id: "nature-chapter-11", title: "The Psychology of Tribalism & Modern Cultism", category: "Anthropology", isStatic: false },
  { id: "nature-chapter-12", title: "The Infinite-Horizon Growth Mindset Model", category: "Personal Growth", isStatic: false }
];
