"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  BrainCircuit, 
  Calculator, 
  Database, 
  FileText
} from "lucide-react";

const navItems = [
  { href: "/", label: "Executive Dashboard", icon: BarChart3 },
  { href: "/prediction", label: "AI & ML Risk Engine", icon: BrainCircuit },
  { href: "/simulator", label: "Financial ROI Simulator", icon: Calculator },
  { href: "/data", label: "Dataset Explorer (1,470)", icon: Database },
  { href: "/case-study", label: "CRISP-DM Specs & Report", icon: FileText },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
