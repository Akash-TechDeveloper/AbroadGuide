import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Eye, EyeOff, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 glass-strong rounded-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl">Abroad Guide</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted/50 border-border" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label htmlFor="password">Password</Label><Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link></div>
            <div className="relative">
              <Input id="password" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-muted/50 border-border pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="btn-pill w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or continue with</span></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[{ icon: <Chrome className="h-5 w-5" />, label: 'Google' }, { icon: <span className="text-lg">f</span>, label: 'Facebook' }, { icon: <span className="text-lg font-bold">in</span>, label: 'LinkedIn' }].map((p) => (
            <Button key={p.label} variant="outline" className="btn-pill border-border hover:bg-muted">
              {p.icon}
            </Button>
          ))}
        </div>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
