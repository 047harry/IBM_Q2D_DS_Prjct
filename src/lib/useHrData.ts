"use client";

import { useEffect, useState } from "react";
import { parseHrCsv, type HRRecord } from "@/lib/hr";

export function useHrData() {
  const [data, setData] = useState<HRRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/data/WA_Fn-UseC_-HR-Employee-Attrition.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load dataset: ${response.statusText}`);
        }
        return response.text();
      })
      .then((csvText) => {
        if (!active) return;
        const parsed = parseHrCsv(csvText);
        setData(parsed);
      })
      .catch((err: Error) => {
        if (!active) return;
        setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
