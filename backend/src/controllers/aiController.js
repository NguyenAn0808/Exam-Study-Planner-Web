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

export const generateExamPlan = async (req, res) => {
  const {
    examId,
    examTitle,
    examDate,
    currentTopics,
    studyTimeAvailable,
    studentProfile,
  } = req.body;

  if (!examTitle || !examDate) {
    return res
      .status(400)
      .json({ message: "Exam title and date are required." });
  }

  try {
    // Create a new exam with isAIGenerated flag
    const exam = new Exam({ 
      title: examTitle, 
      examDate, 
      isAIGenerated: true 
    });
    await exam.save();
    // Set timeout for OpenAI API call to prevent long-running requests
    const timeout = 20000; // 20 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("AI request timed out")), timeout);
    });

    const prompt = `You are an elite AI study strategist for Vietnamese university students...`; // Your existing prompt

    try {
      // Race between API call and timeout
      const completionPromise = openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Vietnamese university study strategist and grade optimization specialist. Always respond with valid, detailed JSON that helps students achieve maximum grades.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000,
      });

      const completion = await Promise.race([
        completionPromise,
        timeoutPromise,
      ]);

      const content = completion.choices[0].message.content;
      try {
        const examPlan = JSON.parse(content);

        // Validate the response structure
        if (!examPlan.topics || !examPlan.schedule || !examPlan.successTips) {
          throw new Error("Invalid AI response structure");
        }

        res.status(200).json(examPlan);
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        throw new Error("Failed to parse AI response");
      }
    } catch (apiError) {
      console.error("Error with OpenAI API:", apiError);

      // Ensure fallbackPlan is properly defined
      const fallbackPlan = {
        totalTopics: 12,
        totalStudyHours: studyTimeAvailable * 4,
        expectedGrade: "B+",
        difficulty: "moderate",
        strategy:
          "Systematic approach focusing on high-impact topics first, followed by comprehensive practice and strategic review sessions optimized for Vietnamese university exam patterns.",
        topics: generateAdvancedFallbackTopics(examTitle),
        schedule: generateAdvancedFallbackSchedule(
          studyTimeAvailable,
          examTitle
        ),
        successTips: [
          "Start with highest-impact topics when your mental energy is peak",
          "Use active recall and spaced repetition techniques for better retention",
          "Create detailed summary sheets for quick pre-exam review",
          "Join study groups to discuss complex concepts and share insights",
          "Practice with past papers to understand exact exam format and expectations",
          "Take strategic breaks using the Pomodoro technique to maintain focus",
          "Get adequate sleep - avoid all-night cramming which reduces performance",
          "Teach concepts to others to solidify your own understanding",
          "Use Vietnamese study methods like group discussion and peer learning",
          "Focus on understanding rather than memorization for long-term retention",
        ],
        examPreparationStrategy: {
          weekBefore: [
            "Complete final review of all high-priority topics",
            "Take practice exams under timed conditions",
            "Review common mistakes and weak areas",
            "Organize all study materials and notes",
            "Confirm exam details and requirements",
          ],
          dayBefore: [
            "Light review of key concepts only",
            "Get 8+ hours of sleep",
            "Prepare exam materials and documents",
            "Eat nutritious meals and stay hydrated",
            "Avoid learning new material",
          ],
          examDay: [
            "Arrive early and stay calm",
            "Read all instructions carefully",
            "Start with easier questions to build confidence",
            "Manage time effectively across all sections",
            "Review answers if time permits",
          ],
        },
        readinessMetrics: {
          overallReadiness: 75,
          topicReadiness: [
            {
              topicName: "Core Concepts",
              readinessScore: 80,
              confidenceLevel: "high",
              timeToMastery: 10,
            },
            {
              topicName: "Advanced Topics",
              readinessScore: 60,
              confidenceLevel: "medium",
              timeToMastery: 15,
            },
            {
              topicName: "Practice Applications",
              readinessScore: 70,
              confidenceLevel: "medium",
              timeToMastery: 12,
            },
          ],
          riskFactors: [
            "Limited time for comprehensive coverage",
            "Complex topics requiring more practice",
            "Potential stress affecting performance",
          ],
          strengths: [
            "Strong foundation in basic concepts",
            "Good time management skills",
            "Systematic study approach",
          ],
          recommendations: [
            "Focus extra time on medium-confidence topics",
            "Use group study for difficult concepts",
            "Practice stress management techniques",
          ],
        },
        milestones: generateMilestones(studyTimeAvailable),
      };

      res.status(200).json(fallbackPlan);
    }
  } catch (error) {
    console.error("Error generating exam plan:", error);
    res.status(500).json({
      message: "Failed to generate exam plan",
      error: error.message,
    });
  }
};

