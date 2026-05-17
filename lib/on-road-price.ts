import { parseLakhPrice } from "@/lib/emi";

export type IndianCityOption = {
  code: string;
  name: string;
  state: string;
};

export type OnRoadBreakdownLine = {
  id: string;
  label: string;
  amount: number;
  note?: string;
};

export type OnRoadResult = {
  exShowroom: number;
  lines: OnRoadBreakdownLine[];
  onRoadTotal: number;
  cityName: string;
  stateName: string;
  fuelCategory: string;
};

type FuelRates = {
  petrol: number;
  diesel: number;
  cng: number;
  electric: number;
  hybrid: number;
};

type CityProfile = IndianCityOption & {
  roadTaxPercent: FuelRates;
  registrationPercent: number;
  otherCharges: number;
};

/** City-wise indicative on-road rates (% of ex-showroom for RTO / road tax). */
const CITY_PROFILES: CityProfile[] = [
  {
    code: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 9500,
  },
  {
    code: "pune",
    name: "Pune",
    state: "Maharashtra",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8500,
  },
  {
    code: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8000,
  },
  {
    code: "delhi",
    name: "New Delhi",
    state: "Delhi",
    roadTaxPercent: { petrol: 10, diesel: 12, cng: 9, electric: 0, hybrid: 8 },
    registrationPercent: 1,
    otherCharges: 8000,
  },
  {
    code: "bangalore",
    name: "Bengaluru",
    state: "Karnataka",
    roadTaxPercent: { petrol: 13, diesel: 15, cng: 11, electric: 2, hybrid: 10 },
    registrationPercent: 1,
    otherCharges: 9500,
  },
  {
    code: "mysuru",
    name: "Mysuru",
    state: "Karnataka",
    roadTaxPercent: { petrol: 13, diesel: 15, cng: 11, electric: 2, hybrid: 10 },
    registrationPercent: 1,
    otherCharges: 8500,
  },
  {
    code: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 9000,
  },
  {
    code: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8500,
  },
  {
    code: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8500,
  },
  {
    code: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    roadTaxPercent: { petrol: 9, diesel: 11, cng: 8, electric: 0, hybrid: 7 },
    registrationPercent: 1,
    otherCharges: 7800,
  },
  {
    code: "surat",
    name: "Surat",
    state: "Gujarat",
    roadTaxPercent: { petrol: 9, diesel: 11, cng: 8, electric: 0, hybrid: 7 },
    registrationPercent: 1,
    otherCharges: 7500,
  },
  {
    code: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8800,
  },
  {
    code: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8000,
  },
  {
    code: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8200,
  },
  {
    code: "gurgaon",
    name: "Gurgaon",
    state: "Haryana",
    roadTaxPercent: { petrol: 10, diesel: 12, cng: 9, electric: 0, hybrid: 8 },
    registrationPercent: 1,
    otherCharges: 8500,
  },
  {
    code: "chandigarh",
    name: "Chandigarh",
    state: "Chandigarh",
    roadTaxPercent: { petrol: 10, diesel: 12, cng: 9, electric: 0, hybrid: 8 },
    registrationPercent: 1,
    otherCharges: 7800,
  },
  {
    code: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8000,
  },
  {
    code: "kochi",
    name: "Kochi",
    state: "Kerala",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 1, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8600,
  },
  {
    code: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    roadTaxPercent: { petrol: 12, diesel: 14, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 8000,
  },
  {
    code: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 7800,
  },
  {
    code: "bhopal",
    name: "Bhopal",
    state: "Madhya Pradesh",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 7500,
  },
  {
    code: "patna",
    name: "Patna",
    state: "Bihar",
    roadTaxPercent: { petrol: 11, diesel: 13, cng: 10, electric: 0, hybrid: 9 },
    registrationPercent: 1,
    otherCharges: 7500,
  },
  {
    code: "ludhiana",
    name: "Ludhiana",
    state: "Punjab",
    roadTaxPercent: { petrol: 10, diesel: 12, cng: 9, electric: 0, hybrid: 8 },
    registrationPercent: 1,
    otherCharges: 7500,
  },
];

export const ON_ROAD_CITIES: IndianCityOption[] = CITY_PROFILES.map(
  ({ code, name, state }) => ({ code, name, state }),
);

export const DEFAULT_ON_ROAD_CITY = "pune";

const TCS_THRESHOLD = 1_000_000;
const TCS_RATE = 0.01;
const INSURANCE_RATE = 0.042;

/** Cities grouped by state for dropdown optgroups. */
export function getOnRoadCityGroups(): { state: string; cities: IndianCityOption[] }[] {
  const map = new Map<string, IndianCityOption[]>();
  for (const city of ON_ROAD_CITIES) {
    const list = map.get(city.state) ?? [];
    list.push(city);
    map.set(city.state, list);
  }
  return [...map.entries()]
    .map(([state, cities]) => ({
      state,
      cities: cities.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.state.localeCompare(b.state));
}

export function classifyFuel(fuelType: string): keyof FuelRates {
  const f = fuelType.toLowerCase();
  if (f.includes("electric") || f.includes("ev")) return "electric";
  if (f.includes("diesel")) return "diesel";
  if (f.includes("cng") || f.includes("lpg")) return "cng";
  if (f.includes("hybrid") || f.includes("strong hybrid")) return "hybrid";
  return "petrol";
}

export function getCityProfile(code: string): CityProfile | undefined {
  return CITY_PROFILES.find((c) => c.code === code);
}

function insuranceEstimate(exShowroom: number): number {
  if (exShowroom >= 2_500_000) return Math.round(exShowroom * 0.038);
  if (exShowroom >= 1_500_000) return Math.round(exShowroom * 0.04);
  return Math.round(exShowroom * INSURANCE_RATE);
}

export function calculateOnRoadPrice(
  exShowroomRupees: number,
  fuelType: string,
  cityCode: string,
): OnRoadResult | null {
  if (exShowroomRupees <= 0) return null;

  const city =
    getCityProfile(cityCode) ?? getCityProfile(DEFAULT_ON_ROAD_CITY);
  if (!city) return null;

  const fuelKey = classifyFuel(fuelType);
  const roadTaxRate = city.roadTaxPercent[fuelKey] / 100;
  const roadTax = Math.round(exShowroomRupees * roadTaxRate);
  const registration = Math.round(
    exShowroomRupees * (city.registrationPercent / 100) + 3500,
  );
  const insurance = insuranceEstimate(exShowroomRupees);
  const tcs =
    exShowroomRupees >= TCS_THRESHOLD
      ? Math.round(exShowroomRupees * TCS_RATE)
      : 0;
  const other = city.otherCharges;

  const lines: OnRoadBreakdownLine[] = [
    {
      id: "ex-showroom",
      label: "Ex-showroom price",
      amount: exShowroomRupees,
    },
    {
      id: "road-tax",
      label: "RTO / road tax",
      amount: roadTax,
      note: `${city.roadTaxPercent[fuelKey]}% · ${city.name}`,
    },
    {
      id: "registration",
      label: "Registration & smart card",
      amount: registration,
      note: city.name,
    },
    {
      id: "insurance",
      label: "Insurance (1st year, comprehensive)",
      amount: insurance,
      note: "Indicative OD + TP",
    },
    ...(tcs > 0
      ? [
          {
            id: "tcs",
            label: "TCS (ex-showroom > ₹10 Lakh)",
            amount: tcs,
          },
        ]
      : []),
    {
      id: "other",
      label: "FASTag, plates & other charges",
      amount: other,
      note: city.name,
    },
  ];

  const onRoadTotal = lines.reduce((sum, line) => sum + line.amount, 0);

  return {
    exShowroom: exShowroomRupees,
    lines,
    onRoadTotal,
    cityName: city.name,
    stateName: city.state,
    fuelCategory: fuelKey,
  };
}

export function calculateOnRoadFromPriceString(
  priceLabel: string,
  fuelType: string,
  cityCode: string,
): OnRoadResult | null {
  const exShowroom = parseLakhPrice(priceLabel);
  if (!exShowroom) return null;
  return calculateOnRoadPrice(exShowroom, fuelType, cityCode);
}
