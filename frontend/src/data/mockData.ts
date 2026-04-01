import type { University, Testimonial, Budget } from '@/types';

export const mockUniversities: University[] = [
  {
    id: '1', name: 'Massachusetts Institute of Technology', country: 'United States', city: 'Cambridge, MA',
    logo: '🏛️', ranking: 1, acceptanceRate: 4, tuition: 57986, currency: 'USD', matchScore: 95,
    matchFactors: ['Academic Match', 'Research Fit', 'Budget Fit'],
    programs: ['Computer Science', 'Engineering', 'Physics', 'Mathematics'],
    studentCount: 11574, facultyRatio: '3:1', description: 'World-leading research university known for innovation.',
    images: [],
  },
  {
    id: '2', name: 'University of Oxford', country: 'United Kingdom', city: 'Oxford',
    logo: '🎓', ranking: 3, acceptanceRate: 17, tuition: 38010, currency: 'GBP', matchScore: 91,
    matchFactors: ['Academic Match', 'Climate', 'Cultural Fit'],
    programs: ['Philosophy', 'Law', 'Medicine', 'Literature'],
    studentCount: 24000, facultyRatio: '5:1', description: 'The oldest English-speaking university in the world.',
    images: [],
  },
  {
    id: '3', name: 'ETH Zurich', country: 'Switzerland', city: 'Zurich',
    logo: '🔬', ranking: 7, acceptanceRate: 27, tuition: 1460, currency: 'CHF', matchScore: 88,
    matchFactors: ['Budget Fit', 'Research Fit', 'Safety'],
    programs: ['Engineering', 'Natural Sciences', 'Architecture'],
    studentCount: 23000, facultyRatio: '6:1', description: 'One of the leading international universities for technology and natural sciences.',
    images: [],
  },
  {
    id: '4', name: 'University of Toronto', country: 'Canada', city: 'Toronto',
    logo: '🍁', ranking: 18, acceptanceRate: 43, tuition: 45690, currency: 'CAD', matchScore: 85,
    matchFactors: ['Budget Fit', 'Cultural Fit', 'Climate'],
    programs: ['Business', 'Engineering', 'Arts & Science'],
    studentCount: 97000, facultyRatio: '8:1', description: "Canada's top-ranked university with a diverse, global community.",
    images: [],
  },
  {
    id: '5', name: 'National University of Singapore', country: 'Singapore', city: 'Singapore',
    logo: '🌏', ranking: 8, acceptanceRate: 25, tuition: 29350, currency: 'SGD', matchScore: 82,
    matchFactors: ['Academic Match', 'Safety', 'Career Prospects'],
    programs: ['Computing', 'Business', 'Engineering', 'Law'],
    studentCount: 40000, facultyRatio: '7:1', description: "Asia's leading global university.",
    images: [],
  },
  {
    id: '6', name: 'Technical University of Munich', country: 'Germany', city: 'Munich',
    logo: '🇩🇪', ranking: 30, acceptanceRate: 8, tuition: 258, currency: 'EUR', matchScore: 79,
    matchFactors: ['Budget Fit', 'Research Fit', 'No Tuition'],
    programs: ['Engineering', 'Computer Science', 'Natural Sciences'],
    studentCount: 50000, facultyRatio: '10:1', description: 'Leading European technical university with almost free tuition.',
    images: [],
  },
];

export const mockTestimonials: Testimonial[] = [
  { id: '1', name: 'Sarah Chen', university: 'MIT', country: 'China → USA', quote: 'Abroad Guide matched me with my dream school. The budget planner saved me thousands!', avatar: '👩‍🎓', rating: 5 },
  { id: '2', name: 'Raj Patel', university: 'Oxford', country: 'India → UK', quote: 'The AI recommendations were spot-on. I got into Oxford on my first application!', avatar: '👨‍🎓', rating: 5 },
  { id: '3', name: 'Maria Silva', university: 'ETH Zurich', country: 'Brazil → Switzerland', quote: 'Finding affordable housing was a breeze with the Student Life feature.', avatar: '👩‍💻', rating: 5 },
  { id: '4', name: 'James Okafor', university: 'University of Toronto', country: 'Nigeria → Canada', quote: 'The scholarship finder alone was worth it. I secured $30K in funding!', avatar: '👨‍💼', rating: 5 },
];

export const mockBudget: Budget = {
  totalBudget: 75000,
  currency: 'USD',
  categories: [
    { id: '1', name: 'Tuition', amount: 30000, percentage: 40, icon: 'GraduationCap', color: 'hsl(217, 91%, 60%)' },
    { id: '2', name: 'Accommodation', amount: 18750, percentage: 25, icon: 'Home', color: 'hsl(263, 70%, 58%)' },
    { id: '3', name: 'Food', amount: 11250, percentage: 15, icon: 'Utensils', color: 'hsl(160, 84%, 39%)' },
    { id: '4', name: 'Transport', amount: 7500, percentage: 10, icon: 'Car', color: 'hsl(38, 92%, 50%)' },
    { id: '5', name: 'Miscellaneous', amount: 7500, percentage: 10, icon: 'ShoppingBag', color: 'hsl(340, 82%, 52%)' },
  ],
  affordableUniversities: 12,
  totalUniversities: 15,
};

export const universityLogos = [
  'Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'Yale',
  'Princeton', 'Columbia', 'ETH Zurich', 'Imperial College',
  'UCL', 'Chicago', 'Caltech', 'Penn', 'Duke',
];
