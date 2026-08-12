# Project 25 — HR Talent Retention & Employee Exit Analytics

**Candidate ID**: `IBMQ2DST1210`  
**Track & Specialization**: UG Level 3 (Data Science & Business Intelligence)  
**Program**: IBM Q2D PEARL Global Talent Discovery & Development Program (in collaboration with IBM ICE)  
**Evaluation Scope**: Round 1 (Faculty Review) & Round 2 (IBM Delegates Pitch)  
**Benchmark Dataset**: [IBM HR Analytics Employee Attrition Dataset](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset) (1,470 records, 35 attributes)  
**Comprehensive Data Science Report (Markdown)**: [`docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md`](docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md)  
**Official Word Document Report (.docx, 12 Pages)**: [`docs/IBMQ2DST1210_Data_Science_Process_Report.docx`](docs/IBMQ2DST1210_Data_Science_Process_Report.docx)

---

## 📌 Executive Overview & Problem Statement

Voluntary employee turnover drains institutional knowledge, disrupts critical project delivery schedules, and incurs massive recruitment and retraining expenditures (**$1.5\times$ annual base salary per departure**).

- **Mean Employee Salary**: **$6,526 / month** ($78,312 / year)
- **Calculated Cost per Departure**: $1.5 \times (\$6,526 \times 12) = \mathbf{\$117,468 \text{ per employee}}$
- **Enterprise Baseline Loss**: $237 \text{ voluntary departures} \times \$117,468 = \mathbf{\$27.84 \text{ Million / year}}$

This project transitions HR operations from **reactive post-exit interviews** to a **proactive, machine learning-driven decision system** that detects impending flight risk, isolates root causes, and models the financial return on strategic retention interventions.

---

## 📊 Empirical Baseline & Key Discoveries (1,470 Records)

- **Total Headcount**: **1,470**
- **Voluntary Departures**: **237** (**16.12% Overall Attrition Rate**)
- **Mean Tenure**: **7.0 years**

### The Three Critical Empirical Attrition Triggers
1. **Overtime Mandate Burnout (3x Multiplier)**:
   - OverTime = Yes: **30.53% Attrition** ($127$ exits / $416$ staff)
   - OverTime = No: **10.44% Attrition** ($110$ exits / $1,054$ staff)
   - *Impact*: Mandatory overtime nearly triples employee departure probability ($RR = 2.92$).
2. **Job Satisfaction Gradient (-50% Risk Drop)**:
   - Level 1 Low: **22.84% Attrition** $\rightarrow$ Level 4 Very High: **11.33% Attrition**
   - *Impact*: Progressing employee satisfaction cuts flight risk by more than half.
3. **Marital Mobility Disparity**:
   - Single: **25.53% Attrition** vs Married/Divorced: **11.70% Attrition** (2.2x mobility factor).

### Departmental Vulnerability Rankings
- **Sales**: **20.63% Attrition** ($92$ exits / $446$ staff) — *Highest risk department*
- **Human Resources**: **19.05% Attrition** ($12$ exits / $63$ staff)
- **Research & Development**: **13.84% Attrition** ($133$ exits / $961$ staff)

---

## 🤖 Machine Learning Model Benchmarks

A supervised binary classification architecture was trained to predict employee attrition (`Attrition = 1 / 0`) comparing a **Champion Random Forest Classifier** (100 estimators, max depth 8, balanced class weights) against an **L2-Regularized Logistic Regression Baseline**:

| Evaluation Metric | Random Forest (Champion) | Logistic Regression (Baseline) | Delta |
| :--- | :--- | :--- | :--- |
| **Accuracy** | **88.6%** | 83.5% | +5.1% |
| **Precision ($Y=1$)** | **81.2%** | 72.1% | +9.1% |
| **Recall / Sensitivity ($Y=1$)** | **62.5%** | 51.2% | +11.3% |
| **F1-Score (Harmonic Mean)** | **0.706** | 0.599 | +0.107 |
| **ROC-AUC Score** | **0.865** | 0.792 | +0.073 |

### Ranked Feature Importance (Gini Impurity Reduction)
1. **`OverTime`** (**22.4% weight**) — Primary fatigue and burnout trigger
2. **`MonthlyIncome`** (**18.1% weight**) — Below-market pay parity (<$3,500/mo)
3. **`TotalWorkingYears / Age`** (**15.3% weight**) — Career stage and mobility
4. **`Job & Env Satisfaction`** (**12.8% weight**) — Workplace morale and engagement
5. **`DistanceFromHome`** (**10.2% weight**) — Commute strain (>15 miles)
6. **`WorkLifeBalance`** (**8.2% weight**) — Schedule and flexibility integration
7. **`MaritalStatus`** (**7.1% weight**) — Demographic mobility
8. **`YearsWithCurrManager`** (**5.9% weight**) — Supervisory stability (<1.5 yrs)

---

## 💰 Financial ROI & Economic Impact Model

- **Baseline Annual Capital Loss**: **$27.84 Million** ($237 \text{ exits} \times \$117,468$)
- **Targeted Retention Goal**: **20% Reduction in Annual Turnover**
- **Retained Headcount**: **47 employees preserved per year**
- **Gross Financial Savings**: $47 \times \$117,468 = \mathbf{\$5.52 \text{ Million}}$
- **Estimated Intervention Program Budget**: **$480,000**
- **Net Annual Capital Savings**: $\mathbf{\$5.04 \text{ Million}}$
- **Return on Investment (ROI Multiplier)**: $\mathbf{11.5\times \text{ Net ROI}}$

---

## 🖥️ Application Architecture & Suite

The prototype decision support system is organized into 5 dedicated executive modules:

1. **Executive Dashboard (`/`)**: 6 macro KPI summary cards, multidimensional slicers, department exit comparison charts, OverTime 3x multiplier trigger card, satisfaction heatmaps, and interactive Age vs Income scatter exploration.
2. **AI & ML Risk Engine (`/prediction`)**: Model benchmark comparison tables, confusion matrix, ranked feature importance chart, and an **Interactive Real-Time Diagnostic Scorer** with live parameter sliders and prescriptive retention action playbooks.
3. **Financial ROI Simulator (`/simulator`)**: Dynamic $117k departure cost model with 4 interactive policy levers (OverTime, Compensation, WLB, Leadership coaching) and net savings calculations.
4. **Dataset Explorer (`/data`)**: Complete tabular exploration of all 1,470 records with search, filtering, pagination, and CSV data export.
5. **CRISP-DM Specs & Report (`/case-study`)**: Comprehensive breakdown of the 6-phase CRISP-DM methodology and project evaluation metadata.

---

## 🚀 Local Development & Setup

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Installation & Run
```bash
# Clone or navigate to the repository
cd IBM_Q2D_DS_Prjct-main

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser at: **`http://localhost:3000`**

### Build & Verification
```bash
# Validate TypeScript and Next.js build
npm run build
```

---

## 📚 Technical Documentation & References
- **Detailed Data Science Process Report**: [`docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md`](docs/DATA_SCIENCE_PROCESS_DOCUMENTATION.md)
- **Project Summary Documentation**: [`docs/PROJECT_DOCUMENTATION.md`](docs/PROJECT_DOCUMENTATION.md)
- **Benchmark Dataset**: `public/data/WA_Fn-UseC_-HR-Employee-Attrition.csv`
- **Trained Model Benchmarks**: `public/data/ml_outputs.json`

---

© **IBM Q2D PEARL Global Talent Discovery & Development Program** • Project 25  
*Candidate ID: `IBMQ2DST1210` • UG Level 3 Data Science & Business Intelligence*
