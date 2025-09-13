import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuestions = async (req, res) => {
  const { topicName } = req.body;

  if (!topicName) {
    return res.status(400).json({ message: "Topic name is required." });
  }

  try {
    const prompt = `You are an expert tutor. Create exactly 3 multiple-choice practice questions about the topic: "${topicName}".
    For each question, provide 4 options labeled A, B, C, D and clearly indicate the correct answer.
    Format your entire response as a single, valid JSON object. The object must have a key "questions" which is an array of objects.
    Each object in the array must have three keys: "questionText" (string), "options" (an array of 4 strings), and "correctAnswer" (a string, e.g., "C").
    Do not include any text, introductory sentences, or formatting outside of this main JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    const questionsJson = JSON.parse(content);

    res.status(200).json(questionsJson);
  } catch (error) {
    console.error("Error generating questions from OpenAI:", error);
    res.status(500).json({
      message: "An error occurred while communicating with the AI service.",
    });
  }
};
