import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, GraduationCap, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';

const growthData = [
  { month: 'Jan', users: 120, applications: 45 },
  { month: 'Feb', users: 250, applications: 89 },
  { month: 'Mar', users: 480, applications: 156 },
  { month: 'Apr', users: 720, applications: 234 },
  { month: 'May', users: 1100, applications: 378 },
  { month: 'Jun', users: 1650, applications: 520 },
];

const recentUsers = [
  { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Student', status: 'Active' },
  { name: 'Raj Patel', email: 'raj@example.com', role: 'Student', status: 'Active' },
  { name: 'Maria Silva', email: 'maria@example.com', role: 'Student', status: 'Pending' },
  { name: 'James Okafor', email: 'james@example.com', role: 'Student', status: 'Active' },
  { name: 'Oxford University', email: 'admin@ox.ac.uk', role: 'University', status: 'Active' },
];

const AdminPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20 pb-12 container mx-auto px-4">
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: '1,650', icon: <Users className="h-5 w-5" />, trend: '+12%', color: 'text-primary' },
          { label: 'Active Students', value: '1,230', icon: <GraduationCap className="h-5 w-5" />, trend: '+8%', color: 'text-success' },
          { label: 'Applications', value: '520', icon: <FileText className="h-5 w-5" />, trend: '+23%', color: 'text-secondary' },
          { label: 'Revenue', value: '$12,450', icon: <DollarSign className="h-5 w-5" />, trend: '+15%', color: 'text-warning' },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard>
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-muted-foreground">{m.label}</span>
                <div className={`p-1.5 rounded-lg bg-muted ${m.color}`}>{m.icon}</div>
              </div>
              <p className="font-heading text-2xl font-bold">{m.value}</p>
              <span className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" />{m.trend}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth */}
        <GlassCard>
          <h3 className="font-heading font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 25%, 20%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(230 40% 12%)', border: '1px solid hsl(230 25% 20%)', borderRadius: '12px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="users" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Applications */}
        <GlassCard>
          <h3 className="font-heading font-semibold mb-4">Applications</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 25%, 20%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(230 40% 12%)', border: '1px solid hsl(230 25% 20%)', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="applications" fill="hsl(263, 70%, 58%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Users table */}
      <GlassCard>
        <h3 className="font-heading font-semibold mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-2 font-medium">Name</th>
                <th className="text-left py-3 px-2 font-medium">Email</th>
                <th className="text-left py-3 px-2 font-medium">Role</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium">{u.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                  <td className="py-3 px-2"><span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{u.role}</span></td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${u.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  </div>
);

export default AdminPage;
