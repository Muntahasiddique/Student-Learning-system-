const snippetModel = require("../models/snippet.model");

const saveSnippet = async (req, res) => {
  try {
    const { title, code, language } = req.body;
    // req.user comes from your verifyToken middleware
    const newSnippet = await snippetModel.create({
      userId: req.user.id, 
      title,
      code,
      language
    });
    return res.status(201).json(newSnippet);
  } catch (error) {
    console.error("Save Snippet Error:", error);
    return res.status(500).json({ message: "Failed to save snippet." });
  }
};

const getUserSnippets = async (req, res) => {
  try {
    const snippets = await snippetModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(snippets);
  } catch (error) {
    console.error("Fetch Snippets Error:", error);
    return res.status(500).json({ message: "Failed to fetch snippets." });
  }
};

module.exports = { saveSnippet, getUserSnippets };