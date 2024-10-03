import { Company, Filters } from "../interfaces";

export async function fetchCompanies(
  filters: Filters,
  sort: string
): Promise<Company[]> {
  const params = new URLSearchParams({
    ...filters,
    sort,
  });

  // TODO - don't hard-code the base URL here
  const response = await fetch(`http://localhost:8080/v1/companies?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return response.json();
}
