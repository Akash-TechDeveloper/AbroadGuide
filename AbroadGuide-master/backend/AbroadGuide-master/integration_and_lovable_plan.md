# 🌍 Abroad Guide: Full Stack Integration & Lovable Prompt

This document provides a detailed mapping between the Spring Boot backend APIs and the components needed in the React frontend. It also includes an optimized prompt for **Lovable** to generate a premium landing page.

---

## 🔗 Backend to Frontend Integration Map

### 1. Identity & Auth (IAM)
*   **Backend Endpoint**: `POST /auth/register`, `POST /auth/login`
*   **Frontend Component**: `AuthModal.tsx` or `LoginPage.tsx`
*   **Action**: Captures email/password, sends to backend, receives JWT.
*   **State**: Stores JWT in secure storage (React Context / Zustand), decodes JWT to get user role (`STUDENT`, `ADMIN`, etc.).

### 2. Student Profile & Onboarding
*   **Backend Endpoint**: `POST /api/students/me`, `GET /api/students/{id}`
*   **Frontend Component**: `OnboardingWizard.tsx`, `ProfileDashboard.tsx`
*   **Action**: After registration, users must complete a multi-step form (GPA, test scores, budget, climate preference, research experience).
*   **State**: Submits data to `POST /api/students/me`. Fetches current data to populate settings page.

### 3. Intelligent Recommendation Engine
*   **Backend Endpoint**: `GET /api/recommendations/universities/{studentId}`
*   **Frontend Component**: `MatchFeed.tsx`, `UniversityCard.tsx`
*   **Action**: This is the core feature. The frontend fetches the personalized list of universities. It needs to visually display the `matchScore` (e.g., a circular progress bar), `acceptanceProbability`, and the detailed lists of `matchedFactors` and `missingFactors`.

### 4. University Search & Details
*   **Backend Endpoint**: `GET /api/universities/search`, `GET /api/universities/{id}`
*   **Frontend Component**: `UniversitySearch.tsx`, `UniversityDetailsModal.tsx`
*   **Action**: Allows manual browsing with filters (country, program, tuition). Displays detailed info when a card is clicked.

### 5. Smart Budgeting Dashboard
*   **Backend Endpoint**: `POST /api/budgets/auto-allocate/{studentId}`, `GET /api/budgets/student/{studentId}`
*   **Frontend Component**: `BudgetHub.tsx`
*   **Action**: Allows users to trigger auto-allocation. Displays the `remainingFunds` and uses charting libraries (e.g., Recharts) to show the breakdown (Tuition vs Accommodation vs Food). Displays the `affordabilitySuggestions`.

### 6. Student Life Integration (Accommodation, Transit, Dining)
*   **Backend Endpoints**: 
    *   `GET /api/accommodations/university/{universityId}`
    *   `GET /api/transportation/university/{universityId}`
    *   `GET /api/dining/university/{universityId}`
*   **Frontend Component**: `StudentLifeExploratoryTabs.tsx`
*   **Action**: When viewing a specific university, a tabbed interface allows students to explore nearby housing, transit options (with calculated student discounts), and dietary-specific dining options.
*   **Roommate Matching**: `GET /api/accommodations/{id}/roommates/student/{studentId}` connects to a `RoommateFinder` component that displays matching scores for potential roommates.

---

## 🤖 Lovable Prompt for Landing Page

*Use this exact text block as your prompt in Lovable to generate the perfect landing page for Abroad Guide.*

```text
Build a premium, modern, and highly interactive landing page for "Abroad Guide," an AI-powered platform for international students. 

Design System & Aesthetics:
- Use a sleek Dark Mode theme (deep navy/slate backgrounds) with a vibrant, energetic accent color (like electric blue or neon purple) for buttons and highlights.
- Implement Glassmorphism effects for cards and navbars (blurred backgrounds, subtle borders).
- Use modern typography (e.g., Inter or Plus Jakarta Sans).
- The overall feel should be "Apple-like premium" mixed with "AI Startup."

Core Sections Needed:
1. Hero Section: 
   - A bold headline: "Your Journey Standardized. Your Future Unlocked."
   - Subheadline: "Discover universities that fit your academic, financial, and personal goals through AI-driven recommendations."
   - A compelling Call-To-Action (CTA) button: "Start Your Journey" (with a subtle pulse or glow animation).
   - A visually striking 3D illustration or high-quality dynamic graphic representing global education or a glowing globe (use Lucide icons if images aren't available).

2. How It Works (Features Section):
   - Use a horizontal layout or a staggered grid to display feature cards with glassmorphic styling.
   - Feature 1: "Smart Matches" (Icon: Brain/Target) - "Our algorithm analyzes your GPA, budget, and lifestyle preferences to find your perfect university match."
   - Feature 2: "Financial Planning" (Icon: Wallet/PieChart) - "Auto-allocate your budget and discover exactly what you can afford, down to the last dollar."
   - Feature 3: "Student Life Hub" (Icon: Home/Map) - "Instantly find housing, transit options, and dining that fit your specific needs near campus."

3. The "Match Feed" Teaser:
   - Create a mockup UI section showing a "Recommendation Card" that displays a University Name, a "92% Match Score" circular progress indicator, and tags like "Fits Budget", "Strong Academic Fit", "Matches Climate". 

4. Social Proof / Trust:
   - Subtle logos of implied partnered universities or a simple "Trusted by 10,000+ Students Worldwide" banner.

5. Footer:
   - Clean, minimal footer with links: "About," "Universities," "Pricing," "Contact."

Animations & Interactions:
- Ensure the Hero elements fade/slide in on load.
- Add hover scaling to feature cards.
- The navigation bar should become sticky and blur the content behind it when scrolling.
```
