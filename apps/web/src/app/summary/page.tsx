import { Header, SummaryTable } from "@/components/layouts";

export default function Summary() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full max-w-5xl flex-col gap-16 px-6 py-6">
        <Header />

        {/* @ts-expect-error Async Server Component */}
        <SummaryTable />
      </main>
    </div>
  );
}
