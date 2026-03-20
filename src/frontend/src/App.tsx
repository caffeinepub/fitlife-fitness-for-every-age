import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FitLifeWebsite from "./components/FitLifeWebsite";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FitLifeWebsite />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
