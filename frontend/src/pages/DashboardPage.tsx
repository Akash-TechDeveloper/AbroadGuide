import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Wallet, FileText, Bookmark, Calendar, Activity, ArrowRight, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';
import { MatchRing } from '@/components/shared/MatchRing';
import { Button } from '@/components/ui/button';
import { mockUniversities } from '@/data/mockData';
import type { University } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } }),
};

const DashboardPage = () => {
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Matches', value: '24', icon: <Target className="h-5 w-5" />, trend: '+3 this week', color: 'text-primary' },
            { label: 'Top Match', value: '95%', icon: <TrendingUp className="h-5 w-5" />, trend: 'MIT', color: 'text-success' },
            { label: 'Budget Status', value: 'On Track', icon: <Wallet className="h-5 w-5" />, trend: '$75,000', color: 'text-success' },
            { label: 'Applications', value: '3', icon: <FileText className="h-5 w-5" />, trend: '2 pending', color: 'text-warning' },
          ].map((stat, i) => (
            <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
              <GlassCard>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                  <div className={`p-1.5 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
                </div>
                <p className="font-heading text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Matches feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-heading text-xl font-bold">University Matches</h2>
            {mockUniversities.map((uni, i) => (
              <motion.div key={uni.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                <GlassCard hover onClick={() => setSelectedUni(uni)} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-3xl">{uni.logo}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold truncate">{uni.name}</h3>
                      <p className="text-sm text-muted-foreground">{uni.city}, {uni.country}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {uni.matchFactors?.map((f) => (
                          <span key={f} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MatchRing score={uni.matchScore || 0} size={64} />
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="btn-pill text-xs" onClick={(e) => { e.stopPropagation(); }}>
                        View <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button size="sm" variant="outline" className="btn-pill text-xs" onClick={(e) => { e.stopPropagation(); toggleSave(uni.id); }}>
                        <Bookmark className={`h-3 w-3 mr-1 ${saved.includes(uni.id) ? 'fill-primary' : ''}`} />
                        {saved.includes(uni.id) ? 'Saved' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <GlassCard>
              <h3 className="font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {['Complete Profile', 'Find Scholarships', 'Budget Calculator', 'Book Consultation'].map((action) => (
                  <button key={action} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted text-sm transition-colors flex items-center justify-between group">
                    {action} <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4" /> Upcoming Deadlines</h3>
              <div className="space-y-3">
                {[
                  { uni: 'MIT', date: 'Jan 1, 2026', urgent: true },
                  { uni: 'Oxford', date: 'Jan 15, 2026', urgent: true },
                  { uni: 'ETH Zurich', date: 'Mar 31, 2026', urgent: false },
                ].map((d) => (
                  <div key={d.uni} className="flex items-center justify-between text-sm">
                    <span>{d.uni}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${d.urgent ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>{d.date}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4" /> Recent Activity</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Saved Stanford University</p>
                <p>Viewed MIT details</p>
                <p>Updated budget allocation</p>
                <p>Completed academic profile</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* University Detail Modal */}
      {selectedUni && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedUni(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-2xl glass-strong rounded-2xl p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedUni.logo}</span>
                <div>
                  <h2 className="font-heading text-2xl font-bold">{selectedUni.name}</h2>
                  <p className="text-muted-foreground">{selectedUni.city}, {selectedUni.country}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUni(null)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <MatchRing score={selectedUni.matchScore || 0} size={80} />
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div><span className="text-muted-foreground">Ranking:</span> <strong>#{selectedUni.ranking}</strong></div>
                <div><span className="text-muted-foreground">Acceptance:</span> <strong>{selectedUni.acceptanceRate}%</strong></div>
                <div><span className="text-muted-foreground">Tuition:</span> <strong>{selectedUni.currency} {selectedUni.tuition.toLocaleString()}</strong></div>
                <div><span className="text-muted-foreground">Students:</span> <strong>{selectedUni.studentCount.toLocaleString()}</strong></div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{selectedUni.description}</p>

            <div className="mb-6">
              <h4 className="font-heading font-semibold mb-2">Programs</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUni.programs.map((p) => (
                  <span key={p} className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20">{p}</span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-heading font-semibold mb-2">Match Factors</h4>
              <div className="space-y-2">
                {selectedUni.matchFactors?.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${70 + Math.random() * 30}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-24">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="btn-pill flex-1">Apply Now</Button>
              <Button variant="outline" className="btn-pill" onClick={() => toggleSave(selectedUni.id)}>
                <Bookmark className={`h-4 w-4 mr-2 ${saved.includes(selectedUni.id) ? 'fill-primary' : ''}`} />
                {saved.includes(selectedUni.id) ? 'Saved' : 'Save'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardPage;
