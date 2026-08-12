# IBMQ2DST1210 - HR Talent Retention & Employee Exit Analytics

A simple Vercel-ready prototype built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## Pages

- **Dashboard**: dynamic KPIs, department exit chart, attrition split, and interactive scatter analysis.
- **Attrition Prediction**: risk segmentation, top risk driver chart, and high-risk employee table.
- **What-if Simulator**: parameter sliders to simulate attrition impact and estimated savings.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- IBM HR Analytics Attrition CSV dataset in `public/data/WA_Fn-UseC_-HR-Employee-Attrition.csv`

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Validate

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import repository in Vercel.
3. Keep default settings (Next.js auto-detected).
4. Deploy.

## Required Submission Names

1. Case study report: `IBMQ2DST1210_casestudy.pdf`
2. Prototype: `IBMQ2DST1210_prototype`
