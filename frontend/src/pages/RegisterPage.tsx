import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Eye, EyeOff, Users, Building2, Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const roles = [
  { value: 'STUDENT', label: 'Student', icon: <Users className="h-8 w-8" />, desc: 'Find your dream university' },
  { value: 'UNIVERSITY', label: 'University', icon: <Building2 className="h-8 w-8" />, desc: 'Recruit top talent globally' },
  { value: 'SPONSOR', label: 'Sponsor', icon: <Heart className="h-8 w-8" />, desc: 'Support student education' },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', name: '', role: 'STUDENT', termsAccepted: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.termsAccepted) { toast.error('Please accept the terms'); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name, form.role);
      toast.success('Account created!');
      navigate(form.role === 'STUDENT' ? '/onboarding' : '/dashboard');
    } catch {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const canNext = () => {
    if (step === 1) return form.email && form.password && form.password === form.confirmPassword && form.name;
    if (step === 2) return form.role;
    return form.termsAccepted;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4 glass-strong rounded-2xl p-8 relative z-10"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl">Abroad Guide</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold">Create Account</h1>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-muted/50 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="bg-muted/50" />
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-destructive">Passwords don't match</p>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <p className="text-sm text-muted-foreground text-center mb-4">I am a...</p>
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setForm({ ...form, role: r.value })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${form.role === r.value ? 'border-primary bg-primary/10 glow-blue' : 'border-border hover:border-primary/30 hover:bg-muted/50'}`}
                >
                  <div className={`p-3 rounded-xl ${form.role === r.value ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {r.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  {form.role === r.value && <Check className="ml-auto h-5 w-5 text-primary" />}
                </button>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="glass rounded-xl p-4 text-sm space-y-2">
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Role:</strong> {form.role}</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.termsAccepted} onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })} className="mt-1 rounded border-border" />
                <span className="text-sm text-muted-foreground">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" className="btn-pill" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          <Button
            className="btn-pill flex-1"
            disabled={!canNext() || loading}
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
          >
            {loading ? 'Creating...' : step < 3 ? <>Next <ArrowRight className="h-4 w-4 ml-1" /></> : 'Create Account'}
          </Button>
        </div>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
