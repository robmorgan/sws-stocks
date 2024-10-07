import { Company, Filters } from "../interfaces";

export async function fetchCompanies(
  filters: Filters,
  sort: string
): Promise<Company[]> {
  const params = new URLSearchParams({
    ...filters,
    sort,
    includePrices: "true", // fetch price history (note: we could disable this for performance reasons)
  });

  // TODO - don't hard-code the base URL here. Where else would it live?
  const response = await fetch(`http://api.traefik.me/v1/companies?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return response.json();
}
