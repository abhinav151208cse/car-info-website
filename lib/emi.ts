export type EmiInput = {
  principal: number;
  annualRatePercent: number;
  tenureMonths: number;
};

export type EmiResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
};

export type EmiScheduleRow = {
  month: number;
  emi: number;
  principalPart: number;
  interestPart: number;
  balance: number;
};

/** Parse strings like "₹16.89 Lakh" into rupees. */
export function parseLakhPrice(price: string): number | null {
  const match = price.match(/([\d,.]+)\s*Lakh/i);
  if (!match) return null;
  const lakh = Number.parseFloat(match[1].replace(/,/g, ""));
  if (!Number.isFinite(lakh) || lakh <= 0) return null;
  return Math.round(lakh * 100_000);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatInrCompact(amount: number): string {
  if (amount >= 100_000) {
    const lakh = amount / 100_000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return formatInr(amount);
}

/** Reducing-balance monthly EMI. Returns null when inputs are invalid. */
export function calculateEmi(input: EmiInput): EmiResult | null {
  const { principal, annualRatePercent, tenureMonths } = input;
  if (
    principal <= 0 ||
    tenureMonths <= 0 ||
    annualRatePercent < 0 ||
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRatePercent) ||
    !Number.isFinite(tenureMonths)
  ) {
    return null;
  }

  const months = Math.round(tenureMonths);
  if (months <= 0) return null;

  const monthlyRate = annualRatePercent / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = (1 + monthlyRate) ** months;
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
  };
}

export function buildAmortizationSchedule(
  input: EmiInput,
  maxRows = 12,
): EmiScheduleRow[] | null {
  const result = calculateEmi(input);
  if (!result) return null;

  const months = Math.round(input.tenureMonths);
  const monthlyRate = input.annualRatePercent / 12 / 100;
  const rows: EmiScheduleRow[] = [];
  let balance = input.principal;

  for (let month = 1; month <= months; month += 1) {
    const interestPart =
      monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPart = result.emi - interestPart;
    balance = Math.max(0, balance - principalPart);

    rows.push({
      month,
      emi: result.emi,
      principalPart,
      interestPart,
      balance,
    });
  }

  if (rows.length <= maxRows) return rows;

  const tail = rows.slice(-3);
  return [...rows.slice(0, maxRows - 3), ...tail];
}

export function loanFromPrice(
  carPrice: number,
  downPayment: number,
): number {
  return Math.max(0, carPrice - downPayment);
}
