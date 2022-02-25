import { QueryClient, QueryClientProvider } from "react-query";

import Tree from "./components/tree";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex p-6 min-h-screen min-w-fit bg-gray-100">
        <Tree />
      </div>
    </QueryClientProvider>
  );
}

export default App;
