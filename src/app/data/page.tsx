"use client";

import { useMemo, useState } from "react";
import { useHrData } from "@/lib/useHrData";
import { getDetailedRiskScore, type HRRecord } from "@/lib/hr";
import {
  Database,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function DataExplorerPage() {
  const { data, loading, error } = useHrData();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [attritionFilter, setAttritionFilter] = useState("All");
  const [overtimeFilter, setOvertimeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const departments = useMemo(() => ["All", ...new Set(data.map((d) => d.Department))], [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchDept = deptFilter === "All" || row.Department === deptFilter;
      const matchAttrition = attritionFilter === "All" || row.Attrition === attritionFilter;
      const matchOvertime = overtimeFilter === "All" || row.OverTime === overtimeFilter;
      const matchSearch =
        search === "" ||
        row.EmployeeNumber.toString().includes(search) ||
        row.JobRole.toLowerCase().includes(search.toLowerCase()) ||
        row.Department.toLowerCase().includes(search.toLowerCase()) ||
        row.EducationField.toLowerCase().includes(search.toLowerCase());

      return matchDept && matchAttrition && matchOvertime && matchSearch;
    });
  }, [data, deptFilter, attritionFilter, overtimeFilter, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const exportCsv = () => {
    if (!filteredData.length) return;
    const headers = [
      "EmployeeNumber",
      "Age",
      "Attrition",
      "Department",
      "JobRole",
      "MonthlyIncome",
      "OverTime",
      "YearsAtCompany",
      "TotalWorkingYears",
      "JobSatisfaction",
      "WorkLifeBalance",
      "DistanceFromHome",
      "MaritalStatus",
    ];

    const rows = filteredData.map((r) => [
      r.EmployeeNumber,
      r.Age,
      r.Attrition,
      `"${r.Department}"`,
      `"${r.JobRole}"`,
      r.MonthlyIncome,
      r.OverTime,
      r.YearsAtCompany,
      r.TotalWorkingYears,
      r.JobSatisfaction,
      r.WorkLifeBalance,
      r.DistanceFromHome,
      r.MaritalStatus,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ibm_hr_dataset_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Database className="h-3 w-3" />
                Raw Tabular Architecture
              </span>
              <span className="text-xs text-slate-500">1,470 Empirical Records • 35 Attributes</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              IBM HR Employee Dataset Explorer
            </h2>
            <p className="text-xs text-slate-600">
              Browse, filter, inspect, and export the complete underlying dataset.
            </p>
          </div>

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Filtered ({filteredData.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, Role, Department..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-50/50 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Departments" : d}
              </option>
            ))}
          </select>

          <select
            value={attritionFilter}
            onChange={(e) => {
              setAttritionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Attrition Statuses</option>
            <option value="Yes">Attrition: Yes (Exited)</option>
            <option value="No">Attrition: No (Retained)</option>
          </select>

          <select
            value={overtimeFilter}
            onChange={(e) => {
              setOvertimeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Overtime Statuses</option>
            <option value="Yes">Overtime: Yes</option>
            <option value="No">Overtime: No</option>
          </select>
        </div>
      </div>

      {/* Tabular Dataset */}
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                <th className="px-3 py-2.5 font-semibold">Emp ID</th>
                <th className="px-3 py-2.5 font-semibold">Age</th>
                <th className="px-3 py-2.5 font-semibold">Attrition</th>
                <th className="px-3 py-2.5 font-semibold">Department</th>
                <th className="px-3 py-2.5 font-semibold">Job Role</th>
                <th className="px-3 py-2.5 font-semibold">Monthly Income</th>
                <th className="px-3 py-2.5 font-semibold">OverTime</th>
                <th className="px-3 py-2.5 font-semibold">Tenure</th>
                <th className="px-3 py-2.5 font-semibold">Satisfaction</th>
                <th className="px-3 py-2.5 font-semibold">Commute</th>
                <th className="px-3 py-2.5 font-semibold">Marital Status</th>
                <th className="px-3 py-2.5 font-semibold">AI Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((row) => {
                const score = getDetailedRiskScore(row);
                return (
                  <tr key={row.EmployeeNumber} className="hover:bg-slate-50/60 transition">
                    <td className="px-3 py-2 font-mono font-semibold text-slate-900">
                      #{row.EmployeeNumber}
                    </td>
                    <td className="px-3 py-2 text-slate-700">{row.Age}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          row.Attrition === "Yes"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {row.Attrition}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-700">{row.Department}</td>
                    <td className="px-3 py-2 font-medium text-slate-800">{row.JobRole}</td>
                    <td className="px-3 py-2 font-semibold text-slate-900">
                      ${row.MonthlyIncome.toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          row.OverTime === "Yes" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {row.OverTime}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{row.YearsAtCompany} yrs</td>
                    <td className="px-3 py-2 text-slate-600">Lvl {row.JobSatisfaction}</td>
                    <td className="px-3 py-2 text-slate-600">{row.DistanceFromHome} mi</td>
                    <td className="px-3 py-2 text-slate-600">{row.MaritalStatus}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          score.band === "High"
                            ? "bg-rose-100 text-rose-700"
                            : score.band === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {(score.score * 100).toFixed(0)}% ({score.band})
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <p className="text-slate-500">
            Showing <span className="font-semibold">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{" "}
            <span className="font-semibold">{filteredData.length}</span> records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </button>
            <span className="text-slate-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
