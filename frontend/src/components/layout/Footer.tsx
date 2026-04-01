import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-border bg-card/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold">Abroad Guide</span>
          </Link>
          <p className="text-sm text-muted-foreground">Your AI-powered study abroad companion. Find your perfect university match.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Universities', 'Blog'] },
          { title: 'Company', links: ['About', 'Careers', 'Contact', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'GDPR'] },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-heading font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Abroad Guide. All rights reserved.
      </div>
    </div>
  </footer>
);
