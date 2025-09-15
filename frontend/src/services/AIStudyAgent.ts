import type { StudentPreferences } from "../types/ai-agent/preferences";
import type { StudyPlan, WeeklyMilestone } from "../types/ai-agent/study-plan";
import type { TopicSuggestion } from "../types/ai-agent/exam-creation";
import { createExam } from "../lib/api/exams";
import { createTopic } from "../lib/api/topics";
import { generateTopicNames } from "../lib/api/openai";

interface AutoExamCreation {
  title: string;
  totalTopics: number;
  topics: TopicSuggestion[];
  estimatedTotalHours: number;
  examDate: string;
  recommendedStudyStartDate: string;
}

export class AIStudyAgent {
  readonly preferences: StudentPreferences;
  readonly examDate: Date;
  readonly subject: string;
  readonly description: string;

  constructor(
    preferences: StudentPreferences,
    examDate: Date,
    subject: string,
    description: string = ""
  ) {
    this.preferences = preferences;
    this.examDate = examDate;
    this.subject = subject;
    this.description = description;
  }

  private async generateTopics(totalTopics: number): Promise<TopicSuggestion[]> {
    if (!this.subject) throw new Error("Subject is required");
    
    try {
      // If it's a machine learning subject, use OpenAI to generate ML-focused topics
      if (this.subject.toLowerCase().includes("machine learning") || 
          (this.description && this.description.toLowerCase().includes("machine learning"))) {
        const topics = await generateTopicNames(this.subject, this.description || "", totalTopics);
        return topics.map((topic) => ({
          name: `${this.subject} - ${topic.name}`,
          estimatedMinutes: 45,
          priority: topic.priority as "high" | "medium" | "low",
          description: topic.description,
        }));
      }
      
      // For non-ML subjects, use OpenAI to generate relevant topics
      const topics = await generateTopicNames(this.subject, this.description || "", totalTopics);
      return topics.map((topic) => ({
        name: topic.name,
        estimatedMinutes: 45,
        priority: topic.priority as "high" | "medium" | "low",
        description: topic.description,
      }));
    } catch (error) {
      // Fallback to generic topics if OpenAI generation fails
      console.error("Failed to generate topics with OpenAI:", error);
      const topics: TopicSuggestion[] = [];
      for (let i = 1; i <= totalTopics; i++) {
        topics.push({
          name: this.description 
            ? `${this.subject} - ${this.description.split(".")[0]} - Part ${i}`
            : `${this.subject} - Topic ${i}`,
          estimatedMinutes: 45,
          priority: i <= 3 ? "high" : i <= 6 ? "medium" : "low",
          description: this.description
            ? `${this.description} - Part ${i}`
            : `Auto-generated topic ${i} for ${this.subject}`,
        });
      }
      return topics;
    }
  }

  public async generateAndCreateStudyPlan(): Promise<StudyPlan> {
    try {
      // Step 1: Generate exam and topics structure
      const examCreation = await this.generateExamStructure();

      // Step 2: Create the exam in the backend
      const exam = await createExam({
        title: examCreation.title,
        examDate: examCreation.examDate,
        studyDate: examCreation.recommendedStudyStartDate,
        isAIGenerated: true,
        description: this.description || "",
      });

      // Step 3: Create all suggested topics
      const topicCreationPromises = examCreation.topics.map((topic) =>
        createTopic({
          name: topic.name,
          exam: exam._id,
          status: "Not Started",
          estimatedMinutes: topic.estimatedMinutes,
        })
      );

      await Promise.all(topicCreationPromises);

      // Step 4: Generate the study plan
      const studyPlan: StudyPlan = {
        subject: this.subject,
        studentId: `temp-${Date.now()}`, // Temporary ID until we have user authentication
        examDate: this.examDate.toISOString(),
        targetGrade: this.preferences.examPreferences?.targetGrade || "A",
        totalWeeks: this.calculateWeeksUntilExam(),
        weeklySchedule: this.generateWeeklyMilestones(examCreation),
        dailySchedules: [],
        adaptiveRecommendations: {
          studyTechniques: [
            "Use active recall techniques",
            "Practice spaced repetition",
            "Create mind maps and diagrams",
          ],
          timeManagement: [
            "Follow the study schedule",
            "Use Pomodoro technique",
            "Take regular breaks",
          ],
          stressManagement: [
            "Practice deep breathing",
            "Take regular exercise",
            "Maintain a healthy sleep schedule",
          ],
          examPreparation: [
            "Review key concepts regularly",
            "Take practice tests",
            "Focus on weak areas",
          ],
        },
        progressTracking: {
          completedTopics: [],
          masteredConcepts: [],
          areasForImprovement: [],
          overallProgress: 0,
        },
      };

      return studyPlan;
    } catch (error) {
      console.error("Error in generateAndCreateStudyPlan:", error);
      throw error;
    }
  }

  private async generateExamStructure(): Promise<AutoExamCreation> {
    const totalWeeks = this.calculateWeeksUntilExam();
    const title = `${this.subject} - AI Generated Plan`;

    // Calculate number of topics based on study duration
    const totalTopics = Math.min(10 * totalWeeks, 30);
    const topics = await this.generateTopics(totalTopics);
    const estimatedTotalHours = Math.ceil((topics.length * 45) / 60); // 45 minutes per topic

    return {
      title,
      totalTopics,
      topics,
      estimatedTotalHours,
      examDate: this.examDate.toISOString(),
      recommendedStudyStartDate:
        this.calculateRecommendedStartDate().toISOString(),
    };
  }

  private generateWeeklyMilestones(
    examCreation: AutoExamCreation
  ): WeeklyMilestone[] {
    const startDate = new Date(examCreation.recommendedStudyStartDate);
    const totalWeeks = this.calculateWeeksUntilExam();
    const milestones: WeeklyMilestone[] = [];
    const topicsPerWeek = Math.ceil(examCreation.topics.length / totalWeeks);

    for (let week = 0; week < totalWeeks; week++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(startDate.getDate() + week * 7);

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      const startIndex = week * topicsPerWeek;
      const endIndex = Math.min(
        startIndex + topicsPerWeek,
        examCreation.topics.length
      );
      const weeklyTopics = examCreation.topics.slice(startIndex, endIndex);

      milestones.push({
        weekNumber: week + 1,
        startDate: weekStartDate.toISOString(),
        endDate: weekEndDate.toISOString(),
        topics: weeklyTopics.map((t) => t.name),
        expectedProgress: `${Math.round(((week + 1) * 100) / totalWeeks)}%`,
        assessmentCriteria: [
          `Complete practice problems for Week ${week + 1}`,
          `Review and revise challenging concepts`,
          `Self-assessment quiz`,
        ],
      });
    }

    return milestones;
  }

  private calculateWeeksUntilExam(): number {
    const diffTime = this.examDate.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  }

  private calculateRecommendedStartDate(): Date {
    const totalWeeks = this.calculateWeeksUntilExam();
    const recommendedStartDate = new Date();
    const bufferDays = Math.min(7, Math.ceil(totalWeeks * 1.5)); // Add a buffer of up to a week
    recommendedStartDate.setDate(recommendedStartDate.getDate() + bufferDays);
    return recommendedStartDate;
  }
}

export default AIStudyAgent;
