import CompaniesPage from "./companies/page";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Company Data</h1>
      <CompaniesPage />
    </main>
  );
}
