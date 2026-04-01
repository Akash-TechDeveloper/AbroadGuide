import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, GitCompare } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';
import { MatchRing } from '@/components/shared/MatchRing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockUniversities } from '@/data/mockData';

const UniversitiesPage = () => {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);

  const filtered = mockUniversities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.country.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCompare = (id: string) => {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold mb-6">Explore Universities</h1>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, country, or program..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          <Button variant="outline" className="btn-pill" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Country</label>
                  <select className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm">
                    <option>All Countries</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>Switzerland</option>
                    <option>Singapore</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Max Tuition</label>
                  <Input type="number" placeholder="$100,000" className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Max Ranking</label>
                  <Input type="number" placeholder="50" className="bg-muted/50" />
                </div>
                <div className="flex items-end">
                  <Button className="btn-pill w-full">Apply</Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} universities found</p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((uni, i) => (
            <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard hover className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{uni.logo}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-sm">{uni.name}</h3>
                      <p className="text-xs text-muted-foreground">{uni.city}, {uni.country}</p>
                    </div>
                  </div>
                  {uni.matchScore && <MatchRing score={uni.matchScore} size={48} strokeWidth={4} />}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4 flex-1">
                  <div>Ranking: <span className="text-foreground font-medium">#{uni.ranking}</span></div>
                  <div>Acceptance: <span className="text-foreground font-medium">{uni.acceptanceRate}%</span></div>
                  <div>Tuition: <span className="text-foreground font-medium">{uni.currency} {uni.tuition.toLocaleString()}</span></div>
                  <div>Students: <span className="text-foreground font-medium">{uni.studentCount.toLocaleString()}</span></div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="btn-pill flex-1 text-xs">Details</Button>
                  <Button
                    size="sm"
                    variant={compare.includes(uni.id) ? 'default' : 'outline'}
                    className="btn-pill text-xs"
                    onClick={() => toggleCompare(uni.id)}
                  >
                    {compare.includes(uni.id) ? '✓' : '+'} Compare
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Floating compare bar */}
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-strong rounded-full px-6 py-3 flex items-center gap-4 shadow-xl z-40"
          >
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Compare ({compare.length})</span>
            <Button size="sm" className="btn-pill text-xs">View Comparison</Button>
            <button onClick={() => setCompare([])} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesPage;
