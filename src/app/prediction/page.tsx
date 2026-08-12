"use client";

import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { getRiskBand, getRiskScore } from "@/lib/hr";
import { useHrData } from "@/lib/useHrData";

type MlOutputs = {
  metrics: {
    model: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
    roc_auc: number;
  };
  feature_importance: { feature: string; importance: number }[];
};

const fallbackDrivers = [
  { feature: "OverTime", importance: 0.29 },
  { feature: "YearsAtCompany", importance: 0.21 },
  { feature: "MonthlyIncome", importance: 0.17 },
  { feature: "JobSatisfaction", importance: 0.14 },
  { feature: "DistanceFromHome", importance: 0.11 },
  { feature: "Department", importance: 0.08 },
];

export default function PredictionPage() {
  const { data, loading } = useHrData();
  const [modelInfo, setModelInfo] = useState<MlOutputs | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/data/ml_outputs.json")
      .then((response) => response.json())
      .then((json: MlOutputs) => {
        if (!active) return;
        setModelInfo(json);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const scored = useMemo(() => {
    return data
      .map((row) => {
        const score = getRiskScore(row);
        return {
          ...row,
          riskScore: score,
          riskBand: getRiskBand(score),
        };
      })
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [data]);

  const highRisk = scored.filter((row) => row.riskBand === "High").length;
  const mediumRisk = scored.filter((row) => row.riskBand === "Medium").length;
  const lowRisk = scored.filter((row) => row.riskBand === "Low").length;

  const topRisk = scored.slice(0, 12);
  const featureImportance = modelInfo?.feature_importance ?? fallbackDrivers;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Attrition Risk Prediction</h2>
        <p className="text-sm text-slate-600">Offline model outputs + live risk segmentation to support manager decisions.</p>
      </div>

      {loading ? <p className="text-sm text-slate-600">Loading prediction data...</p> : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="High Risk" value={String(highRisk)} hint="Immediate retention action suggested" />
        <KpiCard label="Medium Risk" value={String(mediumRisk)} hint="Monitor and coach" />
        <KpiCard label="Low Risk" value={String(lowRisk)} hint="Stable workforce segment" />
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">Top Attrition Drivers</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.35]} />
              <YAxis type="category" dataKey="feature" width={140} />
              <Tooltip />
              <Bar dataKey="importance" fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">High-Risk Employees (Sample)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2">Emp ID</th>
                <th className="px-2 py-2">Department</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Risk Score</th>
                <th className="px-2 py-2">Band</th>
              </tr>
            </thead>
            <tbody>
              {topRisk.map((row) => (
                <tr key={row.EmployeeNumber} className="border-b border-slate-100">
                  <td className="px-2 py-2">{row.EmployeeNumber}</td>
                  <td className="px-2 py-2">{row.Department}</td>
                  <td className="px-2 py-2">{row.JobRole}</td>
                  <td className="px-2 py-2">{(row.riskScore * 100).toFixed(1)}%</td>
                  <td className="px-2 py-2">{row.riskBand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
