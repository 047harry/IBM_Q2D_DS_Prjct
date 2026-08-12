import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { ShieldCheck, Award, Layers } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBMQ2DST1210 | HR Talent Retention & Employee Exit Analytics Dashboard",
  description: "Enterprise predictive talent retention, ML risk engine, and financial ROI simulator developed for IBM Q2D PEARL Program.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-950/5 text-slate-900 font-sans">
        {/* Enterprise Top Banner */}
        <header className="border-b border-slate-200 bg-slate-900 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/30">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <Award className="h-3.5 w-3.5" />
                    IBM Q2D PEARL • Candidate ID: IBMQ2DST1210
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-950 px-2.5 py-1 text-xs font-medium text-blue-300 border border-blue-800/60">
                  <ShieldCheck className="h-3 w-3 text-blue-400" />
                  UG Level 3 • Data Science & BI
                </span>
                <span className="hidden sm:inline-flex rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700">
                  1,470 IBM Benchmark Dataset
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                HR Talent Retention & Employee Exit Analytics
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl">
                Proactive talent retention intelligence, machine learning attrition diagnostics, and executive financial ROI modeling.
              </p>
            </div>
          </div>
        </header>

        {/* Sticky Sub-Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Enterprise Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© IBM Q2D PEARL Global Talent Discovery & Development Program • Project 25</p>
            <p className="font-mono text-slate-400">Candidate ID: IBMQ2DST1210 | CRISP-DM Framework</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
