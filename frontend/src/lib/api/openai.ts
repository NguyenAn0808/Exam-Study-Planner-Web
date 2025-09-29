// Note: OpenAI calls should go through our backend API instead of direct client calls
// This ensures API keys are kept secure and not exposed to the browser

import api from '../axios';

export interface GeneratedTopic {
  name: string;
  description: string;
  priority: string;
}



export async function generateTopicNames(
  subject: string,
  description: string,
  totalTopics: number
): Promise<GeneratedTopic[]> {
  try {
    // Call backend API to generate topics using OpenAI
    const response = await api.post('/ai/generate-topics', {
      subject,
      description,
      totalTopics
    });

    const topics: GeneratedTopic[] = response.data.topics || [];

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
