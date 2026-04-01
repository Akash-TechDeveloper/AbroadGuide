import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Wallet, BarChart3, Home, MapPin, Play, Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/shared/GlassCard';
import { CountUp } from '@/components/shared/CountUp';
import { MatchRing } from '@/components/shared/MatchRing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTestimonials, universityLogos } from '@/data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered University Matching</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto">
              Your Study Abroad Journey,{' '}
              <span className="text-gradient">Powered by AI</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Match with perfect universities. Plan your budget. Find your home abroad. All with the power of artificial intelligence.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/register')}
                className="btn-pill text-base px-8 py-6 bg-primary hover:bg-primary/90 animate-pulse-glow"
                size="lg"
              >
                Start Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="btn-pill text-base px-8 py-6 border-border hover:bg-muted"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> 10,000+ Students Matched</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> 500+ Partner Universities</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> No Credit Card Required</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to find your dream university abroad
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: 'AI-Powered Recommendations',
                desc: 'Our intelligent algorithm analyzes your GPA, test scores, budget, and preferences to find your perfect university matches.',
                visual: <MatchRing score={92} size={64} />,
              },
              {
                icon: <Wallet className="h-8 w-8" />,
                title: 'Budget Like a Pro',
                desc: 'Auto-allocate your budget across tuition, housing, food, and lifestyle. See exactly what you can afford before applying.',
                visual: <div className="flex gap-1 items-end h-10">{[40,25,15,10,10].map((h,i)=><div key={i} className="w-3 rounded-t bg-primary/60" style={{height:`${h}%`}}/>)}</div>,
              },
              {
                icon: <Home className="h-8 w-8" />,
                title: 'Find Your Second Home',
                desc: 'Discover housing, transportation, dining, and roommates near your target universities. Live like a local from day one.',
                visual: <div className="flex gap-2"><MapPin className="h-5 w-5 text-primary" /><MapPin className="h-5 w-5 text-secondary" /><MapPin className="h-5 w-5 text-success" /></div>,
              },
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <GlassCard hover className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">{card.icon}</div>
                    {card.visual}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{card.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 10000, suffix: '+', label: 'Students Helped' },
              { end: 500, suffix: '+', label: 'Partner Universities' },
              { end: 50, prefix: '$', suffix: 'M+', label: 'Scholarships Found' },
              { end: 95, suffix: '%', label: 'Visa Success Rate' },
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="font-heading text-3xl md:text-5xl font-extrabold text-gradient mb-2">
                  <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold text-center mb-16">
            Loved by <span className="text-gradient">Students</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTestimonials.map((t, i) => (
              <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <GlassCard className="h-full">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.avatar}</span>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.country}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Logos */}
      <section className="py-12 border-y border-border overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {[...universityLogos, ...universityLogos].map((name, i) => (
              <span key={i} className="text-muted-foreground/40 font-heading font-bold text-xl">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Simple <span className="text-gradient">Pricing</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground">Start free, upgrade when ready</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '$0', period: '/forever', features: ['5 University Matches', 'Basic Budget Planner', 'Community Access', 'Email Support'], cta: 'Get Started', highlight: false },
              { name: 'Premium', price: '$29', period: '/month', features: ['Unlimited Matches', 'AI Assistant', 'Advanced Budget Tools', 'Priority Support', 'Scholarship Finder', 'Visa Assistance'], cta: 'Go Premium', highlight: true },
              { name: 'Enterprise', price: '$99', period: '/month', features: ['White-Label Access', 'API Integration', 'Dedicated Manager', 'Custom Analytics', 'Bulk Student Import', 'SLA Guarantee'], cta: 'Contact Sales', highlight: false },
            ].map((plan, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <GlassCard className={`h-full flex flex-col ${plan.highlight ? 'border-primary/50 glow-blue relative' : ''}`}>
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`btn-pill w-full ${plan.highlight ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={() => navigate('/register')}
                  >
                    {plan.cta}
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <GlassCard className="text-center py-16 px-8 max-w-3xl mx-auto glow-blue">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join thousands of students who found their perfect university match with Abroad Guide.</p>
            <Button onClick={() => navigate('/register')} className="btn-pill text-base px-10 py-6" size="lg">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
