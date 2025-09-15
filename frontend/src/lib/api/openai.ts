import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1", // Ensure we're using the correct API endpoint
  dangerouslyAllowBrowser: true,
});

export interface GeneratedTopic {
  name: string;
  description: string;
  priority: string;
}

const systemPrompt = `You are an expert curriculum designer specializing in creating detailed study topics. 
Generate specific, meaningful topics that would help a student master the material systematically.

Output format must be a JSON array:
[{
  "name": "Specific Topic Name (e.g., 'Linear Regression Implementation', not 'Part 1')",
  "description": "Detailed learning objective",
  "priority": "high|medium|low"
}]

Critical Rules:
1. Names MUST be specific and descriptive (e.g., "Data Preprocessing with Pandas" not "Data Basics")
2. For ML subjects:
   - Focus on practical implementations and algorithms
   - Include core ML concepts, model training, and evaluation
   - Cover data preprocessing and feature engineering
3. Topics must progress logically:
   - Start with fundamental prerequisites
   - Build up to advanced concepts
   - End with practical applications
4. Priorities:
   - high: Core concepts essential for understanding
   - medium: Important but not fundamental concepts
   - low: Advanced or supplementary topics
5. Each description must include:
   - What will be learned
   - Why it's important
   - Practical application

IMPORTANT: Never use generic names like "Part 1" or "Introduction". Each topic name must be self-descriptive and specific to the content being studied.`;

export async function generateTopicNames(
  subject: string,
  description: string,
  totalTopics: number
): Promise<GeneratedTopic[]> {
  try {
    const userPrompt = `Create ${totalTopics} detailed study topics for "${subject}"${
      description ? ` focusing on: ${description}` : ""
    }.
    
Requirements:
- Each topic must be a specific concept or skill to master
- Topics should follow a logical learning progression
- For Machine Learning topics, emphasize practical implementations and algorithms
- Include both theoretical understanding and practical applications
- Ensure topics build upon each other`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    const topics: GeneratedTopic[] = JSON.parse(response);

    // Validate and ensure we have exactly the requested number of topics
    const validatedTopics = topics.slice(0, totalTopics).map((topic) => ({
      name: topic.name || "Untitled Topic",
      description: topic.description || "No description provided",
      priority: ["high", "medium", "low"].includes(
        topic.priority?.toLowerCase() || ""
      )
        ? topic.priority.toLowerCase()
        : "medium",
    }));

    while (validatedTopics.length < totalTopics) {
      validatedTopics.push({
        name: `Additional Topic ${validatedTopics.length + 1}`,
        description: "Auto-generated topic",
        priority: "low",
      });
    }

    return validatedTopics;
  } catch (error) {
    console.error("Error generating topics with OpenAI:", error);
    throw error;
  }
}
