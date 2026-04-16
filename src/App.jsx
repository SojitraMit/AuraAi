import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/chat/:sessionId" element={<Chat />} />
              <Route path="/" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
