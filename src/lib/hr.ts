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
