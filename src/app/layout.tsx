import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR Talent Retention & Exit Analytics",
  description: "Manager-focused HR retention dashboard with predictive insights and simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">IBMQ2DST1210 Prototype</p>
            <h1 className="text-xl font-bold sm:text-2xl">HR Talent Retention & Employee Exit Analytics</h1>
            <p className="text-sm text-slate-600">For HR leaders to monitor attrition, identify risks, and test retention actions.</p>
          </div>
        </header>
        <Navigation />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
