export type Attrition = "Yes" | "No";

export type HRRecord = {
  EmployeeNumber: number;
  Age: number;
  Attrition: Attrition;
  Department: string;
  Gender: string;
  EducationField: string;
  JobRole: string;
  MonthlyIncome: number;
  OverTime: "Yes" | "No";
  YearsAtCompany: number;
  JobSatisfaction: number;
  PerformanceRating: number;
  PercentSalaryHike: number;
  TotalWorkingYears: number;
  DistanceFromHome: number;
};

export type Filters = {
  department: string;
  overtime: string;
  gender: string;
};

export const DEFAULT_FILTERS: Filters = {
  department: "All",
  overtime: "All",
  gender: "All",
};

export function filterRecords(records: HRRecord[], filters: Filters): HRRecord[] {
  return records.filter((r) => {
    const departmentMatch = filters.department === "All" || r.Department === filters.department;
    const overtimeMatch = filters.overtime === "All" || r.OverTime === filters.overtime;
    const genderMatch = filters.gender === "All" || r.Gender === filters.gender;

    return departmentMatch && overtimeMatch && genderMatch;
  });
}

export function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

export function getRiskScore(row: HRRecord): number {
  let score = 0.2;

  if (row.OverTime === "Yes") score += 0.22;
  if (row.YearsAtCompany <= 2) score += 0.15;
  else if (row.YearsAtCompany <= 5) score += 0.08;
  else score -= 0.04;

  if (row.MonthlyIncome < 5000) score += 0.14;
  else if (row.MonthlyIncome > 12000) score -= 0.05;

  if (row.JobSatisfaction <= 2) score += 0.11;
  if (row.DistanceFromHome >= 18) score += 0.08;
  if (row.Department === "Sales") score += 0.05;

  return Math.min(0.95, Math.max(0.03, score));
}

export function getRiskBand(score: number): "High" | "Medium" | "Low" {
  if (score >= 0.55) return "High";
  if (score >= 0.35) return "Medium";
  return "Low";
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values.map((value) => value.trim());
}

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseHrCsv(csvText: string): HRRecord[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length <= 1) {
    return [];
  }

  const headers = parseCsvLine(lines[0].replace(/^\uFEFF/, ""));
  const byName = (row: string[], column: string): string => {
    const index = headers.indexOf(column);
    return index >= 0 ? row[index] ?? "" : "";
  };

  return lines.slice(1).map((line) => {
    const row = parseCsvLine(line);
    return {
      EmployeeNumber: toNumber(byName(row, "EmployeeNumber")),
      Age: toNumber(byName(row, "Age")),
      Attrition: byName(row, "Attrition") === "Yes" ? "Yes" : "No",
      Department: byName(row, "Department"),
      Gender: byName(row, "Gender"),
      EducationField: byName(row, "EducationField"),
      JobRole: byName(row, "JobRole"),
      MonthlyIncome: toNumber(byName(row, "MonthlyIncome")),
      OverTime: byName(row, "OverTime") === "Yes" ? "Yes" : "No",
      YearsAtCompany: toNumber(byName(row, "YearsAtCompany")),
      JobSatisfaction: toNumber(byName(row, "JobSatisfaction")),
      PerformanceRating: toNumber(byName(row, "PerformanceRating")),
      PercentSalaryHike: toNumber(byName(row, "PercentSalaryHike")),
      TotalWorkingYears: toNumber(byName(row, "TotalWorkingYears")),
      DistanceFromHome: toNumber(byName(row, "DistanceFromHome")),
    };
  });
}
