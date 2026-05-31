import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI securely on the server side
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features may fail gracefully.");
    }
    ai = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_DEV_WITHOUT_CRASHES",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// 1. AI Reading Assistant Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, bookId, context, history } = req.body;
    const client = getGeminiClient();

    let systemInstruction = `You are the chief academic AI Guide for THE WHITE ROOM ARCHIVES, an elite digital library dedicated to self-discipline, human behavior, tactical communication, and cognitive psychology. 
You speak in a tone that is calm, intellectual, precise, and encouraging, echoing highly professional Japanese minimalist and Stoic philosophies. 
Avoid conversational clutter, emojis, and marketing hype. Give deep, actionable, structured insights.

When referencing the books:
- "The White Room Rules" is about self-mastery, focus, and emotional buffer defense.
- "Strategic Behavior" is about tactical 50-situation responses (neutralizing aggression, handling leverage).
- "Understanding Human Nature" is about motives, cognitive biases, and non-verbal tells.

Context of current reading: ${JSON.stringify(context || {})}`;

    // Format any history for the Gemini API contents
    const contents: any[] = [];
    if (history && history.length > 0) {
      history.forEach((h: any) => {
        contents.push({ role: h.role, parts: [{ text: h.text }] });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Failed to generate AI Reading Assistant response.", details: error.message });
  }
});

// 2. On-Demand Chapter/Rule Expand Route (Infinite Archives Generator)
app.post("/api/generate-content", async (req, res) => {
  try {
    const { type, bookId, number, title, category } = req.body;
    const client = getGeminiClient();

    let prompt = "";
    let systemInstruction = "";

    if (type === "rule") {
      systemInstruction = `You are the master compiler of 'The White Room Rules'. 
Compile Rule #${number}: '${title}' under the category of '${category}'.
You must follow the strict book design layout. Return a clean JSON object containing EXACTLY:
{
  "title": "${title}",
  "category": "${category}",
  "explanation": "A deep, intellectually superior paragraph explaining the psychological and structural mechanics of this rule.",
  "realWorldExample": "A realistic, detailed scenario showing someone applying this rule masterfully in their work or personal life under high pressure.",
  "practicalExercise": "A step-by-step, actionable daily exercise that the reader can execute to internalize this rule.",
  "reflectionQuestions": ["List exactly 3 highly philosophical, self-analytical questions."],
  "commonMistakes": "One primary, subtle mistake and mental trap readers fall into when trying to apply this.",
  "longTermBenefits": "The ultimate transformation and structural advantages accumulated by maintaining this discipline over a decade."
}
Your language must be highly polished, sophisticated, stoic, and educational. Use double-quotes for JSON properties. Do not include markdown code block formatting inside the JSON strings themselves.`;
      prompt = `Draft Rule #${number}: ${title}`;
    } else if (type === "scenario") {
      systemInstruction = `You are the strategic analyst of the 'Strategic Behavior' manual.
Compile Situation #${number}: '${title}' mapping out tactical social decision making.
Return a clean, valid JSON object containing EXACTLY:
{
  "topic": "${title}",
  "number": ${number},
  "scenario": "A descriptive, challenging social or professional situation where communication boundaries are tested.",
  "averageReaction": "The standard emotional, reactive, or defensive mistake average people commit in this situation.",
  "strategicReaction": "The highly calculated, calm, emotionally intelligent, and tactfully dominant response.",
  "analysis": "A deep analysis of why the strategic reaction secures structural advantage and preserves leverage.",
  "psychologicalExplanation": "The evolutionary or cognitive psychology reasons why the human brain gets triggered or how others decode this posture change.",
  "lessonsLearned": ["Exactly 3 key insights summarized clearly as action items."],
  "practicalApplication": "A clear, actionable formula or verbal script the reader can copy-paste into real-world dynamics."
}
Ensure the tone is tactical, sharp, and business-focused. Use double-quotes for JSON properties.`;
      prompt = `Draft Situation #${number}: ${title}`;
    } else {
      // type === "chapter"
      systemInstruction = `You are the lead neuro-psychologist compiling the textbook 'Understanding Human Nature'.
Analyze the chapter: '${title}' under 'Human Psychology'.
Return a clean, valid JSON object containing EXACTLY:
{
  "title": "${title}",
  "category": "${category}",
  "deepExplanation": "A substantial, scientific look into this psychological mechanism, evolutionary origins, and societal impacts.",
  "caseStudy": {
    "title": "A highly descriptive, realistic academic or historic case study representing this concept in action.",
    "description": "Details of the experimental setup, corporate crisis, or social containment study.",
    "metrics": ["Exactly 3 quantitative research findings, ratios, or measurable behaviors."]
  },
  "exercises": ["Two actionable observation exercises."],
  "reflectionQuestions": ["Three self-searching, deep emotional examination questions."],
  "practicalExamples": ["Two common everyday examples of this pattern in standard social circles."],
  "summary": "A powerful 2-sentence summary outlining what to prioritize to leverage or protect oneself against this human nature pattern."
}
Make your descriptions academically rigorous and fascinating to read.`;
      prompt = `Draft Chapter: ${title}`;
    }

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Content Generation Error:", error);
    res.status(500).json({ error: "Failed to generate dynamic library page.", details: error.message });
  }
});

// 3. Dynamic Daily Lesson Generator
app.post("/api/daily-lesson", async (req, res) => {
  try {
    const { category } = req.body;
    const client = getGeminiClient();

    const systemInstruction = `You are the Daily Tutor for THE WHITE ROOM ARCHIVES.
Generate a cohesive, highly engaging daily lesson on the theme: '${category || "Self-Discipline"}'.
Return a clean JSON object containing EXACTLY:
{
  "title": "A highly intellectual daily lesson title",
  "motto": "A minimalist, memorable 1-sentence micro-insight",
  "text": "A deep, 3-paragraph explanation of a specific behavioral pattern, self-mastery hack, or tactical response rule.",
  "exercise": "The specific daily mission they should practice today.",
  "verificationAlert": "A short warning of what traps to avoid in their circles today."
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a custom master lesson for subject category: ${category || "Tactical Focus"} on the date May 31, 2026.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const lesson = JSON.parse(response.text || "{}");
    res.json(lesson);
  } catch (error: any) {
    console.error("Daily Lesson Error:", error);
    res.status(500).json({ error: "Failed to generate daily lesson.", details: error.message });
  }
});

// Serve Vite Assets & Handle SPA Fallbacks
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The White Room Archives running fully server-connected at http://localhost:${PORT}`);
  });
}

startServer();
