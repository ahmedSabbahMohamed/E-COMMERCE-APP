import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      refetchOnMount: true,

      refetchOnReconnect: false,

      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PhotoProvider>
            <App />
          </PhotoProvider>
          <ToastContainer />
        </QueryClientProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
