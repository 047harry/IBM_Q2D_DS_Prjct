"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import {
  DEFAULT_FILTERS,
  CONSTANTS,
  average,
  filterRecords,
  formatCurrency,
  formatPercent,
  getRiskBand,
  getRiskScore,
  type Filters,
  type HRRecord,
} from "@/lib/hr";
import { useHrData } from "@/lib/useHrData";
import {
  Users,
  UserX,
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  Filter,
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data, loading, error } = useHrData();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const departments = useMemo(() => ["All", ...new Set(data.map((d) => d.Department))], [data]);
  const jobRoles = useMemo(() => ["All", ...new Set(data.map((d) => d.JobRole))].sort(), [data]);

  const filtered = useMemo(() => filterRecords(data, filters), [data, filters]);

  // Executive KPI Calculations
  const totalEmployees = filtered.length;
  const exits = filtered.filter((r) => r.Attrition === "Yes").length;
  const retained = totalEmployees - exits;
  const attritionRate = totalEmployees === 0 ? 0 : (exits / totalEmployees) * 100;
  const avgTenure = average(filtered.map((r) => r.YearsAtCompany));
  const avgIncome = average(filtered.map((r) => r.MonthlyIncome));
  const turnoverFinancialLoss = exits * CONSTANTS.COST_PER_DEPARTURE;

  // Department Breakdown
  const departmentBreakdown = useMemo(() => {
    const deptMap = new Map<string, { total: number; exits: number }>();
    filtered.forEach((row) => {
      const current = deptMap.get(row.Department) ?? { total: 0, exits: 0 };
      current.total += 1;
      if (row.Attrition === "Yes") current.exits += 1;
      deptMap.set(row.Department, current);
    });

    return Array.from(deptMap.entries()).map(([dept, val]) => ({
      department: dept,
      headcount: val.total,
      exits: val.exits,
      rate: val.total === 0 ? 0 : +((val.exits / val.total) * 100).toFixed(1),
    }));
  }, [filtered]);

  // OverTime Breakdown (3x Multiplier trigger)
  const overtimeStats = useMemo(() => {
    const otYes = filtered.filter((r) => r.OverTime === "Yes");
    const otNo = filtered.filter((r) => r.OverTime === "No");

    const otYesExits = otYes.filter((r) => r.Attrition === "Yes").length;
    const otNoExits = otNo.filter((r) => r.Attrition === "Yes").length;

    const rateYes = otYes.length === 0 ? 0 : (otYesExits / otYes.length) * 100;
    const rateNo = otNo.length === 0 ? 0 : (otNoExits / otNo.length) * 100;

    return {
      yes: { total: otYes.length, exits: otYesExits, rate: rateYes },
      no: { total: otNo.length, exits: otNoExits, rate: rateNo },
      multiplier: rateNo > 0 ? (rateYes / rateNo).toFixed(1) : "3.0",
    };
  }, [filtered]);

  // Job Satisfaction Gradient (1 to 4)
  const satisfactionGradient = useMemo(() => {
    const levels = [1, 2, 3, 4];
    return levels.map((lvl) => {
      const cohort = filtered.filter((r) => r.JobSatisfaction === lvl);
      const cohortExits = cohort.filter((r) => r.Attrition === "Yes").length;
      const rate = cohort.length === 0 ? 0 : +((cohortExits / cohort.length) * 100).toFixed(1);
      const labels = ["1 - Low", "2 - Medium", "3 - High", "4 - Very High"];
      return {
        level: labels[lvl - 1],
        headcount: cohort.length,
        exits: cohortExits,
        rate,
      };
    });
  }, [filtered]);

  // Marital Mobility Stats
  const maritalStats = useMemo(() => {
    const single = filtered.filter((r) => r.MaritalStatus === "Single");
    const married = filtered.filter((r) => r.MaritalStatus === "Married");
    const divorced = filtered.filter((r) => r.MaritalStatus === "Divorced");

    const singleExits = single.filter((r) => r.Attrition === "Yes").length;
    const marriedExits = married.filter((r) => r.Attrition === "Yes").length;
    const divorcedExits = divorced.filter((r) => r.Attrition === "Yes").length;

    return [
      {
        status: "Single",
        rate: single.length ? +((singleExits / single.length) * 100).toFixed(1) : 0,
        count: single.length,
        exits: singleExits,
      },
      {
        status: "Married",
        rate: married.length ? +((marriedExits / married.length) * 100).toFixed(1) : 0,
        count: married.length,
        exits: marriedExits,
      },
      {
        status: "Divorced",
        rate: divorced.length ? +((divorcedExits / divorced.length) * 100).toFixed(1) : 0,
        count: divorced.length,
        exits: divorcedExits,
      },
    ];
  }, [filtered]);

  // Attrition vs Retained Split
  const attritionSplit = useMemo(
    () => [
      { name: "Voluntary Attrition", value: exits, color: "#ef4444" },
      { name: "Retained Workforce", value: retained, color: "#3b82f6" },
    ],
    [exits, retained]
  );

  // Scatter plot data (Age vs MonthlyIncome with Attrition flag)
  const scatterData = useMemo(() => {
    return filtered.slice(0, 350).map((row) => ({
      age: row.Age,
      income: row.MonthlyIncome,
      attrition: row.Attrition,
      role: row.JobRole,
      department: row.Department,
    }));
  }, [filtered]);

  const onFilterChange = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">Loading benchmark IBM dataset (1,470 records)...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        <h3 className="text-base font-semibold">Error Loading Dataset</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Top Banner with Quick Context */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
              <Sparkles className="h-3 w-3" />
              Executive Dashboard
            </span>
            <span className="text-xs text-slate-500">CRISP-DM Phase 2 & 3: Data Understanding & Business Baseline</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Workforce Health & Attrition Diagnostic Overview
          </h2>
          <p className="text-xs text-slate-600">
            Analyzing turnover triggers across {data.length} employees (1,470 IBM benchmark baseline).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/prediction"
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Launch ML Scorer</span>
          </Link>
          <Link
            href="/simulator"
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span>ROI Simulator</span>
          </Link>
        </div>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter Slicers</span>
            {isFiltered ? (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                Active: Showing {totalEmployees} of {data.length}
              </span>
            ) : null}
          </div>
          {isFiltered ? (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition"
            >
              <RotateCcw className="h-3 w-3" />
              Reset All
            </button>
          ) : null}
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">Department</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.department}
              onChange={(e) => onFilterChange("department", e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">OverTime</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.overtime}
              onChange={(e) => onFilterChange("overtime", e.target.value)}
            >
              <option value="All">All Overtime</option>
              <option value="Yes">Yes (High Risk)</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">Marital Status</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.maritalStatus}
              onChange={(e) => onFilterChange("maritalStatus", e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Single">Single (High Mobility)</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </label>

          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">Gender</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.gender}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">Job Role</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.jobRole}
              onChange={(e) => onFilterChange("jobRole", e.target.value)}
            >
              {jobRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs">
            <span className="mb-1 block font-semibold text-slate-600">AI Risk Band</span>
            <select
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              value={filters.riskTier}
              onChange={(e) => onFilterChange("riskTier", e.target.value)}
            >
              <option value="All">All Tiers</option>
              <option value="High">High Risk Tier</option>
              <option value="Medium">Medium Risk Tier</option>
              <option value="Low">Low Risk Tier</option>
            </select>
          </label>
        </div>
      </div>

      {/* 6 Executive KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Total Headcount"
          value={totalEmployees.toLocaleString()}
          hint="Empirical sample size"
          icon={<Users className="h-4 w-4" />}
          accent="blue"
        />
        <KpiCard
          label="Voluntary Exits"
          value={String(exits)}
          hint={`${formatPercent(attritionRate)} departure rate`}
          icon={<UserX className="h-4 w-4" />}
          accent="rose"
        />
        <KpiCard
          label="Attrition Rate"
          value={formatPercent(attritionRate)}
          hint="Benchmark: 16.12%"
          trend={{
            value: attritionRate > 16.12 ? "Above Benchmark" : "Controlled",
            isPositive: attritionRate <= 16.12,
          }}
          icon={<TrendingDown className="h-4 w-4" />}
          accent={attritionRate > 16.12 ? "rose" : "emerald"}
        />
        <KpiCard
          label="Avg Monthly Salary"
          value={formatCurrency(avgIncome)}
          hint="Mean baseline: $6,526"
          icon={<DollarSign className="h-4 w-4" />}
          accent="indigo"
        />
        <KpiCard
          label="Avg Org Tenure"
          value={`${avgTenure.toFixed(1)} yrs`}
          hint="Mean baseline: 7.0 yrs"
          icon={<Clock className="h-4 w-4" />}
          accent="purple"
        />
        <KpiCard
          label="Turnover Loss"
          value={formatCurrency(turnoverFinancialLoss)}
          hint="$117,468 per departure"
          icon={<AlertTriangle className="h-4 w-4" />}
          accent="amber"
        />
      </div>

      {/* Empirical Triggers Showcase (Overtime 3x Multiplier & Satisfaction Gradient) */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Overtime Analysis Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/70 to-white p-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                <Flame className="h-4 w-4 text-rose-600" />
                Primary Trigger #1: OverTime Burnout
              </span>
              <span className="rounded-full bg-rose-200/80 px-2 py-0.5 text-[11px] font-bold text-rose-800">
                {overtimeStats.multiplier}x Higher Risk
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-900">
              OverTime Mandate vs Standard Hours
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Employees required to work overtime suffer a <strong>{overtimeStats.yes.rate.toFixed(1)}%</strong> attrition rate compared to only <strong>{overtimeStats.no.rate.toFixed(1)}%</strong> for non-overtime staff.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-rose-200 bg-white p-3 text-center shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">OverTime: YES</p>
              <p className="mt-1 text-2xl font-black text-rose-600">{overtimeStats.yes.rate.toFixed(1)}%</p>
              <p className="text-[11px] text-slate-500">{overtimeStats.yes.exits} of {overtimeStats.yes.total} exits</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-3 text-center shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">OverTime: NO</p>
              <p className="mt-1 text-2xl font-black text-emerald-600">{overtimeStats.no.rate.toFixed(1)}%</p>
              <p className="text-[11px] text-slate-500">{overtimeStats.no.exits} of {overtimeStats.no.total} exits</p>
            </div>
          </div>
        </div>

        {/* Job Satisfaction Gradient */}
        <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 to-white p-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <HeartHandshake className="h-4 w-4 text-blue-600" />
                Primary Trigger #2: Satisfaction Gradient
              </span>
              <span className="rounded-full bg-blue-200/80 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                -50% Risk Drop
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-900">
              Job Satisfaction vs Exit Likelihood
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Moving employees from Level 1 Low (<strong>22.8%</strong>) to Level 4 Very High (<strong>11.3%</strong>) halves the exit likelihood.
            </p>
          </div>

          <div className="mt-3 space-y-1.5">
            {satisfactionGradient.map((item) => (
              <div key={item.level} className="flex items-center justify-between text-xs">
                <span className="w-24 font-medium text-slate-600">{item.level}</span>
                <div className="mx-2 h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, item.rate * 3.5)}%` }}
                  />
                </div>
                <span className="w-12 text-right font-bold text-slate-800">{item.rate}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marital Mobility Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-white p-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Primary Trigger #3: Marital Mobility
              </span>
              <span className="rounded-full bg-purple-200/80 px-2 py-0.5 text-[11px] font-bold text-purple-800">
                Single = 25.5%
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold text-slate-900">
              Demographic Mobility Distribution
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Single employees demonstrate <strong>2.2x</strong> higher mobility than married (<strong>12.5%</strong>) and divorced (<strong>10.1%</strong>) colleagues.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {maritalStats.map((item) => (
              <div key={item.status} className="rounded-xl border border-purple-100 bg-white p-2.5 text-center">
                <p className="text-[10px] font-semibold text-slate-500 uppercase">{item.status}</p>
                <p className={`mt-1 text-lg font-black ${item.status === "Single" ? "text-purple-700" : "text-slate-800"}`}>
                  {item.rate}%
                </p>
                <p className="text-[10px] text-slate-400">{item.exits} exits</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Department Breakdown & Attrition Split */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Department Exit Breakdown Chart (8 cols) */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Departmental Risk & Exit Breakdown</h3>
              <p className="text-xs text-slate-500">Sales has highest risk (20.6%), HR (19.0%), R&D (13.8%)</p>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {departmentBreakdown.length} Departments
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" unit="%" tick={{ fontSize: 12 }} domain={[0, 30]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#fff", border: "none" }}
                  formatter={(val, name) => [
                    name === "rate" ? `${val}%` : val,
                    name === "headcount" ? "Total Headcount" : name === "exits" ? "Exits" : "Attrition Rate",
                  ]}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar yAxisId="left" dataKey="headcount" fill="#94a3b8" name="Headcount" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="exits" fill="#ef4444" name="Exits" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="rate" fill="#3b82f6" name="Attrition Rate (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        {/* Attrition Split Donut Chart (4 cols) */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Workforce Retention Split</h3>
            <p className="text-xs text-slate-500">Overall 16.12% turnover vs 83.88% retention</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attritionSplit}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {attritionSplit.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#fff" }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      {/* Interactive Exploration: Age vs Monthly Income */}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Age vs Monthly Income Distribution</h3>
            <p className="text-xs text-slate-500">
              Red points indicate voluntary exits. Notice dense departures under $3,500 monthly income and younger age brackets (&lt;30 yrs).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500" /> Voluntary Exit (Yes)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-blue-600" /> Retained (No)
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="age" name="Age" unit=" yrs" domain={[18, 62]} tick={{ fontSize: 12 }} />
              <YAxis
                type="number"
                dataKey="income"
                name="Monthly Income"
                tickFormatter={(v) => `$${v / 1000}k`}
                domain={[1000, 20000]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-lg bg-slate-900 p-2.5 text-xs text-white shadow-lg">
                        <p className="font-bold">{d.role}</p>
                        <p className="text-slate-300">{d.department}</p>
                        <p className="mt-1">Age: <span className="font-semibold">{d.age} yrs</span></p>
                        <p>Income: <span className="font-semibold">${d.income.toLocaleString()}</span></p>
                        <p className={`mt-1 font-bold ${d.attrition === "Yes" ? "text-rose-400" : "text-emerald-400"}`}>
                          Attrition: {d.attrition}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                name="Retained"
                data={scatterData.filter((d) => d.attrition === "No")}
                fill="#3b82f6"
                opacity={0.65}
              />
              <Scatter
                name="Voluntary Exit"
                data={scatterData.filter((d) => d.attrition === "Yes")}
                fill="#ef4444"
                opacity={0.85}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
