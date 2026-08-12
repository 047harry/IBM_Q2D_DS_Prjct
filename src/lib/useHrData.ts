"use client";

import { useEffect, useState } from "react";
import type { HRRecord } from "@/lib/hr";

export function useHrData() {
  const [data, setData] = useState<HRRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/data/hr_data.json")
      .then((response) => response.json())
      .then((json: HRRecord[]) => {
        if (!active) return;
        setData(json);
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
