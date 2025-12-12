// Auto-generated student loan logo map
// Generated on 2025-12-12T07:37:31.885Z

export const studentLoanLogos: Record<string, string> = {
  "SoFi": "/student-loan-logos/sofi.png",
  "sofi": "/student-loan-logos/sofi.png",
  "Earnest": "/student-loan-logos/earnest.png",
  "earnest": "/student-loan-logos/earnest.png",
  "Discover Student Loans": "/student-loan-logos/discover-student-loans.png",
  "discover-student-loans": "/student-loan-logos/discover-student-loans.png",
  "College Ave": "/student-loan-logos/college-ave.png",
  "college-ave": "/student-loan-logos/college-ave.png",
  "Sallie Mae": "/student-loan-logos/sallie-mae.png",
  "sallie-mae": "/student-loan-logos/sallie-mae.png",
  "Citizens Bank": "/student-loan-logos/citizens-bank.png",
  "citizens-bank": "/student-loan-logos/citizens-bank.png",
  "Ascent": "/student-loan-logos/ascent.png",
  "ascent": "/student-loan-logos/ascent.png",
  "MPOWER Financing": "/student-loan-logos/mpower-financing.png",
  "mpower-financing": "/student-loan-logos/mpower-financing.png",
};

export function getStudentLoanLogo(nameOrSlug: string): string | null {
  const key = nameOrSlug.toLowerCase();
  if (studentLoanLogos[nameOrSlug]) return studentLoanLogos[nameOrSlug];
  for (const [k, v] of Object.entries(studentLoanLogos)) {
    if (k.toLowerCase() === key) return v;
  }
  return null;
}
