import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Companion Endpoint
app.post("/api/ai/chat", async (req, res) => {
  const { messages, userProfile } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "الرسائل مدخلة بشكل غير صحيح." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({ 
      error: "يرجى تهيئة مفتاح GEMINI_API_KEY في قسم الرموز السرية (Secrets) لتفعيل المساعد الذكي." 
    });
  }

  try {
    // Format conversation history and add a supportive persona in Arabic
    const chatHistory = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    // The user's goal is general task management, skincare (skin massage), and body fitness (sport).
    // They arrive at home at 20:30.
    const systemInstruction = `أنت "مساعد رعاية المساء والمهام اليومية"، مستشار وودود عالي الخبرة في تسيير الوقت، تمرين العناية بالبشرة (Skin Massage) وتمارين زيادة لياقة الجسم في المنزل (Sport Body).
تجيب بالعربية الفصحى فقط بأسلوب راقٍ وملهم.
تضع في كنف اهتمامك أن المستخدم يصل إلى منزله في تمام الساعة 20:30 كل يوم، ويرغب في تحسين عادات يومه للعناية وتوزيع وقته.
مهماتك:
1. الإجابة بدقة عن أسئلة المستخدم حول تقنيات تدليك البشرة بالمنزل، شد الوجه، علاج الهالات والترهلات.
2. تقديم نصائح لممارسة الرياضة البدنية المنزلية المناسبة للمساء (تمارين لا تسبب الأرق بل تنظم النوم، تمارين استقامة الظهر).
3. تقديم اقتراحات وحلول مرنة لمهامه ومساعدته على تدوين العادات ومحاربة الكسل.
اجعل إجاباتك واضحة، مهيكلة بنقاط رشيقة وسهلة القراءة ومباشرة لتبدو أنيقة وثرية لزيادة دافعية ورياضة المستخدم.`;

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    // In @google/genai, ai.chats doesn't require setting all history on create if we want to manually append,
    // or we can load history into the chat.
    // However, @google/genai chat history loads automatically or we can feed it.
    // Let's make a single direct generateContent call which is robust, fast, and does not depend on chat instance session state, keeping it completely stateless and free of session bugs!
    const promptParts = [
      { text: `سياق الملف الشخصي للمستخدم: الوصول للمنزل الساعة 20:30 وممارسة روتين العناية بالبشرة والرياضة.\n\nتاريخ المحادثة السابقة:\n` },
      ...messages.map((msg: any) => ({
        text: `${msg.role === "user" ? "المستخدم" : "المساعد"}: ${msg.text}\n`
      })),
      { text: "المساعد:" }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptParts.map(p => p.text).join("\n"),
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "عذراً لم أستطع صياغة إجابة مناسبة حالياً، يرجى المحاولة بعد قليل.";
    return res.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      error: "حدث خطأ أثناء التواصل مع المساعد الذكي. تفاصيل: " + (error.message || error)
    });
  }
});

// AI Endpoint to generate quick suggestions
app.post("/api/ai/suggest", async (req, res) => {
  const { currentTasks } = req.body;
  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({ 
      error: "مفتاح API غير متوفر." 
    });
  }

  try {
    const prompt = `بناءً على قائمة المهام الحالية للمستخدم: ${JSON.stringify(currentTasks || [])}.
هو يصل للمنزل في 20:30. اقترح له 3 مهام هامة سريعة ومحمسة ليقوم بها الليلة لتغطية عناية البشرة والرياضة والراحة المنزلية.
أرجع النتيجة بصيغة JSON كالتالي:
[
  {"title": "مهمة مقترحة", "category": "skin_massage" | "sport" | "home", "desc": "شرح مبسط وجذاب لبضع كلمات"}
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              desc: { type: Type.STRING }
            },
            required: ["title", "category", "desc"]
          }
        },
        temperature: 0.8
      }
    });

    const suggestions = JSON.parse(response.text || "[]");
    return res.json({ suggestions });
  } catch (error) {
    console.error("Suggest API Error:", error);
    return res.status(500).json({ error: "فشل إنشاء المقترحات" });
  }
});

// Vite & Static assets mounting
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
    // Serve HTML
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
