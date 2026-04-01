import { useState } from 'react';
import { Home, Bus, Utensils, Users, MapPin, Star, Wifi, Dumbbell } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'accommodation', label: 'Accommodation', icon: <Home className="h-4 w-4" /> },
  { id: 'transport', label: 'Transportation', icon: <Bus className="h-4 w-4" /> },
  { id: 'dining', label: 'Dining', icon: <Utensils className="h-4 w-4" /> },
  { id: 'community', label: 'Community', icon: <Users className="h-4 w-4" /> },
];

const mockAccommodations = [
  { id: '1', name: 'University Residence Hall', type: 'Studio', price: 1200, distance: '0.2 mi', rating: 4.5, amenities: ['WiFi', 'Gym', 'Laundry'] },
  { id: '2', name: 'Campus View Apartments', type: 'Shared', price: 800, distance: '0.5 mi', rating: 4.2, amenities: ['WiFi', 'Parking', 'Kitchen'] },
  { id: '3', name: 'Downtown Student Housing', type: 'Studio', price: 1500, distance: '1.2 mi', rating: 4.7, amenities: ['WiFi', 'Gym', 'Pool', 'Rooftop'] },
  { id: '4', name: 'Homestay with Local Family', type: 'Homestay', price: 900, distance: '2.0 mi', rating: 4.8, amenities: ['WiFi', 'Meals', 'Cultural'] },
];

const StudentLifePage = () => {
  const [activeTab, setActiveTab] = useState('accommodation');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold mb-6">Student Life Hub</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'glass hover:bg-muted'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'accommodation' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {mockAccommodations.map((acc) => (
              <GlassCard key={acc.id} hover>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-heading font-semibold">{acc.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{acc.distance}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" />{acc.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-xl font-bold">${acc.price}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-3">{acc.type}</span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {acc.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-muted">
                      {a === 'WiFi' ? <Wifi className="h-3 w-3" /> : a === 'Gym' ? <Dumbbell className="h-3 w-3" /> : null}
                      {a}
                    </span>
                  ))}
                </div>
                <Button className="btn-pill w-full" size="sm">Contact</Button>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'transport' && (
          <GlassCard>
            <h3 className="font-heading text-xl font-semibold mb-4">Route Planner</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <input placeholder="From (e.g., Your housing)" className="rounded-md border border-input bg-muted/50 px-3 py-2 text-sm" />
              <input placeholder="To (e.g., Campus)" className="rounded-md border border-input bg-muted/50 px-3 py-2 text-sm" />
            </div>
            <div className="space-y-3">
              {[
                { mode: '🚌 Bus', time: '25 min', cost: '$2.50', discount: '50% student' },
                { mode: '🚇 Metro', time: '15 min', cost: '$3.00', discount: '40% student' },
                { mode: '🚲 Bike', time: '20 min', cost: 'Free', discount: 'Bike share' },
              ].map((r) => (
                <div key={r.mode} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{r.mode}</p>
                    <p className="text-xs text-muted-foreground">{r.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{r.cost}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">{r.discount}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === 'dining' && (
          <div className="space-y-3">
            <div className="flex gap-2 mb-4">
              {['All', 'Halal', 'Vegan', 'Vegetarian', 'Kosher'].map((f) => (
                <button key={f} className="px-4 py-1.5 rounded-full text-xs border border-border hover:border-primary/50 transition-colors">{f}</button>
              ))}
            </div>
            {[
              { name: 'Campus Bistro', cuisine: 'International', price: '$$', rating: 4.3, distance: '0.1 mi' },
              { name: 'Green Leaf Cafe', cuisine: 'Vegan', price: '$', rating: 4.6, distance: '0.3 mi' },
              { name: 'Spice Route', cuisine: 'Indian/Halal', price: '$$', rating: 4.5, distance: '0.5 mi' },
            ].map((r) => (
              <GlassCard key={r.name} hover className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-semibold">{r.name}</h4>
                  <p className="text-sm text-muted-foreground">{r.cuisine} · {r.price} · {r.distance}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-warning text-warning" /> {r.rating}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-4">
            <GlassCard>
              <h3 className="font-heading font-semibold mb-4">Discussion Forums</h3>
              <div className="space-y-3">
                {['General Discussion', 'Housing Tips', 'Visa & Immigration', 'Scholarships', 'Student Jobs'].map((f) => (
                  <button key={f} className="w-full text-left px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm flex justify-between items-center">
                    {f} <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 5)} posts</span>
                  </button>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="font-heading font-semibold mb-4">Find a Mentor</h3>
              <p className="text-sm text-muted-foreground mb-4">Connect with current students and alumni at your target universities.</p>
              <Button className="btn-pill">Browse Mentors</Button>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLifePage;
