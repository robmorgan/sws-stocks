import CompaniesPage from "./companies/page";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold">Company Data</h1>
        <ThemeToggle />
      </div>
      <CompaniesPage />
    </main>
  );
}
