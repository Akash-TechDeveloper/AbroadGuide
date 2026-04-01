import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, BookOpen, DollarSign, Globe, Heart, Target, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const steps = [
  { icon: <User className="h-5 w-5" />, label: 'Personal' },
  { icon: <BookOpen className="h-5 w-5" />, label: 'Academic' },
  { icon: <DollarSign className="h-5 w-5" />, label: 'Financial' },
  { icon: <Globe className="h-5 w-5" />, label: 'Location' },
  { icon: <Heart className="h-5 w-5" />, label: 'Preferences' },
  { icon: <Target className="h-5 w-5" />, label: 'Goals' },
];

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Singapore', 'Japan'];
const climates = ['Tropical', 'Temperate', 'Cold', 'Mediterranean'];
const citySizes = ['Metro', 'Large', 'Medium', 'Small'];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    firstName: '', lastName: '', dateOfBirth: '', countryOfOrigin: '', educationLevel: '',
    gpa: '', gradeSystem: '4.0', testScores: {} as Record<string, string>,
    fieldOfStudy: '', researchExperience: false,
    totalBudget: '', currency: 'USD', fundingSources: [] as string[], financialAidNeeded: false,
    countryPreferences: [] as string[], citySize: '', climate: '', languagePreference: '',
    universityType: '', campusSize: '', rankingImportance: 'Medium', campusLifePriorities: [] as string[],
    careerGoals: '', intendedStartDate: '', deadlineAware: false,
  });

  const update = (field: string, value: unknown) => setData((prev) => ({ ...prev, [field]: value }));
  const toggleArray = (field: string, value: string) => {
    const arr = data[field as keyof typeof data] as string[];
    update(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const handleComplete = () => {
    toast.success('🎉 Profile completed! Finding your matches...');
    navigate('/dashboard');
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-2xl">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-1.5 text-xs ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`p-1.5 rounded-lg ${i <= step ? 'bg-primary/20' : 'bg-muted'}`}>{s.icon}</div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2 mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="glass-strong rounded-2xl p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>First Name</Label><Input value={data.firstName} onChange={(e) => update('firstName', e.target.value)} className="bg-muted/50" placeholder="John" /></div>
                  <div className="space-y-2"><Label>Last Name</Label><Input value={data.lastName} onChange={(e) => update('lastName', e.target.value)} className="bg-muted/50" placeholder="Doe" /></div>
                </div>
                <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" value={data.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} className="bg-muted/50" /></div>
                <div className="space-y-2">
                  <Label>Country of Origin</Label>
                  <select value={data.countryOfOrigin} onChange={(e) => update('countryOfOrigin', e.target.value)} className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm">
                    <option value="">Select country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <div className="flex flex-wrap gap-2">
                    {['High School', 'Bachelor', 'Master', 'PhD'].map((l) => (
                      <button key={l} onClick={() => update('educationLevel', l)} className={`px-4 py-2 rounded-full text-sm border transition-all ${data.educationLevel === l ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Academic Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>GPA / Percentage</Label><Input type="number" step="0.01" value={data.gpa} onChange={(e) => update('gpa', e.target.value)} className="bg-muted/50" placeholder="3.8" /></div>
                  <div className="space-y-2">
                    <Label>Grade System</Label>
                    <select value={data.gradeSystem} onChange={(e) => update('gradeSystem', e.target.value)} className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm">
                      {['4.0 Scale', '10.0 Scale', 'Percentage', 'Letter Grade'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Test Scores (optional)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['TOEFL', 'IELTS', 'GRE', 'GMAT', 'SAT'].map((test) => (
                      <Input key={test} placeholder={test} value={data.testScores[test] || ''} onChange={(e) => update('testScores', { ...data.testScores, [test]: e.target.value })} className="bg-muted/50" />
                    ))}
                  </div>
                </div>
                <div className="space-y-2"><Label>Field of Study</Label><Input value={data.fieldOfStudy} onChange={(e) => update('fieldOfStudy', e.target.value)} className="bg-muted/50" placeholder="Computer Science" /></div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Financial Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Total Budget</Label><Input type="number" value={data.totalBudget} onChange={(e) => update('totalBudget', e.target.value)} className="bg-muted/50" placeholder="50000" /></div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <select value={data.currency} onChange={(e) => update('currency', e.target.value)} className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm">
                      {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'SGD', 'INR'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Funding Sources</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Family', 'Student Loans', 'Scholarships', 'Employer', 'Personal Savings'].map((s) => (
                      <button key={s} onClick={() => toggleArray('fundingSources', s)} className={`px-4 py-2 rounded-full text-sm border transition-all ${data.fundingSources.includes(s) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={data.financialAidNeeded} onChange={(e) => update('financialAidNeeded', e.target.checked)} className="rounded border-border" />
                  <span className="text-sm">I need financial aid / scholarships</span>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Location Preferences</h2>
                <div className="space-y-2">
                  <Label>Preferred Countries</Label>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((c) => (
                      <button key={c} onClick={() => toggleArray('countryPreferences', c)} className={`px-3 py-1.5 rounded-full text-sm border transition-all ${data.countryPreferences.includes(c) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>City Size</Label>
                  <div className="flex gap-2">
                    {citySizes.map((s) => (
                      <button key={s} onClick={() => update('citySize', s)} className={`flex-1 py-2 rounded-full text-sm border transition-all ${data.citySize === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Climate</Label>
                  <div className="flex gap-2">
                    {climates.map((c) => (
                      <button key={c} onClick={() => update('climate', c)} className={`flex-1 py-2 rounded-full text-sm border transition-all ${data.climate === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{c}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Personal Preferences</h2>
                <div className="space-y-2">
                  <Label>University Type</Label>
                  <div className="flex gap-3">
                    {['Public', 'Private', 'No Preference'].map((t) => (
                      <button key={t} onClick={() => update('universityType', t)} className={`flex-1 py-2 rounded-full text-sm border transition-all ${data.universityType === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Campus Size</Label>
                  <div className="flex gap-3">
                    {['Small', 'Medium', 'Large'].map((s) => (
                      <button key={s} onClick={() => update('campusSize', s)} className={`flex-1 py-2 rounded-full text-sm border transition-all ${data.campusSize === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Campus Life Priorities</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Sports', 'Arts & Culture', 'Research', 'Social Life', 'Entrepreneurship', 'Community Service'].map((p) => (
                      <button key={p} onClick={() => toggleArray('campusLifePriorities', p)} className={`px-4 py-2 rounded-full text-sm border transition-all ${data.campusLifePriorities.includes(p) ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-border hover:border-secondary/50'}`}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <h2 className="font-heading text-2xl font-bold">Goals & Timeline</h2>
                <div className="space-y-2">
                  <Label>Career Goals</Label>
                  <textarea value={data.careerGoals} onChange={(e) => update('careerGoals', e.target.value)} className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm min-h-[100px] resize-none" placeholder="What do you want to achieve after graduation?" />
                </div>
                <div className="space-y-2">
                  <Label>Intended Start Date</Label>
                  <select value={data.intendedStartDate} onChange={(e) => update('intendedStartDate', e.target.value)} className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm">
                    <option value="">Select term</option>
                    {['Fall 2025', 'Spring 2026', 'Fall 2026', 'Spring 2027'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="glass rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Profile will be used for AI matching</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> You can edit anytime from settings</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Your data is encrypted and secure</div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <Button variant="outline" className="btn-pill" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          <Button className="btn-pill flex-1" onClick={() => step < 5 ? setStep(step + 1) : handleComplete()}>
            {step < 5 ? <>Next <ArrowRight className="h-4 w-4 ml-1" /></> : '🎉 Complete Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
