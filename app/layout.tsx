import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project SIXES — Pathfinder Culinary Digital Twin',
  description: 'Culinary Knowledge Field, Interpretation & Service Simulator operating on the Pathfinder Digital Twin substrate.',
  openGraph: {
    title: 'Project SIXES — Pathfinder Culinary Digital Twin',
    description: 'Culinary Knowledge Field, Interpretation & Service Simulator',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
