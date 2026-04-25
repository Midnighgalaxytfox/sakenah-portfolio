import { ContactForm } from '@/components/contact/contact-form';
import { BRANDING } from '@/lib/branding';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="container-page pt-10 pb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Contact</p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
        Let’s <span className="accent-word">talk</span>.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        I reply quickly. Share a bit about the role, your team, or the problem you’re trying to solve and I’ll get back to you.
      </p>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 mt-10">
        <aside className="glass-panel rounded-2xl p-6 space-y-4 h-max">
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-primary mt-0.5" />
            <div>
              <div className="text-xs font-mono text-muted-foreground">Email</div>
              <a href={`mailto:${BRANDING.email}`} className="text-sm font-medium hover:text-primary transition break-all">{BRANDING.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-primary mt-0.5" />
            <div>
              <div className="text-xs font-mono text-muted-foreground">Phone</div>
              <a href={`tel:${BRANDING.phone}`} className="text-sm font-medium hover:text-primary transition">{BRANDING.phone}</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-primary mt-0.5" />
            <div>
              <div className="text-xs font-mono text-muted-foreground">Location</div>
              <p className="text-sm font-medium">{BRANDING.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Linkedin size={18} className="text-primary mt-0.5" />
            <div>
              <div className="text-xs font-mono text-muted-foreground">LinkedIn</div>
              <p className="text-sm font-medium break-all">linkedin.com/in/sakenah-aboharb-b5b612316</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border/60">
            Messages sent through the form are stored privately to Sakenah’s portfolio database — no third-party mailing lists, no tracking pixels.
          </p>
        </aside>

        <ContactForm />
      </div>
    </div>
  );
}
