import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  const userText = req.body.text;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: "Convert text into image prompt" },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  res.json({ prompt: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running"));