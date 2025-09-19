[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)

# EXAM STUDY PLANNER – Preliminary Assignment Submission

⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage

**How to install and run your project:**

**Backend Setup:**

```bash
cd backend
npm install
npm run dev
```

**Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

**Prerequisites:**

- Node.js (v16 or higher)
- MongoDB (for database)
- npm package manager

## 🔗 Deployed Web URL or APK file

(https://exam-study-planner.vercel.app/)

## 🎥 Demo Video

**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.

- “Unlisted” videos can only be viewed by users who have the link.
- The video will not appear in search results or on your channel.
- Share the link in your README so mentors can access it.

✍️ [Demo video will be uploaded to YouTube (Unlisted) - link coming soon]

## 💻 Project Introduction

### a. Overview

This is a comprehensive Study Management System designed specifically for Vietnamese university students to tackle the daily crisis of time management. The app helps students organize their study schedules, track exam deadlines, and manage their academic progress efficiently. It addresses the core problem of students juggling multiple tasks across classes, group projects, part-time work, and personal life by providing a centralized digital solution for academic time management.

### b. Key Features & Function Manual

**Core CRUD Operations:**

- **Create:** Add new study sessions, topics, exams, and study plans
- **Read:** View all data in multiple formats (dashboard, calendar, progress charts)
- **Update:** Edit study sessions, mark progress, update exam details
- **Delete:** Remove completed or canceled study sessions and topics

**Three Main Views:**

1. **Dashboard View:** Overview of today's study plan, upcoming exams, and progress statistics
2. **Calendar/Schedule View:** Weekly and monthly view of all study sessions and exam deadlines
3. **Progress/Analytics View:** Charts and analytics showing study patterns and achievement tracking

**Key Features:**

- Study session time tracking and management
- Exam deadline monitoring with collision detection
- Topic-based learning progress tracking
- AI-powered study plan recommendations
- Interactive calendar for schedule management
- Comprehensive activity logging and analytics
- Smart time management with alerts and notifications

### c. Unique Features (What’s special about this app?)

**Student-Centric Design:**

- Specifically tailored for Vietnamese university students' learning patterns
- Understands the unique challenges of balancing academic, work, and personal commitments
- Intuitive interface designed for busy student lifestyles

**AI-Powered Study Planning:**

- Intelligent exam plan generation using AI agents
- AI-powered creation of custom review questions for any topic
- Personalized study recommendations based on learning preferences
- Adaptive settings that learn from user behavior and optimize study schedules

**Smart Time Management:**

- Deadline collision detection to prevent scheduling conflicts
- Study session time estimation and tracking
- Progress forecasting for topic completion
- Interactive timeline for upcoming exams with visual priorities

**Comprehensive Analytics:**

- Detailed activity logging and progress tracking
- Visual charts showing study patterns and achievements
- Study focus analysis and productivity

### d. Technology Stack and Implementation Methods

**Frontend:**

- **React 19** with TypeScript for type safety and modern development
- **Vite** for fast development server and optimized builds
- **Tailwind CSS** for responsive and modern UI design
- **Radix UI** components for accessible and consistent UI elements
- **React Router DOM** for client-side routing
- **TanStack React Query** for efficient data fetching and caching
- **React Hook Form** for form handling and validation
- **FullCalendar** for interactive calendar functionality
- **Recharts** for data visualization and analytics
- **OpenAI API** integration for AI-powered features

**Backend:**

- **Node.js** with Express.js framework for RESTful API
- **MongoDB** with Mongoose for database management
- **CORS** for cross-origin resource sharing
- **dotenv** for environment configuration
- **OpenAI API** for AI study planning features

**Development Tools:**

- **ESLint** for code quality and consistency
- **Nodemon** for development server hot reloading
- **TypeScript** for type checking and better development experience

### e. Service Architecture & Database structure (when used)

**Frontend Architecture:**

- Component-based React architecture with clear separation of concerns
- **Components:** Organized by feature areas (ai, dashboard, exams, navigation, progress, etc.)
- **Pages:** Route-specific components for different app sections
- **Contexts:** Global state management with React Context (AIContext, ModalContext)
- **Hooks:** Custom hooks for reusable logic (useExams, useTopics, useStudySessions, etc.)
- **Services:** API integration and business logic

**Backend Architecture:**

- **MVC Pattern Implementation:**
  - **Models:** Data schemas for ActivityLog, Exam, StudySession, Topic
  - **Controllers:** Business logic for handling requests (activityController, aiController, examController, etc.)
  - **Routes:** API endpoint definitions organized by feature
  - **Config:** Database configuration and environment setup

**Database Structure (MongoDB):**

- **Topics Collection:** Subject areas with progress tracking
- **Exams Collection:** Exam details with deadlines and priorities
- **StudySessions Collection:** Individual study session records
- **ActivityLog Collection:** User activity tracking and analytics

**API Design:**

- RESTful endpoints for all CRUD operations
- Consistent response formatting and error handling
- Environment-based configuration for different deployment stages

## 🧠 Reflection

### a. If you had more time, what would you expand?

**Enhanced AI Features:**

- More sophisticated AI study plan optimization that learns from user success patterns
- Natural language processing for easy task creation via voice or text input
- Predictive analytics to forecast study session effectiveness and suggest optimal study times
- AI-powered content summarization and study guide generation

**Advanced Collaboration Features:**

- Study group coordination and shared study schedules
- Peer comparison and motivation features with privacy controls
- Real-time collaboration on study plans and progress sharing
- Study buddy matching based on subjects and study patterns

**Mobile and Offline Capabilities:**

- Progressive Web App (PWA) implementation for mobile optimization
- Offline functionality for core features when internet is unavailable
- Push notifications for study reminders and deadline alerts
- Mobile-specific gestures and interactions

**Extended Analytics and Insights:**

- More detailed productivity analytics and study pattern recognition
- Comparison with anonymized peer data for motivation
- Long-term goal tracking and achievement systems
- Integration with external calendar apps and educational platforms

### b. If you integrate AI APIs more for your app, what would you do?

**Intelligent Study Planning:**

- Use machine learning to analyze individual learning patterns and optimize study schedules
- Implement adaptive learning algorithms that adjust difficulty and pacing based on performance
- Create personalized study techniques recommendations based on learning style assessment
- Develop AI-powered deadline prediction that considers personal work patterns and external factors

**Smart Content Generation:**

- Generate custom study materials and flashcards from course content
- Create practice questions and mock exams tailored to specific subjects and difficulty levels
- Summarize long academic texts and research papers into digestible study notes
- Translate complex concepts into simpler explanations based on the student's current knowledge level

**Behavioral Analysis and Optimization:**

- Analyze procrastination patterns and provide personalized motivation strategies
- Predict optimal study times based on historical productivity data and external factors
- Recommend break schedules and study session lengths for maximum retention
- Identify knowledge gaps and suggest targeted review sessions

**Advanced Notifications and Reminders:**

- Context-aware notifications that consider current activities and stress levels
- AI-powered reminder timing that adapts to user response patterns
- Smart escalation of reminder urgency based on deadline proximity and completion probability

## ✅ Checklist

- [✅] Code runs without errors
- [✅] All required features implemented (add/edit/delete/complete tasks)
- [✅] All ✍️ sections are filled
