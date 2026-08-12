# IBM_Q2D_DS_Prjct

Minimal Next.js app (JavaScript) for direct deployment to Vercel.

## Tech Requirements

- Node.js LTS (v20 recommended)
- npm
- GitHub repository
- Vercel account

## Stack

- Framework: Next.js (App Router)
- Language: JavaScript
- Styling: CSS Modules
- Data: Local mock JSON (`/data/mockData.json`)
- Backend: Next.js API routes (add only when needed)

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build & Lint

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Keep defaults (framework detected as Next.js).
4. Deploy.

Vercel will auto-deploy new pushes by default.
