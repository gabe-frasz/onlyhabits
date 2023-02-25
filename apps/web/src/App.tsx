import { Header, SummaryTable } from "./components/layouts";

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <main className="flex w-full max-w-5xl flex-col gap-16 px-6">
        <Header />

        <SummaryTable />
      </main>
    </div>
  );
}

export default App;
