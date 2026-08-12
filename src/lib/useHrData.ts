"use client";

import { useEffect, useState } from "react";
import { parseHrCsv, type HRRecord } from "@/lib/hr";

export function useHrData() {
  const [data, setData] = useState<HRRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/data/WA_Fn-UseC_-HR-Employee-Attrition.csv")
      .then((response) => response.text())
      .then((csvText) => {
        if (!active) return;
        setData(parseHrCsv(csvText));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
}
