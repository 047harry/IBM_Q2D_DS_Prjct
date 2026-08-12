"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { DEFAULT_FILTERS, average, filterRecords, type Filters } from "@/lib/hr";
import { useHrData } from "@/lib/useHrData";

export default function DashboardPage() {
  const { data, loading } = useHrData();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const departments = useMemo(() => ["All", ...new Set(data.map((d) => d.Department))], [data]);

  const filtered = useMemo(() => filterRecords(data, filters), [data, filters]);

  const totalEmployees = filtered.length;
  const exits = filtered.filter((r) => r.Attrition === "Yes").length;
  const attritionRate = totalEmployees === 0 ? 0 : (exits / totalEmployees) * 100;
  const avgTenure = average(filtered.map((r) => r.YearsAtCompany));
  const avgIncome = average(filtered.map((r) => r.MonthlyIncome));

  const departmentExits = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((row) => {
      if (row.Attrition === "Yes") {
        map.set(row.Department, (map.get(row.Department) ?? 0) + 1);
      }
    });

    return Array.from(map.entries()).map(([department, value]) => ({ department, exits: value }));
  }, [filtered]);

  const attritionSplit = useMemo(() => {
    const yes = filtered.filter((r) => r.Attrition === "Yes").length;
    const no = filtered.length - yes;
    return [
      { name: "Attrition", value: yes },
      { name: "Retained", value: no },
    ];
  }, [filtered]);

  const scatterData = useMemo(
    () =>
      filtered.map((row) => ({
        age: row.Age,
        income: row.MonthlyIncome,
        attrition: row.Attrition,
      })),
    [filtered],
  );

  const onFilterChange = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Department</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={filters.department}
            onChange={(event) => onFilterChange("department", event.target.value)}
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">OverTime</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={filters.overtime}
            onChange={(event) => onFilterChange("overtime", event.target.value)}
          >
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Gender</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={filters.gender}
            onChange={(event) => onFilterChange("gender", event.target.value)}
          >
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
      </div>

      {loading ? <p className="text-sm text-slate-600">Loading data...</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Employees" value={String(totalEmployees)} />
        <KpiCard label="Attrition Rate" value={`${attritionRate.toFixed(1)}%`} />
        <KpiCard label="Average Tenure" value={`${avgTenure.toFixed(1)} yrs`} />
        <KpiCard label="Average Monthly Income" value={`₹${Math.round(avgIncome).toLocaleString()}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold">Department Exit Count</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentExits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="exits" fill="#1f3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold">Attrition Split</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attritionSplit} dataKey="value" nameKey="name" outerRadius={95} fill="#3b82f6" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold">Age vs Income (Interactive Exploration)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="age" name="Age" unit="y" />
              <YAxis type="number" dataKey="income" name="Income" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Employees" data={scatterData} fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
