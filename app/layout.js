import "./globals.css";

export const metadata = {
  title: "IBM Q2D DS Project",
  description: "Simple Next.js app ready for direct Vercel deployment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
