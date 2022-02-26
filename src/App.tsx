import { QueryClient, QueryClientProvider } from "react-query";
import AppContext from "./store/appContext";
import Tree from "./components/tree";
import { useState } from "react";

const queryClient = new QueryClient();


function App() {
  
  const [root, setRoot] = useState("");
  const value = {
    state: {
      root: root,
    },
    setRoot : setRoot,
  }
  
  return (
    <AppContext.Provider
    value={value}
  >
    <QueryClientProvider client={queryClient}>
      <div className="flex p-6 min-h-screen min-w-fit bg-gray-100">
        <Tree />
      </div>
    </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
