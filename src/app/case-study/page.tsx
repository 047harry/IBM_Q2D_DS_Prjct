"use client";

import {
  Award,
  BookOpen,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function CaseStudyPage() {
  return (
    <section className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Award className="h-3 w-3" />
                IBM Q2D PEARL Project Specification
              </span>
              <span className="text-xs text-slate-500">Candidate ID: IBMQ2DST1210</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Project 25 — HR Talent Retention & Employee Exit Analytics
            </h2>
            <p className="mt-1 text-xs text-slate-600 max-w-3xl">
              Official specification, CRISP-DM methodology architecture, empirical baseline validations, and evaluation artifacts for faculty review & IBM delegates pitch.
            </p>
          </div>
        </div>
      </div>

      {/* Metadata & Project Identifiers */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Candidate ID</p>
          <p className="mt-1 font-mono text-lg font-black text-blue-700">IBMQ2DST1210</p>
          <p className="text-xs text-slate-500">Round 1 & 2 Evaluated</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Track & Specialization</p>
          <p className="mt-1 text-base font-bold text-slate-900">UG Level 3 (DS & BI)</p>
          <p className="text-xs text-slate-500">Data Science & Business Intelligence</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Program</p>
          <p className="mt-1 text-base font-bold text-slate-900">IBM Q2D PEARL</p>
          <p className="text-xs text-slate-500">In collaboration with IBM ICE</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Benchmark Dataset</p>
          <p className="mt-1 text-base font-bold text-slate-900">1,470 Records / 35 Features</p>
          <p className="text-xs text-slate-500">0 Null Entries • IBM HR Benchmark</p>
        </div>
      </div>

      {/* CRISP-DM 6-Phase Framework Breakdown */}
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">CRISP-DM Data Science Methodology Roadmap</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Phase 1 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                Phase 1
              </span>
              <span className="text-xs font-semibold text-slate-500">Problem Framing</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Business Understanding</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Quantify enterprise departure cost at <strong>$1.5x annual base salary ($117,468/departure)</strong>. Shift HR from exit interviews to proactive ML retention.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                Phase 2
              </span>
              <span className="text-xs font-semibold text-slate-500">Exploratory EDA</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Data Understanding</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Verify 1,470 employee records, 237 exits (16.12% baseline). Identify top triggers: Overtime (30.5% vs 10.4%) and Satisfaction gradients.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
                Phase 3
              </span>
              <span className="text-xs font-semibold text-slate-500">Pipeline & Encoding</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Data Preparation</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Handle categorical one-hot encoding, binary mapping for Attrition/OverTime, feature scaling for monthly income, and stratified train-test splitting.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800">
                Phase 4
              </span>
              <span className="text-xs font-semibold text-slate-500">Model Training</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Machine Learning Modeling</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Train Random Forest Classifier (100 estimators, max depth 8, balanced class weights) against baseline Logistic Regression.
            </p>
          </div>

          {/* Phase 5 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800">
                Phase 5
              </span>
              <span className="text-xs font-semibold text-slate-500">Metric Validation</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Model Evaluation</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Validate 88.6% Accuracy, 81.2% Precision, 62.5% Recall, 0.706 F1, and 0.865 ROC-AUC. Rank feature importances (OverTime 22.4%, MonthlyIncome 18.1%).
            </p>
          </div>

          {/* Phase 6 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                Phase 6
              </span>
              <span className="text-xs font-semibold text-slate-500">Executive Interface</span>
            </div>
            <h4 className="mt-2 font-bold text-slate-900">Deployment & ROI Modeling</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Deploy interactive What-if ROI Simulator and real-time Diagnostic Scorer to prove $5.52M net annual savings for a 20% turnover reduction.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
