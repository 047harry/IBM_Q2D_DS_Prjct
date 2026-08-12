# Project Documentation

## 1) Project Title
**IBMQ2DST1210 - HR Talent Retention & Employee Exit Analytics**

## 2) Project Purpose
This project is a simple HR analytics prototype that helps understand employee attrition patterns, estimate attrition risk, and simulate retention impact using IBM HR dataset-driven insights.

## 3) Core Features
- **Dashboard**
  - KPI summary cards
  - Department-wise exit distribution
  - Attrition split visualization
  - Interactive scatter analysis
- **Attrition Prediction**
  - Risk segmentation view
  - Top risk driver chart
  - High-risk employee table
- **What-if Simulator**
  - Scenario sliders for HR parameters
  - Predicted attrition impact
  - Estimated savings output

## 4) Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts

## 5) Data Source
- IBM HR Analytics Attrition dataset:
  - `public/data/WA_Fn-UseC_-HR-Employee-Attrition.csv`
- Preprocessed/supporting files:
  - `public/data/hr_data.json`
  - `public/data/ml_outputs.json`

## 6) Repository Structure
- `src/app/page.tsx` -> Main dashboard page
- `src/app/prediction/page.tsx` -> Attrition prediction page
- `src/app/simulator/page.tsx` -> What-if simulation page
- `src/components/` -> Reusable UI components
- `src/lib/` -> Data and utility logic
- `public/data/` -> Dataset and prepared JSON assets

## 7) Local Setup
```bash
npm install
npm run dev
```
Application URL: `http://localhost:3000`

## 8) Validation Commands
```bash
npm run lint
npm run build
```

## 9) Deployment
This project is ready for direct deployment on Vercel:
1. Push repository to GitHub
2. Import repository into Vercel
3. Keep default Next.js settings
4. Deploy

## 10) Notes
- Keep the original IBM dataset unchanged in the repository.
- The implementation is intentionally simple for lightweight deployment and demonstration.