// Helper functions for enhanced fallback
const generateAdvancedFallbackTopics = (examTitle) => {
  const baseTopics = [
    {
      name: "Fundamental Concepts",
      priority: "critical",
      hours: 8,
      impact: 10,
      difficulty: "beginner",
      studyMethods: ["Active reading", "Concept mapping", "Flashcards"],
      studyTips: [
        "Start with basic definitions",
        "Use visual aids",
        "Practice with simple examples",
      ],
      keyConceptsToMaster: [
        "Basic terminology",
        "Core principles",
        "Foundation theories",
      ],
      commonMistakes: [
        "Skipping fundamentals",
        "Memorizing without understanding",
      ],
      examStrategy: "Ensure solid foundation before moving to complex topics",
    },
    {
      name: "Core Theory & Principles",
      priority: "critical",
      hours: 10,
      impact: 9,
      difficulty: "intermediate",
      studyMethods: ["Deep reading", "Note-taking", "Discussion groups"],
      studyTips: [
        "Connect theories to real examples",
        "Create comparison charts",
        "Teach concepts to peers",
      ],
      keyConceptsToMaster: [
        "Main theories",
        "Cause-effect relationships",
        "Practical applications",
      ],
      commonMistakes: [
        "Surface-level understanding",
        "Not connecting concepts",
      ],
      examStrategy: "Focus on understanding relationships between concepts",
    },
    {
      name: "Advanced Applications",
      priority: "high",
      hours: 12,
      impact: 8,
      difficulty: "advanced",
      studyMethods: ["Problem solving", "Case studies", "Practice exercises"],
      studyTips: [
        "Work through multiple examples",
        "Identify patterns",
        "Practice under time pressure",
      ],
      keyConceptsToMaster: [
        "Complex problem solving",
        "Multi-step processes",
        "Critical analysis",
      ],
      commonMistakes: [
        "Rushing through problems",
        "Not checking work",
        "Ignoring edge cases",
      ],
      examStrategy: "Practice various problem types and time management",
    },
    {
      name: "Practical Implementation",
      priority: "high",
      hours: 8,
      impact: 7,
      difficulty: "intermediate",
      studyMethods: [
        "Hands-on practice",
        "Project work",
        "Real-world examples",
      ],
      studyTips: [
        "Build practical projects",
        "Apply concepts to current events",
        "Create implementation guides",
      ],
      keyConceptsToMaster: [
        "Real-world application",
        "Implementation strategies",
        "Best practices",
      ],
      commonMistakes: [
        "Only theoretical study",
        "Not practicing implementation",
      ],
      examStrategy: "Be ready to apply knowledge to practical scenarios",
    },
    {
      name: "Critical Analysis & Evaluation",
      priority: "medium",
      hours: 6,
      impact: 8,
      difficulty: "advanced",
      studyMethods: [
        "Critical thinking exercises",
        "Comparative analysis",
        "Debate practice",
      ],
      studyTips: [
        "Practice evaluating different perspectives",
        "Develop argumentation skills",
        "Learn to cite evidence",
      ],
      keyConceptsToMaster: [
        "Critical thinking",
        "Evidence evaluation",
        "Logical reasoning",
      ],
      commonMistakes: [
        "Accepting information without analysis",
        "Weak argumentation",
      ],
      examStrategy: "Prepare to analyze and evaluate different viewpoints",
    },
  ];

  return baseTopics.map((topic) => ({
    name: `${examTitle}: ${topic.name}`,
    description: `Comprehensive coverage of ${topic.name.toLowerCase()} for ${examTitle}`,
    priority: topic.priority,
    estimatedHours: topic.hours,
    difficulty: topic.difficulty,
    gradeImpact: topic.impact,
    studyMethods: topic.studyMethods,
    studyTips: topic.studyTips,
    prerequisites:
      topic.name === "Fundamental Concepts"
        ? []
        : ["Understanding of fundamental concepts"],
    practiceExercises: [
      `Practice problems for ${topic.name}`,
      `Mock questions on ${topic.name}`,
      `Case studies related to ${topic.name}`,
    ],
    keyConceptsToMaster: topic.keyConceptsToMaster,
    commonMistakes: topic.commonMistakes,
    examStrategy: topic.examStrategy,
    timeAllocation: {
      learning: topic.difficulty === "beginner" ? 60 : 40,
      practice: topic.difficulty === "beginner" ? 25 : 40,
      review: 15,
    },
  }));
};

