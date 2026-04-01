import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockBudget } from '@/data/mockData';
import { toast } from 'sonner';

const BudgetPage = () => {
  const [budget, setBudget] = useState(mockBudget);
  const [loading, setLoading] = useState(false);

  const chartData = budget.categories.map((c) => ({ name: c.name, value: c.amount, color: c.color }));

  const handleAutoAllocate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Budget auto-allocated successfully!');
    }, 1500);
  };

  const updateAmount = (id: string, amount: number) => {
    const total = budget.totalBudget;
    setBudget((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === id ? { ...c, amount, percentage: Math.round((amount / total) * 100) } : c
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold">Budget Planner</h1>
            <p className="text-muted-foreground">Manage your study abroad finances</p>
          </div>
          <Button onClick={handleAutoAllocate} disabled={loading} className="btn-pill">
            <Zap className="h-4 w-4 mr-2" />
            {loading ? 'Allocating...' : 'Auto-Allocate'}
          </Button>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><DollarSign className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="font-heading text-2xl font-bold">${budget.totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10"><TrendingUp className="h-5 w-5 text-success" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Affordable Unis</p>
                <p className="font-heading text-2xl font-bold">{budget.affordableUniversities}/{budget.totalUniversities}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10"><DollarSign className="h-5 w-5 text-warning" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="font-heading text-2xl font-bold">{budget.currency}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <GlassCard className="flex flex-col items-center justify-center min-h-[350px]">
            <h3 className="font-heading font-semibold mb-4">Budget Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'hsl(230 40% 12%)', border: '1px solid hsl(230 25% 20%)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Category cards */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold">Categories</h3>
            {budget.categories.map((cat) => (
              <GlassCard key={cat.id} className="flex items-center gap-4 py-4">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.percentage}%</p>
                </div>
                <div className="w-28">
                  <Input
                    type="number"
                    value={cat.amount}
                    onChange={(e) => updateAmount(cat.id, Number(e.target.value))}
                    className="bg-muted/50 text-sm h-8"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
