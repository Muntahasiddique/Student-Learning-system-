const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askAITutor = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ reply: responseText });
  } catch (error) {
    console.error("AI Error:", error);
    
    if (error.status === 503) {
      return res.status(503).json({ 
        message: "I am helping a lot of students right now! Please wait a moment and ask again." 
      });
    }

    res.status(500).json({ message: "Failed to connect to the AI network." });
  }
};

module.exports = {
  askAITutor
};