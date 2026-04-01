# 🌍 Abroad Guide: Project Summary & Frontend Strategy

## 🏛️ Project Overview: The Backend (Current State)

We have built a robust, enterprise-ready **Spring Boot 3** backend designed to support the entire lifecycle of an international student. The system uses **PostgreSQL (Supabase)** for persistence and **JWT** for secure, role-based access control.

### Core Modules Implemented:
1.  **Identity & Access (IAM)**: 
    *   Roles: `STUDENT`, `ADMIN`, `UNIVERSITY`, `SPONSOR`.
    *   Secure JWT-based authentication and custom exception handling for clear API errors.
2.  **University Management**: 
    *   Full CRUD for institutions, including rankings, tuition, acceptance rates, and climate data.
3.  **Student Intelligence**: 
    *   Deep profiles capturing academic (GPA, SAT/GRE), financial (budget, funding), and lifestyle (climate, city size) data.
    *   **Recommendation Engine**: A multi-factor algorithm that scores universities based on Academic Fit, Financial Fit, and Personal Preferences.
4.  **Student Life Support**:
    *   **Budgeting**: Auto-allocation of funds and affordability tracking.
    *   **Accommodation**: Real-time listing support with roommate matching simulations.
    *   **Transportation**: Transit cost calculators with student discount logic.
    *   **Dining**: Dietary-specific food discovery (Halal, Vegan, etc.) near campuses.

---

## 🎨 Frontend Strategy: The React Platform

To match the premium feel of the backend, the frontend should be a high-performance **React (Vite)** application with focus on "WOW" aesthetics and seamless UX.

### 🛠️ Tech Stack Recommendation
- **Framework**: React 18+ with Vite (for lightning-fast builds).
- **Styling**: Vanilla CSS or Tailwind CSS (only if requested) with a focus on **Glassmorphism** and **Dark Mode**.
- **State Management**: **TanStack Query (React Query)** for server-side state (caching/fetching) and **Zustand** for lightweight global UI state.
- **Animations**: **Framer Motion** for micro-interactions and smooth page transitions.
- **Icons/UI**: Lucide React for consistent iconography.

### 🗺️ Application Architecture
The frontend will be organized into "Student-Centric" and "Admin-Institutional" dashboards.

#### 1. The Welcome Journey (Public)
- **Landing Page**: Immersive scroll animations highlighting success stories.
- **Uni-Search**: Interactive "Search & Filter" sidebar using our `/api/universities/search` endpoint.

#### 2. The Student Dashboard (Private)
- **Profile Setup (The "Onboarding Wizard")**: A multi-step form to collect GPA, test scores, and budget. This feeds the Recommendation Engine.
- **The Match Feed**: A card-based layout showing university matches with "Match %" gauges.
- **Budget Hub**: Visual charts (Doughnut/Bar) showing estimated costs vs. current budget.

#### 3. Support Modules (The "Student Life" Tab)
- **Housing Explorer**: Map-view for accommodations around the chosen university.
- **Transit Planner**: A simple "A to B" route interface fetching from our mock transit API.

---

## 🚀 Next Steps

### Option A: Start Phase 3 (Backend)
Continue implementing more backend features like **Financial Services** (Scholarships, Loans).

### Option B: Build the Frontend Foundation
I can initialize the React project and build the **Authentication Flow** and **Premium Landing Page** to see the system in action.

**Which path would you like to take?**
