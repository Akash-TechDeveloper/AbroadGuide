import { useState } from 'react';
import { User, Settings, Bell, Shield, CreditCard, Camera, Mail, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/store/authStore';

const settingsTabs = [
  { id: 'account', label: 'Account', icon: <User className="h-4 w-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
  { id: 'privacy', label: 'Privacy', icon: <Shield className="h-4 w-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
];

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4 max-w-4xl">
        {/* Profile header */}
        <GlassCard className="mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-heading font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-heading text-2xl font-bold">{user?.name || 'Student'}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">{user?.role}</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Profile Completion</p>
              <Progress value={72} className="w-32 h-2 mb-1" />
              <p className="text-xs text-muted-foreground">72%</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${activeTab === tab.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'account' && (
              <GlassCard>
                <h3 className="font-heading text-xl font-semibold mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} className="bg-muted/50" /></div>
                  </div>
                  <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" className="bg-muted/50" /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" className="bg-muted/50" /></div>
                    <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" placeholder="••••••••" className="bg-muted/50" /></div>
                  </div>
                  <Button className="btn-pill">Save Changes</Button>
                </div>
              </GlassCard>
            )}

            {activeTab === 'notifications' && (
              <GlassCard>
                <h3 className="font-heading text-xl font-semibold mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'New university matches', desc: 'Get notified when new matches are found' },
                    { label: 'Application deadlines', desc: 'Reminders before deadlines' },
                    { label: 'Budget alerts', desc: 'When your spending exceeds limits' },
                    { label: 'Community updates', desc: 'New posts and mentor messages' },
                    { label: 'Marketing emails', desc: 'Tips, features, and promotions' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                        <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {activeTab === 'privacy' && (
              <GlassCard>
                <h3 className="font-heading text-xl font-semibold mb-6">Privacy Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Profile visibility', desc: 'Allow universities to view your profile' },
                    { label: 'Data sharing', desc: 'Share anonymized data for recommendations' },
                    { label: 'Search visibility', desc: 'Appear in student search results' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {activeTab === 'billing' && (
              <GlassCard>
                <h3 className="font-heading text-xl font-semibold mb-6">Billing</h3>
                <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold">Free Plan</p>
                    <p className="text-sm text-muted-foreground">5 university matches, basic features</p>
                  </div>
                  <Button className="btn-pill">Upgrade to Premium</Button>
                </div>
                <p className="text-sm text-muted-foreground">No payment method on file. Add one to upgrade your plan.</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
