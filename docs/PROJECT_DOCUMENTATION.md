# IBM Q2D PEARL — Project 25 System Documentation

## 1. Project Identification & Metadata
- **Candidate ID**: `IBMQ2DST1210`
- **Project Title**: Project 25 — HR Talent Retention & Employee Exit Analytics Dashboard
- **Track & Specialization**: UG Level 3 (Data Science & Business Intelligence)
- **Program**: IBM Q2D PEARL Global Talent Discovery & Development Program (in collaboration with IBM ICE)
- **Evaluation Context**: Round 1 (Faculty Review) & Round 2 (IBM Delegates Pitch)
- **Benchmark Dataset**: [IBM HR Analytics Employee Attrition Dataset](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset) (1,470 records, 35 attributes)
- **Full Data Science Process Report (Markdown)**: [`docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md`](file:///c:/Users/phema/Downloads/IBM_Q2D_DS_Prjct-main%20%281%29/IBM_Q2D_DS_Prjct-main/docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md)
- **Official Word Document Report (.docx, 12 Pages)**: [`docs/IBMQ2DST1210_Data_Science_Process_Report.docx`](file:///c:/Users/phema/Downloads/IBM_Q2D_DS_Prjct-main%20%281%29/IBM_Q2D_DS_Prjct-main/docs/IBMQ2DST1210_Data_Science_Process_Report.docx)

---

## 2. Business Context & Problem Statement
- **Enterprise Problem**: Voluntary employee turnover drains institutional knowledge, disrupts project timelines, and incurs severe recruitment & retraining costs (**$1.5\times$ annual base salary per departure**).
- **Objective**: Transition HR operations from reactive post-exit interviews to proactive, machine learning-driven talent retention by analyzing departure patterns, training predictive models, calculating financial ROI, and delivering an interactive prototype decision system.

---

## 3. Dataset Architecture & Empirical Baseline (1,470 Records)
- **Dataset Shape**: 1,470 rows, 0 null entries, 35 attributes.
- **Empirical Baseline Metrics**:
  - Total Headcount: **1,470**
  - Overall Attrition Count: **237** (**16.12% Attrition Rate**)
  - Mean Monthly Income: **$6,526** ($1,009 to $19,999)
  - Mean Tenure: **7.0 years**
- **Departmental Breakdown**:
  - **Sales**: 446 headcount, 92 exits (**20.63% Attrition Rate**) — Highest department risk
  - **Human Resources**: 63 headcount, 12 exits (**19.05% Attrition Rate**)
  - **Research & Development**: 961 headcount, 133 exits (**13.84% Attrition Rate**)
- **Primary Attrition Triggers**:
  - **OverTime Impact**: OverTime = Yes (**30.53% Attrition**) vs OverTime = No (**10.44% Attrition**) — **~3x higher turnover risk**.
  - **Job Satisfaction Gradient**: Level 1 Low (**22.84% Attrition**) vs Level 4 Very High (**11.33% Attrition**) — **-50% risk drop**.
  - **Marital Mobility**: Single (**25.53% Attrition**) vs Married/Divorced (**11.70% Attrition**).

---

## 4. Predictive Machine Learning Architecture
- **Task**: Binary Classification (`Attrition` = 1 for Yes, 0 for No).
- **Model Selection**: Random Forest Classifier (100 estimators, max depth 8, balanced class weights) compared against a baseline Logistic Regression model.
- **Model Performance Comparison**:
  | Evaluation Metric | Random Forest (Champion) | Logistic Regression (Baseline) | Delta |
  | :--- | :--- | :--- | :--- |
  | **Accuracy** | **88.6%** | 83.5% | +5.1% |
  | **Precision** | **81.2%** | 72.1% | +9.1% |
  | **Recall** | **62.5%** | 51.2% | +11.3% |
  | **F1-Score** | **0.706** | 0.599 | +0.107 |
  | **ROC-AUC Score** | **0.865** | 0.792 | +0.073 |

- **Feature Importance Ranking (Gini Impurity Reduction)**:
  1. **OverTime** (22.4% weight) — Primary fatigue & burnout trigger
  2. **MonthlyIncome** (18.1% weight) — Market compensation parity
  3. **TotalWorkingYears / Age** (15.3% weight) — Career mobility stage
  4. **Job & Env Satisfaction** (12.8% weight) — Workplace morale
  5. **DistanceFromHome** (10.2% weight) — Commute strain
  6. **WorkLifeBalance** (8.2% weight) — Schedule integration
  7. **MaritalStatus** (7.1% weight) — Demographic mobility
  8. **YearsWithCurrManager** (5.9% weight) — Supervisory stability

---

## 5. Financial ROI & Economic Impact Model
- **Cost Per Departure**: $1.5\times$ Annual Base Salary = $1.5 \times (\$6,526 \times 12) = \mathbf{\$117,468 \text{ per employee}}$.
- **Annual Organizational Baseline Loss**: $237 \text{ lost employees} \times \$117,468 = \mathbf{\$27.84 \text{ Million}}$.
- **Projected Retention ROI**: Achieving a **20% reduction** in annual turnover retains **47 employees per year**, yielding an annual net savings of **$5.52 Million**.

---

## 6. Executive Decision Prototype Suite
- **Executive Dashboard**: Top 6 KPI summary cards, multidimensional filters, department exit charts, OverTime 3x multiplier card, satisfaction heatmaps, and age vs income scatter explorer.
- **AI & ML Risk Engine**: Random Forest vs Logistic Regression benchmark tables, feature importance chart, confusion matrix, and interactive real-time employee risk scorer with prescriptive playbooks.
- **Financial ROI Simulator**: Dynamic $117k departure cost model with 4 interactive policy levers (OverTime, Compensation, WLB, Leadership coaching) and net savings calculations.
- **Dataset Explorer**: Full 1,470-row tabular dataset with search, column filtering, pagination, and CSV export.
- **CRISP-DM Specifications**: Detailed breakdown of the 6-phase CRISP-DM methodology.
