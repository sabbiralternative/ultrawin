// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/Pagination/styles/index.css";
import MainRouter from "./routes/MainRouter.jsx";
import ApiProvider from "./context/ApiProvider.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsWrapper from "./components/layout/SettingsWrapper.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <SettingsWrapper>
            <MainRouter />
            <Toaster
              toastOptions={{
                style: {
                  marginTop: "40px",
                  zIndex: 999999999,
                },
              }}
            />
          </SettingsWrapper>
        </ApiProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
);
