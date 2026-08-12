import React from "react";

type KpiCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  accent?: "blue" | "rose" | "emerald" | "amber" | "indigo" | "purple";
};

export function KpiCard({ label, value, hint, icon, trend, accent = "blue" }: KpiCardProps) {
  const accentClasses = {
    blue: "border-blue-100 bg-gradient-to-br from-white to-blue-50/40 text-blue-600",
    rose: "border-rose-100 bg-gradient-to-br from-white to-rose-50/40 text-rose-600",
    emerald: "border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 text-emerald-600",
    amber: "border-amber-100 bg-gradient-to-br from-white to-amber-50/40 text-amber-600",
    indigo: "border-indigo-100 bg-gradient-to-br from-white to-indigo-50/40 text-indigo-600",
    purple: "border-purple-100 bg-gradient-to-br from-white to-purple-50/40 text-purple-600",
  };

  const iconBgClasses = {
    blue: "bg-blue-100 text-blue-700",
    rose: "bg-rose-100 text-rose-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    indigo: "bg-indigo-100 text-indigo-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] ${accentClasses[accent]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        {icon ? (
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBgClasses[accent]}`}>
            {icon}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{value}</p>
        {trend ? (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.isNeutral
                ? "bg-slate-100 text-slate-600"
                : trend.isPositive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {trend.value}
          </span>
        ) : null}
      </div>

      {hint ? <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">{hint}</p> : null}
    </div>
  );
}
