"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { useHrData } from "@/lib/useHrData";

function clampRate(rate: number): number {
  return Math.max(0.01, Math.min(0.95, rate));
}

export default function SimulatorPage() {
  const { data, loading } = useHrData();
  const [overtimeReduction, setOvertimeReduction] = useState(20);
  const [salaryIncrease, setSalaryIncrease] = useState(10);
  const [trainingBoost, setTrainingBoost] = useState(15);

  const baseAttritionRate = useMemo(() => {
    if (!data.length) return 0;
    const exits = data.filter((row) => row.Attrition === "Yes").length;
    return exits / data.length;
  }, [data]);

  const simulatedAttritionRate = useMemo(() => {
    const overtimeEffect = overtimeReduction * 0.003;
    const salaryEffect = salaryIncrease * 0.0022;
    const trainingEffect = trainingBoost * 0.0016;
    return clampRate(baseAttritionRate - overtimeEffect - salaryEffect - trainingEffect);
  }, [baseAttritionRate, overtimeReduction, salaryIncrease, trainingBoost]);

  const difference = (baseAttritionRate - simulatedAttritionRate) * 100;
  const annualSavings = Math.max(0, Math.round((data.length * difference * 18000) / 100));

  const comparison = [
    { name: "Current", rate: +(baseAttritionRate * 100).toFixed(2) },
    { name: "Simulated", rate: +(simulatedAttritionRate * 100).toFixed(2) },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">What-if Attrition Simulator</h2>
        <p className="text-sm text-slate-600">Test HR interventions and estimate future attrition impact instantly.</p>
      </div>

      {loading ? <p className="text-sm text-slate-600">Loading simulator data...</p> : null}

      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 lg:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Overtime reduction (%)</span>
          <input
            type="range"
            min={0}
            max={40}
            value={overtimeReduction}
            onChange={(event) => setOvertimeReduction(Number(event.target.value))}
            className="w-full"
          />
          <span className="text-xs text-slate-600">{overtimeReduction}%</span>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Salary increase (%)</span>
          <input
            type="range"
            min={0}
            max={30}
            value={salaryIncrease}
            onChange={(event) => setSalaryIncrease(Number(event.target.value))}
            className="w-full"
          />
          <span className="text-xs text-slate-600">{salaryIncrease}%</span>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Training boost (%)</span>
          <input
            type="range"
            min={0}
            max={40}
            value={trainingBoost}
            onChange={(event) => setTrainingBoost(Number(event.target.value))}
            className="w-full"
          />
          <span className="text-xs text-slate-600">{trainingBoost}%</span>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Current Attrition" value={`${(baseAttritionRate * 100).toFixed(2)}%`} />
        <KpiCard label="Simulated Attrition" value={`${(simulatedAttritionRate * 100).toFixed(2)}%`} />
        <KpiCard label="Estimated Annual Saving" value={`₹${annualSavings.toLocaleString()}`} hint={`Improvement: ${difference.toFixed(2)} pts`} />
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">Attrition Comparison</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
