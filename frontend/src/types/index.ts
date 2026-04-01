export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'UNIVERSITY' | 'SPONSOR' | 'ADMIN';
  avatar?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryOfOrigin: string;
  educationLevel: string;
  gpa: number;
  gradeSystem: string;
  testScores: Record<string, number>;
  fieldOfStudy: string;
  researchExperience: boolean;
  totalBudget: number;
  currency: string;
  fundingSources: string[];
  financialAidNeeded: boolean;
  countryPreferences: string[];
  citySize: string;
  climate: string;
  languagePreference: string;
  universityType: string;
  campusSize: string;
  rankingImportance: string;
  campusLifePriorities: string[];
  careerGoals: string;
  intendedStartDate: string;
  profileCompletion: number;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  ranking: number;
  acceptanceRate: number;
  tuition: number;
  currency: string;
  matchScore?: number;
  matchFactors?: string[];
  programs: string[];
  studentCount: number;
  facultyRatio: string;
  description: string;
  images: string[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface Budget {
  totalBudget: number;
  currency: string;
  categories: BudgetCategory[];
  affordableUniversities: number;
  totalUniversities: number;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  price: number;
  distance: string;
  amenities: string[];
  rating: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  country: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}