const generateAdvancedFallbackSchedule = (daysAvailable, examTitle) => {
  const schedule = [];
  const today = new Date();

  // Phase 1: Foundation (first 40% of time)
  const foundationDays = Math.ceil(daysAvailable * 0.4);
  for (let i = 0; i < foundationDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    schedule.push({
      phase: "foundation",
      date: date.toISOString().split("T")[0],
      sessions: [
        {
          startTime: "09:00",
          endTime: "11:30",
          activity: "Fundamental Concepts Study",
          topicName: `${examTitle}: Fundamental Concepts`,
          duration: 150,
          studyMethod: "Active reading and note-taking",
          priority: "critical",
        },
        {
          startTime: "14:00",
          endTime: "16:00",
          activity: "Theory and Principles",
          topicName: `${examTitle}: Core Theory`,
          duration: 120,
          studyMethod: "Concept mapping and discussion",
          priority: "critical",
        },
      ],
    });
  }

  // Phase 2: Practice (next 40% of time)
  const practiceDays = Math.ceil(daysAvailable * 0.4);
  for (let i = foundationDays; i < foundationDays + practiceDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    schedule.push({
      phase: "practice",
      date: date.toISOString().split("T")[0],
      sessions: [
        {
          startTime: "09:00",
          endTime: "12:00",
          activity: "Advanced Applications Practice",
          topicName: `${examTitle}: Advanced Applications`,
          duration: 180,
          studyMethod: "Problem solving and case studies",
          priority: "high",
        },
        {
          startTime: "14:00",
          endTime: "16:30",
          activity: "Practical Implementation",
          topicName: `${examTitle}: Practical Implementation`,
          duration: 150,
          studyMethod: "Hands-on practice and projects",
          priority: "high",
        },
      ],
    });
  }

  // Phase 3: Review and Final Prep (remaining 20% of time)
  for (let i = foundationDays + practiceDays; i < daysAvailable; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    schedule.push({
      phase: "final_prep",
      date: date.toISOString().split("T")[0],
      sessions: [
        {
          startTime: "09:00",
          endTime: "12:00",
          activity: "Comprehensive Review",
          topicName: "All Topics Review",
          duration: 180,
          studyMethod: "Mock exams and critical analysis",
          priority: "critical",
        },
        {
          startTime: "14:00",
          endTime: "16:00",
          activity: "Weak Areas Focus",
          topicName: "Identified Weak Areas",
          duration: 120,
          studyMethod: "Targeted practice and review",
          priority: "high",
        },
      ],
    });
  }

  return schedule;
};

const generateMilestones = (daysAvailable) => {
  const milestones = [];
  const today = new Date();

  // Milestone 1: Foundation Complete (40% through)
  const milestone1Date = new Date(today);
  milestone1Date.setDate(today.getDate() + Math.ceil(daysAvailable * 0.4));
  milestones.push({
    date: milestone1Date.toISOString().split("T")[0],
    description:
      "Foundation phase completed - all fundamental concepts mastered",
    targetProgress: 40,
    assessmentMethod: "Self-assessment quiz on fundamental concepts",
  });

  // Milestone 2: Practice Complete (80% through)
  const milestone2Date = new Date(today);
  milestone2Date.setDate(today.getDate() + Math.ceil(daysAvailable * 0.8));
  milestones.push({
    date: milestone2Date.toISOString().split("T")[0],
    description:
      "Practice phase completed - all applications and implementations practiced",
    targetProgress: 80,
    assessmentMethod: "Mock exam and practical application test",
  });

  // Milestone 3: Exam Ready (100%)
  const milestone3Date = new Date(today);
  milestone3Date.setDate(today.getDate() + daysAvailable - 1);
  milestones.push({
    date: milestone3Date.toISOString().split("T")[0],
    description:
      "Exam ready - comprehensive review completed and confidence achieved",
    targetProgress: 100,
    assessmentMethod: "Final mock exam and readiness assessment",
  });

  return milestones;
};
